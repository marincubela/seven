import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class PonavljajucaValidator extends BaseValidator {
  static shema = yup.object().shape({
    datumRezervacije: yup.date().required('Datum rezervacije je obavezno'),
    datumKrajaRez: yup.date().required('Datum kraja rezervacije je obavezno'),
    daniPonavljanja: yup.date().required('Dani ponavljanja su obavezni'),
    vrijemePocetka: yup.date().required('Vrijeme pocetka je obavezno!'),
    vrijemeKraja: yup.date().required('Vrijeme kraja je obavezno!'),
  });
}
