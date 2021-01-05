import { RezervacijaMapper } from '../mappers/RezervacijaMapper';
import { Rezervacija } from '../models/Rezervacija';
import { RezervacijaDTO } from '../dtos/RezervacijaDTO';
import { BaseRepo } from './BaseRepo';
import { JednokratnaRepo } from './JednokratnaRepo';
import { TrajnaRepo } from './TrajnaRepo';
import { PonavljajucaRepo } from './PonavljajucaRepo';
import { Op } from 'sequelize';

export class RezervacijaRepo extends BaseRepo<RezervacijaDTO> {
  async exists(rezervacijaDTO: RezervacijaDTO): Promise<boolean> {
    return false;
  }

  async delete(rezervacijaDTO: RezervacijaDTO): Promise<any> {
    const { idRezervacija } = RezervacijaMapper.toDomain(rezervacijaDTO);

    return await Rezervacija.destroy({
      where: {
        idRezervacija,
      },
    });
  }

  async save(rezervacijaDTO: RezervacijaDTO): Promise<any> {
    if (await this.exists(rezervacijaDTO)) {
      const {
        idRezervacija,
        idVozilo,
        idKlijent,
        idParkiraliste,
        ...rezervacijaData
      } = RezervacijaMapper.toDomain(rezervacijaDTO);

      return await Rezervacija.update(rezervacijaData, {
        where: {
          idRezervacija,
        },
      });
    }
    return await RezervacijaRepo.createRezervacija(rezervacijaDTO);
  }

  static async createRezervacija(
    rezervacijaDTO: RezervacijaDTO
  ): Promise<Rezervacija> {
    const {
      idRezervacija,
      ...rezervacijaData
    } = RezervacijaMapper.toDomain(rezervacijaDTO);

    const rezervacija = await Rezervacija.create({
      ...rezervacijaData,
    });
    return rezervacija;
  }

  static async getRezervacijaByIdRezervacija(
    idRezervacija: number
  ): Promise<Rezervacija> {
    return await Rezervacija.findOne({
      where: {
        idRezervacija,
      },
    });
  }

  static async deleteByIdRezervacija(idRezervacija: number): Promise<any> {
    return await Rezervacija.destroy({
      where: {
        idRezervacija,
      },
    });
  }

  static async getReservationsFromClient(
    idKlijent: number
  ): Promise<RezervacijaDTO[]> {
    const reservations = await Rezervacija.findAll({
      where: {
        idKlijent,
      },
    });
    const reservationsDTO: RezervacijaDTO[] = [];

    for (const reservation of reservations) {
      const rezervacijaData = await RezervacijaMapper.toDTO(reservation);

      reservationsDTO.push(rezervacijaData);
    }

    return reservationsDTO;
  }
  //jednokratna
  public static async isJednokratna(idRezervacija: number): Promise<Boolean> {
    return Boolean(
      await JednokratnaRepo.getJednokratnaByIdRezervacija(idRezervacija)
    );
  }
  public static async getIdJednokratna(idRezervacija: number): Promise<Number> {
    return (await JednokratnaRepo.getJednokratnaByIdRezervacija(idRezervacija))
      .idJednokratna;
  }

  //ponavaljajuca
  public static async isPonavljajuca(idRezervacija: number): Promise<Boolean> {
    return Boolean(
      await PonavljajucaRepo.getPonavljajucaByIdRezervacija(idRezervacija)
    );
  }
  public static async getIdPonavljajuca(
    idRezervacija: number
  ): Promise<Number> {
    return (
      await PonavljajucaRepo.getPonavljajucaByIdRezervacija(idRezervacija)
    ).idPonavljajuca;
  }

  //trajna
  public static async isTrajna(idRezervacija: number): Promise<Boolean> {
    return Boolean(await TrajnaRepo.getTrajnaByIdRezervacija(idRezervacija));
  }
  public static async getIdTrajna(idRezervacija: number): Promise<Number> {
    return (await TrajnaRepo.getTrajnaByIdRezervacija(idRezervacija)).idTrajna;
  }
  public static async checkAvailability(rezervacijaDTO:RezervacijaDTO):Promise<Boolean>{
    const rezervacije = await Rezervacija.findAll({
      where: {
        idKlijent: rezervacijaDTO.idParkiraliste,
        idVozilo: rezervacijaDTO.idParkiraliste,
        idParkiraliste: rezervacijaDTO.idParkiraliste,
      },
    });
    if(rezervacije.length!=0)
      return false
    return true;
  }
}
