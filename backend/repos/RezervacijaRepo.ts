import { RezervacijaMapper } from '../mappers/RezervacijaMapper';
import { Rezervacija } from '../models/Rezervacija';
import { RezervacijaDTO } from '../dtos/RezervacijaDTO';
import { BaseRepo } from './BaseRepo';
import { JednokratnaRepo } from './JednokratnaRepo';
import { TrajnaRepo } from './TrajnaRepo';
import { PonavljajucaRepo } from './PonavljajucaRepo';
import { ReservationsDTO } from '../dtos/ResponseDtos/ReservationsDTO'
import { JednokratnaMapper } from '../mappers/JednokratnaMapper';
import { PonavljajucaMapper } from '../mappers/PonavljajucaMapper';
import { TrajnaMapper } from '../mappers/TrajnaMapper';

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
      idVozilo,
      idKlijent,
      idParkiraliste,
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
  ): Promise<ReservationsDTO> {
    const reservations = await Rezervacija.findAll({
      where: {
        idKlijent,
      },
    });

    //sta ako nema rezervacija?
    
    const reservationsDTO: ReservationsDTO = {singleUse: [], repeated: [], permanent: []};
    
    for(const reservation of reservations){
        if(await RezervacijaRepo.isJednokratna(reservation.idRezervacija)){
          const jednokratna = await JednokratnaRepo.getJednokratnaByIdRezervacija(reservation.idRezervacija);
          reservationsDTO.singleUse.push(await JednokratnaMapper.toDTO(jednokratna));
        }
        else if(await RezervacijaRepo.isPonavljajuca(reservation.idRezervacija)){
          const ponavljajuca = await PonavljajucaRepo.getPonavljajucaByIdRezervacija(reservation.idRezervacija);
          reservationsDTO.repeated.push(await PonavljajucaMapper.toDTO(ponavljajuca));
        }
        else if(await RezervacijaRepo.isTrajna(reservation.idRezervacija)){
          const trajna = await TrajnaRepo.getTrajnaByIdRezervacija(reservation.idRezervacija);
          reservationsDTO.permanent.push(await TrajnaMapper.toDTO(trajna));
        }
        else{
          throw new Error('Rezervacija nije ni jednokratna ni ponavljajuca ni trajna, greska u bazi');
        }
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
}
