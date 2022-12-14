import { TvrtkaMapper } from '../mappers/TvrtkaMapper';
import { Tvrtka } from '../models/Tvrtka';
import { TvrtkaDTO } from '../dtos/TvrtkaDTO';
import { BaseRepo } from './BaseRepo';
import { RacunRepo } from './RacunRepo';

export class TvrtkaRepo extends BaseRepo<TvrtkaDTO> {
  async exists(tvrtkaDTO: TvrtkaDTO): Promise<boolean> {
    const { idRacun } = TvrtkaMapper.toDomain(tvrtkaDTO);

    const racun = await Tvrtka.findOne({
      where: {
        idRacun,
      },
    });

    return Boolean(racun);
  }

  async delete(tvrtkaDTO: TvrtkaDTO): Promise<any> {
    const { idRacun } = TvrtkaMapper.toDomain(tvrtkaDTO);

    return await Tvrtka.destroy({
      where: {
        idRacun,
      },
    });
  }

  async save(tvrtkaDTO: TvrtkaDTO): Promise<any> {
    if (await this.exists(tvrtkaDTO)) {
      const { idRacun, ...tvrtkaData } = TvrtkaMapper.toDomain(tvrtkaDTO);

      const racunRepo = new RacunRepo();
      racunRepo.save(tvrtkaDTO);

      return await Tvrtka.update(tvrtkaData, {
        where: {
          idRacun,
        },
      });
    }
    return await TvrtkaRepo.createTvrtka(tvrtkaDTO);
  }

  static async createTvrtka(tvrtkaDTO: TvrtkaDTO): Promise<Tvrtka> {
    const racun = await RacunRepo.createRacun(tvrtkaDTO);

    const { idTvrtka, ...tvrtkaData } = TvrtkaMapper.toDomain(tvrtkaDTO);

    const tvrtka = await Tvrtka.create({
      ...tvrtkaData,
      idRacun: racun.idRacun,
    });

    return tvrtka;
  }

  public static async getTvrtkaByIdRacun(idRacun: number): Promise<Tvrtka> {
    return await Tvrtka.findOne({
      where: {
        idRacun,
      },
    });
  }

  public static async getIdRacunFromIdTvrtka(
    idTvrtka: number
  ): Promise<number> {
    const tvrtka = await Tvrtka.findOne({ where: { idTvrtka } });

    if (tvrtka) {
      return tvrtka.idRacun;
    } else {
      return null;
    }
  }

  public static async update(tvrtkaDTO: TvrtkaDTO): Promise<Tvrtka> {
    const { idRacun, ...tvrtkaData } = TvrtkaMapper.toDomain(tvrtkaDTO);

    await new RacunRepo().save(tvrtkaDTO);

    await Tvrtka.update(tvrtkaData, {
      where: {
        idRacun,
      },
    });

    return this.getTvrtkaByIdRacun(idRacun);
  }

  public static async checkUniqueForUpdate(
    tvrtkaDTO: TvrtkaDTO,
    idRacun: number
  ): Promise<Boolean> {
    return await RacunRepo.checkUniqueForUpdate(tvrtkaDTO, idRacun);
  }
}
