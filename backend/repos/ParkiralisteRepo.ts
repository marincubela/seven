import { ParkiralisteMapper } from '../mappers/ParkiralisteMapper';
import { ParkiralisteDTO } from '../dtos/ParkiralisteDTO';
import { BaseRepo } from './BaseRepo';
import { Parkiraliste } from '../models/Parkiraliste';

export class ParkiralisteRepo extends BaseRepo<ParkiralisteDTO> {
  async exists(parkiralisteDTO: ParkiralisteDTO): Promise<boolean> {
    return false;
  }

  async delete(parkiralisteDTO: ParkiralisteDTO): Promise<any> {
    const { idParkiraliste } = ParkiralisteMapper.toDomain(parkiralisteDTO);

    return await Parkiraliste.destroy({
      where: {
        idParkiraliste,
      },
    });
  }

  async save(parkiralisteDTO: ParkiralisteDTO): Promise<any> {
    if (await this.exists(parkiralisteDTO)) {
      const {
        idParkiraliste,
        idTvrtka,
        ...parkiralisteData
      } = ParkiralisteMapper.toDomain(parkiralisteDTO);

      return await Parkiraliste.update(parkiralisteData, {
        where: {
          idParkiraliste,
        },
      });
    }
    return await ParkiralisteRepo.createParkiraliste(parkiralisteDTO);
  }

  static async createParkiraliste(
    parkiralisteDTO: ParkiralisteDTO
  ): Promise<Parkiraliste> {
    const { idParkiraliste, ...parkiralisteData } = ParkiralisteMapper.toDomain(
      parkiralisteDTO
    );

    const parkiraliste = await Parkiraliste.create({
      ...parkiralisteData,
    });

    return parkiraliste;
  }

  static async getParkiralisteByIdParkiraliste(
    idParkiraliste: number
  ): Promise<Parkiraliste> {
    return await Parkiraliste.findOne({
      where: {
        idParkiraliste,
      },
    });
  }

  static async getAll(): Promise<ParkiralisteDTO[]> {
    const parkings = await Parkiraliste.findAll();
    const parkingsDTO: ParkiralisteDTO[] = [];

    for (const parking of parkings) {
      const parkiralisteData = await ParkiralisteMapper.toDTO(parking);

      parkingsDTO.push(parkiralisteData);
    }

    return parkingsDTO;
  }

  static async getParkiralisteFromCompany(
    idTvrtka: number
  ): Promise<ParkiralisteDTO[]> {
    const parkings = await Parkiraliste.findAll({
      where: {
        idTvrtka,
      },
    });
    const parkingsDTO: ParkiralisteDTO[] = [];

    for (const parking of parkings) {
      const parkiralisteData = await ParkiralisteMapper.toDTO(parking);

      parkingsDTO.push(parkiralisteData);
    }

    return parkingsDTO;
  }

  public static async getIdTvrtkaFromIdParkiraliste(
    idParkiraliste: number
  ): Promise<number> {
    const parkiraliste = await Parkiraliste.findOne({
      where: { idParkiraliste },
    });

    if (parkiraliste) {
      return parkiraliste.idTvrtka;
    } else {
      return null;
    }
  }

  static async deleteByIdParkiraliste(idParkiraliste: number): Promise<any> {
    return await Parkiraliste.destroy({
      where: {
        idParkiraliste,
      },
    });
  }
}
