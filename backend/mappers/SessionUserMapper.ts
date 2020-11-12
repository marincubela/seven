import { ISessionUserDTO } from '../dtos/SessionUserDTO';
import { Mapper } from './Mapper';

export class SessionUserMapper implements Mapper<any, ISessionUserDTO> {
  public static toDomain(raw: any): any {}

  public static toPersistence(vinyl: any): any {}

  public static toDTO(vinyl: any): ISessionUserDTO {
    return null;
  }
}
