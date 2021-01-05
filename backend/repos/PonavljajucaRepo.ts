import { Rezervacija } from '../models/Rezervacija';
import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
import { PonavljajucaMapper } from '../mappers/PonavljajucaMapper';
import { Ponavljajuca } from '../models/Ponavljajuca';
import { BaseRepo } from './BaseRepo';
import { RezervacijaRepo } from './RezervacijaRepo';

export class PonavljajucaRepo extends BaseRepo<PonavljajucaDTO> {
  async exists(ponavljajucaDTO: PonavljajucaDTO): Promise<boolean> {
    const { idRezervacija } = PonavljajucaMapper.toDomain(ponavljajucaDTO);

    const rezervacija = await Ponavljajuca.findOne({
      where: {
        idRezervacija,
      },
    });

    return Boolean(rezervacija);
  }

  async delete(ponavljajucaDTO: PonavljajucaDTO): Promise<any> {
    const { idRezervacija } = PonavljajucaMapper.toDomain(ponavljajucaDTO);

    return await Rezervacija.destroy({
      where: {
        idRezervacija,
      },
    });
  }

  async save(ponavljajucaDTO: PonavljajucaDTO): Promise<any> {
    if (await this.exists(ponavljajucaDTO)) {
      const {
        idRezervacija,
        ...ponavljajucaData
      } = PonavljajucaMapper.toDomain(ponavljajucaDTO);

      const rezervacijaRepo = new RezervacijaRepo();
      rezervacijaRepo.save(ponavljajucaDTO);

      return await Ponavljajuca.update(ponavljajucaData, {
        where: {
          idRezervacija,
        },
      });
    }

    return await PonavljajucaRepo.createPonavljajuca(ponavljajucaDTO);
  }

  static async createPonavljajuca(
    ponavljajucaDTO: PonavljajucaDTO
  ): Promise<Ponavljajuca> {
    const rezervacija = await RezervacijaRepo.createRezervacija(
      ponavljajucaDTO
    );

    const { idPonavljajuca, ...ponavljajucaData } = PonavljajucaMapper.toDomain(
      ponavljajucaDTO
    );

    const ponavljajuca = await Ponavljajuca.create({
      ...ponavljajucaData,
      idRezervacija: rezervacija.idRezervacija,
    });

    return ponavljajuca;
  }

  public static async getPonavljajucaByIdRezervacija(
    idRezervacija: number
  ): Promise<Ponavljajuca> {
    return await Ponavljajuca.findOne({
      where: {
        idRezervacija,
      },
    });
  }

  public static async getPonavljajucaByIdPonavljajuca(
    idPonavljajuca: number
  ): Promise<Ponavljajuca> {
    return await Ponavljajuca.findOne({
      where: {
        idPonavljajuca,
      },
    });
  }

  public static async getIdRezervacijaByIdPonavljajuca(
    idPonavljajuca: number
  ): Promise<number> {
    return (
      await (
        await this.getPonavljajucaByIdPonavljajuca(idPonavljajuca)
      ).getRezervacija()
    ).idRezervacija;
  }

  public static async update(
    ponavljajucaDTO: PonavljajucaDTO
  ): Promise<Ponavljajuca> {
    const ponavljajucaData = PonavljajucaMapper.toDomain(ponavljajucaDTO);

    await RezervacijaRepo.updateRezervacija(ponavljajucaDTO);
    
    await Ponavljajuca.update(ponavljajucaData, {
      where: {
        idPonavljajuca: ponavljajucaDTO.idPonavljajuca,
      },
    });

    return await this.getPonavljajucaByIdPonavljajuca(
      ponavljajucaDTO.idPonavljajuca
    );
  }

  public static async getIdPonavljajuca(idRezervacija: number) {
    const ponavljajuca = await this.getPonavljajucaByIdRezervacija(
      idRezervacija
    );
    if (!ponavljajuca) {
      return null;
    }
    return ponavljajuca.idPonavljajuca;
  }
}
