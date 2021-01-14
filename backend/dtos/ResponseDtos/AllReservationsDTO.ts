import { JednokratnaDTO } from '../JednokratnaDTO';
import { PonavljajucaDTO } from '../PonavljajucaDTO';
import { TrajnaDTO } from '../TrajnaDTO';

export interface AllReservationsDTO {
  singleUse: JednokratnaDTO[];
  repeated: PonavljajucaDTO[];
  permanent: TrajnaDTO[];
}
