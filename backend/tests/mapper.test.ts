import { VoziloMapper } from '../mappers/VoziloMapper';
import { VoziloDTO } from '../dtos/VoziloDTO';
import { KlijentMapper } from '../mappers/KlijentMapper';
import { KlijentDTO } from '../dtos/KlijentDTO';

describe('Provjera funkcija u VoziloMapper', () => {
  it('Provjera 1 - Vozilo toDomain', () => {
    const voziloDTO = {
      registration: 'zg8787hn',
      carName: 'ford',
      color: 'blue',
      idKlijent: 2,
      idVozilo: 1,
    } as VoziloDTO;
    expect(VoziloMapper.toDomain(voziloDTO)).toStrictEqual({
      idVozilo: 1,
      registracija: 'zg8787hn',
      nazivVozila: 'ford',
      boja: 'blue',
      idKlijent: 2,
    });
  });

  it('Provjera 2 - Klijent toDomain', () => {
    const klijentDTO = {
      idKlijent: 2,
      firstName: 'Ana',
      lastName: 'Maric',
      cardNumber: '1298656293745610',
      idRacun: 3,
      OIB: '12345678910',
      admin: false,
      password: 'password',
    } as KlijentDTO;
    expect(KlijentMapper.toDomain(klijentDTO)).toStrictEqual({
      idKlijent: 2,
      brojKartice: '1298656293745610',
      ime: 'Ana',
      prezime: 'Maric',
      idRacun: 3,
    });
  });
});
