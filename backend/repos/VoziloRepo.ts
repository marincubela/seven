import { VoziloMapper } from '../mappers/VoziloMapper';
import { Vozilo } from '../models/Vozilo';
import { VoziloDTO } from '../dtos/VoziloDTO';
import { BaseRepo } from './BaseRepo';
export class VoziloRepo extends BaseRepo<VoziloDTO> {
  async exists(voziloDTO: VoziloDTO): Promise<boolean> {
    /*const { idKlijent } = VoziloMapper.toDomain(voziloDTO);

    const vozilo = await Vozilo.findOne({
      where: {
        idKlijent,
      },
    });

    return Boolean(vozilo);
    */

    return false;
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
      const { idVozilo, idKlijent, ...voziloData } = VoziloMapper.toDomain(
        voziloDTO
      );

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
  static async getVoziloByIdVozilo(idVozilo: number): Promise<Vozilo> {
    return await Vozilo.findOne({
      where: {
        idVozilo,
      },
    });
  }

  static async getAll(): Promise<VoziloDTO[]> {
    const vehicles = await Vozilo.findAll();
    const vehiclesDTO: VoziloDTO[] = [];

    for (const vehicle of vehicles) {
      const voziloData = await VoziloMapper.toDTO(vehicle);

      vehiclesDTO.push(voziloData);
    }

    return vehiclesDTO;
  }

  static async getVoziloFromClient(idKlijent: number): Promise<VoziloDTO[]> {
    const vehicles = await Vozilo.findAll({
      where: {
        idKlijent,
      },
    });
    const vehiclesDTO: VoziloDTO[] = [];

    for (const vehicle of vehicles) {
      const voziloData = await VoziloMapper.toDTO(vehicle);

      vehiclesDTO.push(voziloData);
    }

    return vehiclesDTO;
  }

  static async getIdKlijentFromIdVozilo(idVozilo: number): Promise<number> {
    return (await (await this.getVoziloByIdVozilo(idVozilo)).getKlijent())
      .idKlijent;
  }

  static async deleteByIdVozilo(idVozilo: number): Promise<any> {
    return await Vozilo.destroy({
      where: {
        idVozilo,
      },
    });
  }

  public static async idValidationCheck(idVozilo: number): Promise<Boolean>{
    const vozilo = await Vozilo.findOne({
      where: {
        idVozilo,
      },
    });

    return Boolean(vozilo);
  }
}
