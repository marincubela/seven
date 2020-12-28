import { VoziloMapper } from '../mappers/VoziloMapper';
import { Vozilo } from '../models/Vozilo';
import { VoziloDTO } from '../dtos/VoziloDTO';
import { BaseRepo } from './BaseRepo';

export class VoziloRepo extends BaseRepo<VoziloDTO> {
  async exists(voziloDTO: VoziloDTO): Promise<boolean> {
    const { idKlijent } = VoziloMapper.toDomain(voziloDTO);

    const vozilo = await Vozilo.findOne({
      where: {
        idKlijent,
      },
    });

    return Boolean(vozilo);
  }

  async delete(voziloDTO: VoziloDTO): Promise<any> {
    const { idVozilo } = VoziloMapper.toDomain(voziloDTO);

    return await Vozilo.destroy({
      where: {
        idVozilo,
      },
    });
  }

  async save(voziloDTO: VoziloDTO): Promise<any> {
    if (await this.exists(voziloDTO)) {
      const { idVozilo, idKlijent, ...voziloData } = VoziloMapper.toDomain(voziloDTO);

      return await Vozilo.update(voziloData, {
        where: {
          idKlijent,
        },
      });
    }
    return await VoziloRepo.createVozilo(voziloDTO);
  }

  static async createVozilo(voziloDTO: VoziloDTO): Promise<Vozilo> {
    const { idVozilo, ...voziloData } = VoziloMapper.toDomain(voziloDTO);

    const vozilo = await Vozilo.create({
      ...voziloData,
    });

    return vozilo;
  }
}
