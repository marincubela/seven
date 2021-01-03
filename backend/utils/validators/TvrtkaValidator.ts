import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class TvrtkaValidator extends BaseValidator {
  static schema = yup.object().shape({
    name: yup.string().required('Naziv ne smije biti prazan'),
    address: yup.string().required('Adresa ne smije biti prazna'),
  });
}
