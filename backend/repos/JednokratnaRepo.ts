import { Rezervacija } from '../models/Rezervacija';
import { JednokratnaDTO } from '../dtos/JednokratnaDTO';
import { JednokratnaMapper } from '../mappers/JednokratnaMapper';
import { Jednokratna } from '../models/Jednokratna';
import { BaseRepo } from './BaseRepo';
import { RezervacijaRepo } from './RezervacijaRepo';
import { Op } from 'sequelize';

export class JednokratnaRepo extends BaseRepo<JednokratnaDTO> {
  async exists(jednokratnaDTO: JednokratnaDTO): Promise<boolean> {
    const { idRezervacija } = JednokratnaMapper.toDomain(jednokratnaDTO);

    const rezervacija = await Jednokratna.findOne({
      where: {
        idRezervacija,
      },
    });

    return Boolean(rezervacija);
  }

  async delete(jednokratnaDTO: JednokratnaDTO): Promise<any> {
    const { idRezervacija } = JednokratnaMapper.toDomain(jednokratnaDTO);

    return await Rezervacija.destroy({
      where: {
        idRezervacija,
      },
    });
  }

  async save(jednokratnaDTO: JednokratnaDTO): Promise<any> {
    if (await this.exists(jednokratnaDTO)) {
      const { idRezervacija, ...jednokratnaData } = JednokratnaMapper.toDomain(
        jednokratnaDTO
      );

      const rezervacijaRepo = new RezervacijaRepo();
      rezervacijaRepo.save(jednokratnaDTO);

      return await Jednokratna.update(jednokratnaData, {
        where: {
          idRezervacija,
        },
      });
    }

    return await JednokratnaRepo.createJednokratna(jednokratnaDTO);
  }

  public static async createJednokratna(
    jednokratnaDTO: JednokratnaDTO
  ): Promise<Jednokratna> {
    const rezervacija = await RezervacijaRepo.createRezervacija(jednokratnaDTO);

    const { idJednokratna, ...jednokratnaData } = JednokratnaMapper.toDomain(
      jednokratnaDTO
    );

    const jednokratna = await Jednokratna.create({
      ...jednokratnaData,
      idRezervacija: rezervacija.idRezervacija,
    });

    return jednokratna;
  }

  public static async getJednokratnaByIdRezervacija(
    idRezervacija: number
  ): Promise<Jednokratna> {
    return await Jednokratna.findOne({
      where: {
        idRezervacija,
      },
    });
  }

  public static async getJednokratnaByIdJednokratna(
    idJednokratna: number
  ): Promise<Jednokratna> {
    return await Jednokratna.findOne({
      where: {
        idJednokratna,
      },
    });
  }

  public static async getIdRezervacijaByIdJednokratna(
    idJednokratna: number
  ): Promise<number> {
    return (
      await (
        await this.getJednokratnaByIdJednokratna(idJednokratna)
      ).getRezervacija()
    ).idRezervacija;
  }

  public static async getIdJednokratna(idRezervacija: number): Promise<number> {
    const jednokratna = await this.getJednokratnaByIdRezervacija(idRezervacija);

    if (!jednokratna) {
      return null;
    }

    return jednokratna.idJednokratna;
  }

  public static async checkAvailability(
    jednokratnaDTO: JednokratnaDTO
  ): Promise<Boolean> {
    const jednokratne = await Jednokratna.findAll({
      where: {
        [Op.or]: {
          vrijemePocetak: {
            [Op.between]: [jednokratnaDTO.startTime, jednokratnaDTO.endTime],
          },
          vrijemeKraj: {
            [Op.between]: [jednokratnaDTO.startTime, jednokratnaDTO.endTime],
          },
        },
      },
    });

    for (const jednokratna of jednokratne) {
      if (
        !RezervacijaRepo.checkAvailability(
          await JednokratnaMapper.toDTO(jednokratna)
        )
      ) {
        return false;
      }
    }

    return true;
  }

  public static async update(
    jednokratnaDTO: JednokratnaDTO
  ): Promise<Jednokratna> {
    const jednokratnaData = JednokratnaMapper.toDomain(jednokratnaDTO);

    await RezervacijaRepo.updateRezervacija(jednokratnaDTO);

    await Jednokratna.update(jednokratnaData, {
      where: {
        idJednokratna: jednokratnaDTO.idJednokratna,
      },
    });

    return await this.getJednokratnaByIdJednokratna(
      jednokratnaDTO.idJednokratna
    );
  }
}
