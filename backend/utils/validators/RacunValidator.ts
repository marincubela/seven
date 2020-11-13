import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class RacunValidator extends BaseValidator {
  static schema = yup.object().shape({
    email: yup
      .string()
      .required('Email je obvezan')
      .email('Email je neispravan'),
    password: yup.string().required('Lozinka je obavezna'),
    admin: yup.boolean().default(false),
    OIB: yup
      .string()
      .required('OIB je obavezan')
      .matches(/^\d*$/, 'OIB mora imati samo brojeve')
      .length(11, 'OIB mora imati 11 brojeva'),
  });
}
