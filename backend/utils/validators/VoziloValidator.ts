import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class VoziloValidator extends BaseValidator {
  static schema = yup.object().shape({
    registration: yup.string().required('Registracija ne smije biti prazna'),
    carName: yup.string().required('Ime ne smije biti prazno'),
  });
}