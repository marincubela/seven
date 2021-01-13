import { ValidatorFunctions } from '../utils/validators/ValidatorFunctions';

describe('Provjera funkcija u ValidatorFunctions', () => {
  it('Provjera 1 - checkIsStartBeforeEnd', () => {
    const actual = ValidatorFunctions.checkIsStartBeforeEnd(
      new Date('2021-01-03').toISOString(),
      new Date('2021-01-04').toISOString()
    );

    expect(actual).toBe(true);
  });

  it('Provjera 2 - checkIsStartBeforeNow', () => {
    const actual = ValidatorFunctions.checkIsStartBeforeNow(
      new Date('2021-01-01').toISOString()
    );

    expect(actual).toBe(false);
  });
  
  it('Provjera 3 - checkIsStartBeforeNow6Hours', () =>{
    const actual = ValidatorFunctions.checkIsStartBeforeNow6Hours(
      new Date('2021-09-09').toISOString()
    );
    expect(actual).toBe(true);
  });

  it('Provjera 4 - checkIsOneHourLongTrue', () =>{
    const actual = ValidatorFunctions.checkIsOneHourLong(
      new Date('2021-09-09 09:33:00').toISOString(),
      new Date('2021-09-09 10:33:00').toISOString()
    );
    expect(actual).toBe(true);
  });

  it('Provjera 5 - checkIsOneHourLongFalse', () =>{
    const actual = ValidatorFunctions.checkIsOneHourLong(
      new Date('2021-09-09 09:33:00').toISOString(),
      new Date('2021-09-09 10:32:59').toISOString()
    );
    expect(actual).toBe(false);
  });

  it('Provjera 6 - checkIsOneDayLongTrue', () =>{
    const actual = ValidatorFunctions.checkIsOneDayLong(
      new Date('2021-09-09 09:33:00').toISOString(),
      new Date('2021-10-09 10:33:00').toISOString()
    );
    expect(actual).toBe(true);
  });

  it( 'Provjera 7 - checkIsOneDayLongFalse', () =>{
    const actual = ValidatorFunctions.checkIsOneDayLong(
      new Date('2021-09-09 09:33:00').toISOString(),
      new Date('2021-09-10 02:32:59').toISOString()
    );
    expect(actual).toBe(false);
  });
});
