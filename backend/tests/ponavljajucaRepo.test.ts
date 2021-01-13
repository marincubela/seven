require('dotenv-flow').config();
import { PonavljajucaRepo } from '../repos/PonavljajucaRepo';
import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
import { isEqual, parseISO } from 'date-fns';

describe('Provjera sinkronih metoda u klasi PonavljajucaRepo', () => {
  it('Provjera 1 - getAllDates', () => {
    const ponavljajucaDTO: PonavljajucaDTO = {
      idVozilo: 4,
      idParkiraliste: 2,
      // 1970-01-01 user for casting time to date
      startTime: new Date('1970-01-01 12:00:00'),
      endTime: new Date('1970-01-01 13:00:00'),
      repeatDays: '4',
      reservationDate: new Date('2021-01-06'),
      reservationEndDate: new Date('2021-01-22'),
    };

    const actual = PonavljajucaRepo.getAllDates(ponavljajucaDTO);

    const expected = [
      {
        startTime: new Date('2021-01-07T12:00:00+01:00'),
        endTime: new Date('2021-01-07T13:00:00+01:00'),
      },
      {
        startTime: new Date('2021-01-14T12:00:00+01:00'),
        endTime: new Date('2021-01-14T13:00:00+01:00'),
      },
      {
        startTime: new Date('2021-01-21T12:00:00+01:00'),
        endTime: new Date('2021-01-21T13:00:00+01:00'),
      },
    ];

    var actualB = true;

    if (actual.length !== expected.length) {
      actualB = false;
    }

    for (let i = 0; i < actual.length; i++) {
      console.log(parseISO(actual[i].startTime), expected[i].startTime);
      if (isEqual(parseISO(actual[i].startTime), expected[i].startTime)) {
        actualB = false;
      }
    }

    expect(actualB).toBe(true);
  });
});
