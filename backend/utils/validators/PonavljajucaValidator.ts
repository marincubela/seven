import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class PonavljajucaValidator extends BaseValidator {
  static schema = yup.object().shape({
    startTime: yup.string().required('Vrijeme pocetka je obavezno!'),
    endTime: yup.string().required('Vrijeme kraja je obavezno!'),
    repeatDays: yup
      .number()
      .required('Dani ponavljanja su obavezni')
      .min(0, 'Dani ponavljanja moraju biti broj između 0 i 6')
      .max(6, 'Dani ponavljanja moraju biti broj između 0 i 6'),
    reservationDate: yup.date().required('Datum rezervacije je obavezno'),
    reservationEndDate: yup
      .date()
      .required('Datum kraja rezervacije je obavezno'),
  });
}
