import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class PonavljajucaValidator extends BaseValidator {
  static schema = yup.object().shape({
    startTime: yup.string().required('Vrijeme pocetka je obavezno!'),
    endTime: yup.string().required('Vrijeme kraja je obavezno!'),
    repeatDays: yup.number().required('Dani ponavljanja su obavezni'),
    reservationDate: yup.date().required('Datum rezervacije je obavezno'),
    reservationEndDate: yup.date().required('Datum kraja rezervacije je obavezno'),
  });
}
