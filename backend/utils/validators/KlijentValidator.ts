import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class KlijentValidator extends BaseValidator {
  static schema = yup.object().shape({
    firstName: yup.string().required('Ime ne smije biti prazano'),
    lastName: yup.string().required('Prezime ne smije biti prazno'),
    cardNumber: yup
      .string()
      .required('Broj kartice je obavezan')
      .matches(/^\d*$/, 'Broj kartice mora imati samo brojeve')
      .length(16, 'Broj kartice mora imati 16 brojeva'),
  });
}
