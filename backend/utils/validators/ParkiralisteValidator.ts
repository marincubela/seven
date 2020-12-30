import * as yup from 'yup';

import { BaseValidator } from './BaseValidator';

export class ParkiralisteValidator extends BaseValidator {
  static schema = yup.object().shape({
    parkingName: yup.string().required('Ime parkirališta ne smije biti prazno'),
    capacity: yup
      .number()
      .required('Kapacitet parkirališta ne smije biti prazan')
      .integer('Kapacitet parkirališta mora biti pozitivan cijeli broj')
      .positive('Kapacitet parkirališta mora biti pozitivan cijeli broj'),
    disabledCapacity: yup
      .number()
      .required(
        'Kapacitet parkirališta za osobe s invaliditetom ne smije biti prazan'
      )
      .integer(
        'Kapacitet parkirališta za osobe s invaliditetom mora biti pozitivan cijeli broj'
      )
      .positive(
        'Kapacitet parkirališta za osobe s invaliditetom mora biti pozitivan cijeli broj'
      ),
    parkingType: yup
      .string()
      .required('Tip parkirališta ne smije biti prazan')
      .oneOf(
        ['otvoreno', 'zatvoreno'],
        'Tip parkirališta može biti otvoreno ili zatvoreno'
      ),
    coordinates: yup
      .string()
      .required('Koordinate ne smiju biti prazne')
      .matches(
        /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/,
        'Koordinate su netočno zadane'
      ),
    oneTimePrice: yup
      .number()
      .required('Cijena jednokratne rezervacije ne smije biti prazna')
      .positive('Cijena mora biti pozitivan broj'),
    repetitivePrice: yup
      .number()
      .required('Cijena ponavljajuće rezervacije ne smije biti prazna')
      .positive('Cijena mora biti pozitivan broj'),
    permanentPrice: yup
      .number()
      .required('Cijena trajne rezervacije ne smije biti prazna')
      .positive('Cijena mora biti pozitivan broj'),
  });
}
