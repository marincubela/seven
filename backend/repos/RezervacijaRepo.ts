import { RezervacijaMapper } from '../mappers/RezervacijaMapper';
import { Rezervacija } from '../models/Rezervacija';
import { RezervacijaDTO } from '../dtos/RezervacijaDTO';
import { BaseRepo } from './BaseRepo';

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
}
