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
  public static toDateFromHours(hours: Date): Date{
    var t1 = new Date();
    var parts = hours.toString().split(":");
    t1.setHours(+parts[0],+parts[1],+parts[2],0);
    return t1;
  }

  public static toDateFromMonths(months: Date):Date{
    var field=months.toString().split("-");
    return new Date(+field[0], +field[1], +field[2]);
  }

  public static async checkTime(ponavljajucaDTO: PonavljajucaDTO): Promise<Boolean>{
    const currentDate=new Date();
    var start = PonavljajucaRepo.toDateFromHours(ponavljajucaDTO.startTime)
    var end = PonavljajucaRepo.toDateFromHours(ponavljajucaDTO.endTime)
  
    if(start.getTime()> end.getTime() || start.getTime()>currentDate.getTime())
          return false;
    return true;
  }

  public static async checkMinDuration(ponavljajucaDTO:PonavljajucaDTO):Promise<Boolean>{
    var start = PonavljajucaRepo.toDateFromHours(ponavljajucaDTO.startTime)
    var end = PonavljajucaRepo.toDateFromHours(ponavljajucaDTO.endTime)
    if((end.getTime()-start.getTime())/3600<1)
          return false;
    return true;
  }

  public static async checkRepeatDays(ponavljajucaDTO:PonavljajucaDTO):Promise<Boolean>{
    if(!(ponavljajucaDTO.repeatDays.toString(ponavljajucaDTO.repeatDays).match(/^[1-7]+$/)))
            return false;
    return true;
  }

  public static async checkTimespan(ponavljajucaDTO:PonavljajucaDTO):Promise<Boolean>{
    var resStart=PonavljajucaRepo.toDateFromMonths(ponavljajucaDTO.reservationDate);
    var resEnd=PonavljajucaRepo.toDateFromMonths(ponavljajucaDTO.reservationEndDate);
    if((resEnd.getTime()-resStart.getTime())/(3600*24)<30)
            return false;
    return true;
  }
}
