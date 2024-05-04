import {DateTime} from 'luxon';

const getCurrentDate = () => {
  return DateTime.now();
};

const getDateMonthName = (date: DateTime) => {
  return date.monthLong!;
};

const getDateYearNumber = (date: DateTime) => {
  return date.year;
};

const getNumberOfDaysForMonth = (date: DateTime) => {
  return date.daysInMonth;
};

const getNextMonthFromActualDate = (date: DateTime) => {
  return date.plus({months: 1});
};

const getPreviousMonthFromActualDate = (date: DateTime) => {
  return date.minus({months: 1});
};

const daysMap = new Map<number, number>([
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 1],
]);

const buildDaysForSpecificMonth = (date: DateTime) => {
  const monthNumberOfDays = getNumberOfDaysForMonth(date);

  let daysInMonth: string[] = [];

  if (monthNumberOfDays) {
    const remainingDaysInitialWeek = calculateRemainingDaysOfInitialWeek(date);
    const remainingDaysLastWeek = calculateRemainingDaysOfLastWeek(date);

    for (let i = 1; i <= monthNumberOfDays; i++) {
      daysInMonth.push(i.toString());
    }

    for (let i = 0; i < remainingDaysInitialWeek; i++) {
      daysInMonth.unshift('');
    }

    for (let i = 0; i < remainingDaysLastWeek; i++) {
      daysInMonth.push('');
    }
  }

  return daysInMonth;
};

const calculateRemainingDaysOfInitialWeek = (date: DateTime) => {
  const startDayOfActualMonth = date.startOf('month').weekday;
  const startRemainingDays = 7 - daysMap.get(startDayOfActualMonth)!;
  const remainingDays = 7 - (startRemainingDays + 1);
  return remainingDays;
};

const calculateRemainingDaysOfLastWeek = (date: DateTime) => {
  const endDayOfActualMonth = date.endOf('month').weekday;
  const endRemainingDays = 7 - daysMap.get(endDayOfActualMonth)!;
  return endRemainingDays;
};

export {
  getCurrentDate,
  getNumberOfDaysForMonth,
  buildDaysForSpecificMonth,
  getDateMonthName,
  getDateYearNumber,
  getNextMonthFromActualDate,
  getPreviousMonthFromActualDate,
};
