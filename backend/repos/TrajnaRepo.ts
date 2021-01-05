import { Rezervacija } from '../models/Rezervacija';
import { TrajnaDTO } from '../dtos/TrajnaDTO';
import { TrajnaMapper } from '../mappers/TrajnaMapper';
import { JednokratnaMapper } from '../mappers/JednokratnaMapper';
import { Trajna } from '../models/Trajna';
import { Jednokratna } from '../models/Jednokratna';
import { BaseRepo } from './BaseRepo';
import { RezervacijaRepo } from './RezervacijaRepo';
import { Op } from 'sequelize';

export class TrajnaRepo extends BaseRepo<TrajnaDTO> {
  async exists(trajnaDTO: TrajnaDTO): Promise<boolean> {
    const { idRezervacija } = TrajnaMapper.toDomain(trajnaDTO);

    const rezervacija = await Trajna.findOne({
      where: {
        idRezervacija,
      },
    });

    return Boolean(rezervacija);
  }

  async delete(trajnaDTO: TrajnaDTO): Promise<any> {
    const { idRezervacija } = TrajnaMapper.toDomain(trajnaDTO);

    return await Rezervacija.destroy({
      where: {
        idRezervacija,
      },
    });
  }

  async save(trajnaDTO: TrajnaDTO): Promise<any> {
    if (await this.exists(trajnaDTO)) {
      const { idRezervacija, ...trajnaData } = TrajnaMapper.toDomain(trajnaDTO);

      const rezervacijaRepo = new RezervacijaRepo();
      rezervacijaRepo.save(trajnaDTO);

      return await Trajna.update(trajnaData, {
        where: {
          idRezervacija,
        },
      });
    }

    return await TrajnaRepo.createTrajna(trajnaDTO);
  }

  static async createTrajna(trajnaDTO: TrajnaDTO): Promise<Trajna> {
    const rezervacija = await RezervacijaRepo.createRezervacija(trajnaDTO);

    const { idTrajna, ...trajnaData } = TrajnaMapper.toDomain(trajnaDTO);

    const trajna = await Trajna.create({
      ...trajnaData,
      idRezervacija: rezervacija.idRezervacija,
    });

    return trajna;
  }

  public static async getTrajnaByIdRezervacija(
    idRezervacija: number
  ): Promise<Trajna> {
    return await Trajna.findOne({
      where: {
        idRezervacija,
      },
    });
  }

  public static async getTrajnaByIdTrajna(idTrajna: number): Promise<Trajna> {
    return await Trajna.findOne({
      where: {
        idTrajna,
      },
    });
  }

  public static async getIdRezervacijaByIdTrajna(
    idTrajna: number
  ): Promise<number> {
    return (await (await this.getTrajnaByIdTrajna(idTrajna)).getRezervacija())
      .idRezervacija;
  }

  public static async update(trajnaDTO: TrajnaDTO): Promise<Trajna> {
    const trajnaData = TrajnaMapper.toDomain(trajnaDTO);

    await RezervacijaRepo.updateRezervacija(trajnaDTO);

    await Trajna.update(trajnaData, {
      where: {
        idTrajna: trajnaDTO.idTrajna,
      },
    });

    return await this.getTrajnaByIdTrajna(trajnaDTO.idTrajna);
  }

  public static async getIdTrajna(idRezervacija: number): Promise<number> {
    const trajna = await this.getTrajnaByIdRezervacija(idRezervacija);

    if (!trajna) {
      return null;
    }

    return trajna.idTrajna;
  }

  public static async checkAvailability(
    trajnaDTO: TrajnaDTO
  ): Promise<Boolean> {
    const jednokratne = await Jednokratna.findAll({
      where: {
        [Op.or]: {
          vrijemePocetak: {
            [Op.between]: [trajnaDTO.startTime, trajnaDTO.endTime],
          },
          vrijemeKraj: {
            [Op.between]: [trajnaDTO.startTime, trajnaDTO.endTime],
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

    const trajne= await Trajna.findAll({
      where: {
        [Op.or]: {
          vrijemePocetak: {
            [Op.between]: [trajnaDTO.startTime, trajnaDTO.endTime],
          },
          vrijemeKraj: {
            [Op.between]: [trajnaDTO.startTime, trajnaDTO.endTime],
          },
        },
      },
    });

    for (const trajna of trajne) {
      if (
        !RezervacijaRepo.checkAvailability(
          await TrajnaMapper.toDTO(trajna)
        )
      ) {
        return false;
      }
    }

    return true;
  }
}
