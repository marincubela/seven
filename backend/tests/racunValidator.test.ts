import { RacunValidator } from '../utils/validators/RacunValidator';
import { KlijentDTO } from '../dtos/KlijentDTO';

describe('Provjera funkcija u RacunValidator', () => {
  it('Provjera 1 - No email input', async () => {
    const klijentDTO = {
      firstName: 'Pero',
      lastName: 'Peric',
      cardNumber: '0012312342325623',
      OIB: '12345678912',
      password: 'lozinka',
    } as KlijentDTO;
    const actual = await RacunValidator.validate(klijentDTO);
    expect(actual).toStrictEqual(['Email je obvezan']);
  });

  it('Provjera 2 - Correct input', async () => {
    const klijentDTO = {
      firstName: 'Pero',
      lastName: 'Peric',
      cardNumber: '0012312342325623',
      email: 'peric@mail.com',
      OIB: '12345678912',
      password: 'lozinka',
    } as KlijentDTO;
    const actual = await RacunValidator.validate(klijentDTO);
    expect(actual.length).toBe(0);
  });

  it('Provjera 3 - Incorrect OIB input', async () => {
    const klijentDTO = {
      firstName: 'Pero',
      lastName: 'Peric',
      cardNumber: '0012312342325623',
      email: 'peric@mail.com',
      OIB: '123456H8912',
      password: 'lozinka',
    } as KlijentDTO;
    const actual = await RacunValidator.validate(klijentDTO);
    expect(actual).toStrictEqual(['OIB mora imati samo brojeve']);
  });

  it('Provjera 4 - Incorrect OIB size', async () => {
    const klijentDTO = {
      firstName: 'Pero',
      lastName: 'Peric',
      cardNumber: '0012312342325623',
      email: 'peric@mail.com',
      OIB: '1234568912',
      password: 'lozinka',
    } as KlijentDTO;
    const actual = await RacunValidator.validate(klijentDTO);
    expect(actual).toStrictEqual(['OIB mora imati 11 brojeva']);
  });

  it('Provjera 5 - Invalid email', async () => {
    const klijentDTO = {
      firstName: 'Pero',
      lastName: 'Peric',
      cardNumber: '0012312342325623',
      email: 'peroperic',
      OIB: '12345678912',
      password: 'lozinka',
    } as KlijentDTO;
    const actual = await RacunValidator.validate(klijentDTO);
    expect(actual).toStrictEqual(['Email je neispravan']);
  });
});
