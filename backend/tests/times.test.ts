import { ValidatorFunctions } from '../utils/validators/ValidatorFunctions';

describe('Provjera funkcija u ValidatorFunctions', () => {
  it('Provjera 1 - checkIsStartBeforeEnd', () => {
    const actual = ValidatorFunctions.checkIsStartBeforeEnd(
      new Date('2021-01-03').toISOString(),
      new Date('2021-01-04').toISOString()
    );

    expect(actual).toBe(true);
  });

  it('Provjera 2 - checkIsStartBeforeEnd', () => {
    const actual = ValidatorFunctions.checkIsStartBeforeEnd(
      new Date('2021-01-03').toISOString(),
      new Date('2021-01-04').toISOString()
    );

    expect(actual).toBe(false);
  });
});
