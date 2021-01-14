import { addHours, intervalToDuration, isBefore, parseISO } from 'date-fns';

export class ValidatorFunctions {
  public static checkIsStartBeforeNow(startTime: string): Boolean {
    const start = parseISO(startTime);

    return !isBefore(start, new Date());
  }

  public static checkIsStartBeforeNow6Hours(startTime: string): Boolean {
    const start = parseISO(startTime);

    return !isBefore(start, addHours(new Date(), 6));
  }

  public static checkIsStartBeforeEnd(
    startTime: string,
    endTime: string
  ): Boolean {
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    return isBefore(start, end);
  }

  public static checkIsOneHourLong(
    startTime: string,
    endTime: string
  ): Boolean {
    if (String(startTime) > String(endTime)) {
      return false;
    }
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    const interval = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    });

    return (
      interval.hours >= 1 ||
      interval.days >= 1 ||
      interval.months >= 1 ||
      interval.years >= 1
    );
  }

  public static checkIsOneDayLong(startTime: string, endTime: string): Boolean {
    if (String(startTime) > String(endTime)) {
      return false;
    }
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    const interval = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    });

    return interval.days >= 1 || interval.months >= 1 || interval.years >= 1;
  }
}
