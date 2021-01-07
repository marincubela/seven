import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class TrajnaValidator extends BaseValidator {
  static schema = yup.object().shape({
    startTime: yup
      .date()
      .required('Vrijeme pocetka je obavezno!'),
      endTime: yup
      .date()
      .required('Vrijeme zavrsetka je obavezno!'),
  });
}