import yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class SessionValidator extends BaseValidator {
  static schema = yup.object().shape({
    email: yup
      .string()
      .required('Email je obvezan')
      .email('Email je neispravan'),
    password: yup.string().required('Lozinka je obavezna'),
  });
}
