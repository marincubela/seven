import yup from 'yup';

import { KlijentDTO } from '../../dtos/KlijentDTO';
import { BaseValidator } from './BaseValidator';

const racunSchema = yup.object().shape({
  email: yup.string().required('Email je obvezan').email('Email je neispravan'),
  password: yup.string().required('Lozinka je obavezna'),
  admin: yup.boolean().default(false),
  OIB: yup
    .string()
    .required('OIB je obavezan')
    .matches(/^\d*$/, 'OIB mora imati samo brojeve')
    .length(11, 'OIB mora imati 11 brojeva'),
});

export const klijentValidator = (klijentDTO: KlijentDTO) => {};

export class RacunValidator extends BaseValidator {
  private static racunSchema = yup.object().shape({
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

  public static async validate(racunDTO: RacunDTO): Promise<Array<string>> {
    return await RacunValidator.racunSchema
      .validate(racunDTO)
      .then(() => [])
      .catch(({ errors }) => errors);
  }
}
