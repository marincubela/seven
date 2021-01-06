import { Rezervacija } from '../models/Rezervacija';
import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
import { JednokratnaDTO } from '../dtos/JednokratnaDTO';
import { PonavljajucaMapper } from '../mappers/PonavljajucaMapper';
import { Ponavljajuca } from '../models/Ponavljajuca';
import { BaseRepo } from './BaseRepo';
import { RezervacijaRepo } from './RezervacijaRepo';
import { Op } from 'sequelize';

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
  public static checkOverlapForOnetime(jednokratnaDTO:JednokratnaDTO){
        const timeClash=Ponavljajuca.findAll({
          where: {
            [Op.or]: {
              vrijemePocetak: {
                [Op.between]: [jednokratnaDTO.startTime, jednokratnaDTO.endTime],
              },
              vrijemeKraj: {
                [Op.between]: [jednokratnaDTO.startTime, jednokratnaDTO.endTime],
              },
              [Op.and]:{
                vrijemeKraj: {[Op.gt]: jednokratnaDTO.endTime},
                vrijemePocetak: {[Op.lt]: jednokratnaDTO.endTime}
              }
            },
          },
        })
  }

  public static async checkTime(ponavljajucaDTO: PonavljajucaDTO): Promise<Boolean>{
    const currentDate=new Date();
    if(ponavljajucaDTO.startTime>ponavljajucaDTO.endTime || (ponavljajucaDTO.endTime.getTime()-ponavljajucaDTO.startTime.getTime())/3600<1
        || !(ponavljajucaDTO.repeatDays.toString(ponavljajucaDTO.repeatDays).match(/^[1-7]+$/)))
          return false;
    return true;
  }
}
