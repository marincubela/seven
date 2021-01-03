import { TvrtkaDTO } from '../TvrtkaDTO';
import { KlijentDTO } from '../KlijentDTO';

export interface UsersDTO {
  clients: KlijentDTO[];
  companies: TvrtkaDTO[];
}
