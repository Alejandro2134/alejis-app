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
import SlideAnimation from '../../animations/SlideAnimation/SlideAnimation';

const Calendar = () => {
  const [date, setDate] = useState(getCurrentDate());
  const [nextMonthDate, setNextMonthDate] = useState(
    getNextMonthFromActualDate(date),
  );
  const [previousMonthDate, setPreviousMonthDate] = useState(
    getPreviousMonthFromActualDate(date),
  );
  const [activateNextMonth, setActivateNextMonth] = useState(false);
  const [activatePreviousMonth, setActivatePreviousMonth] = useState(false);

  const nextMonth = () => {
    setActivateNextMonth(true);
  };

  const previousMonth = () => {
    setActivatePreviousMonth(true);
  };

  const recalculateMonths = () => {
    if (activateNextMonth) {
      setDate(nextMonthDate);
      setNextMonthDate(getNextMonthFromActualDate(date));
      setPreviousMonthDate(getPreviousMonthFromActualDate(date));
    }

    if (activatePreviousMonth) {
      setDate(previousMonthDate);
      setNextMonthDate(getNextMonthFromActualDate(date));
      setPreviousMonthDate(getPreviousMonthFromActualDate(date));
    }

    setActivateNextMonth(false);
    setActivatePreviousMonth(false);
  };

  return (
    <View>
      <Slider
        sliderText={`${getDateMonthName(date)} ${getDateYearNumber(date)}`}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
      />

      <SlideAnimation
        activateAnimationToTheLeft={activateNextMonth}
        activateAnimationToTheRight={activatePreviousMonth}
        animationDuration={700}
        currentComponent={
          <DaysPerMonth monthDays={buildDaysForSpecificMonth(date)} />
        }
        deactivateAnimation={recalculateMonths}
        nextComponent={
          <DaysPerMonth monthDays={buildDaysForSpecificMonth(nextMonthDate)} />
        }
        previousComponent={
          <DaysPerMonth
            monthDays={buildDaysForSpecificMonth(previousMonthDate)}
          />
        }
      />
    </View>
  );
};

export default Calendar;
