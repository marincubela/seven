import { JednokratnaDTO } from '../JednokratnaDTO';
import { PonavljajucaDTO } from '../PonavljajucaDTO';
import { TrajnaDTO } from '../TrajnaDTO';

export interface ReservationsDTO {
  singleUse: JednokratnaDTO[];
  repeated: PonavljajucaDTO[];
  permanent: TrajnaDTO[];
}
