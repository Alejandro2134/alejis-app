import React, {useState} from 'react';
import Slider from '../../molecules/Slider/Slider';
import DaysPerMonth from '../../molecules/DaysPerMonth/DaysPerMonth';
import {View} from 'react-native';
import {
  buildDaysForSpecificMonth,
  getCurrentDate,
  getNextMonthFromActualDate,
  getPreviousMonthFromActualDate,
  getDateMonthName,
  getDateYearNumber,
} from '../../../helpers/date_and_time';

const Calendar = () => {
  const [date, setDate] = useState(getCurrentDate());

  const nextMonth = () => {
    setDate(getNextMonthFromActualDate(date));
  };

  const previousMonth = () => {
    setDate(getPreviousMonthFromActualDate(date));
  };

  return (
    <View>
      <Slider
        sliderText={`${getDateMonthName(date)} ${getDateYearNumber(date)}`}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
      />
      <DaysPerMonth monthDays={buildDaysForSpecificMonth(date)} />
    </View>
  );
};

export default Calendar;
