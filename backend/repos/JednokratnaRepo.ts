import { Rezervacija } from '../models/Rezervacija';
import { JednokratnaDTO } from '../dtos/JednokratnaDTO';
import { JednokratnaMapper } from '../mappers/JednokratnaMapper';
import { Jednokratna } from '../models/Jednokratna';
import { BaseRepo } from './BaseRepo';
import { RezervacijaRepo } from './RezervacijaRepo';



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
      const { idRezervacija, ...jednokratnaData } = JednokratnaMapper.toDomain(jednokratnaDTO);

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

  static async createJednokratna(jednokratnaDTO: JednokratnaDTO): Promise<Jednokratna> {
    const rezervacija = await RezervacijaRepo.createRezervacija(jednokratnaDTO);

    const { idJednokratna, ...jednokratnaData } = JednokratnaMapper.toDomain(jednokratnaDTO);

    const jednokratna = await Jednokratna.create({
      ...jednokratnaData,
      idRezervacija: rezervacija.idRezervacija,
    });

    return jednokratna;
  }

  public static async getJednokratnaByIdRezervacija(idRezervacija: number): Promise<Jednokratna> {
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
    return (await (await this.getJednokratnaByIdJednokratna(idJednokratna)).getRezervacija())
      .idRezervacija;
  }
}