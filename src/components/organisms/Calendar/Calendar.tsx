import React, {useCallback, useState} from 'react';
import Slider from '../../molecules/Slider/Slider';
import DaysPerMonth from '../../molecules/DaysPerMonth/DaysPerMonth';
import {StyleSheet, View} from 'react-native';
import {
  buildDaysForSpecificMonth,
  getCurrentDate,
  getNextMonthFromActualDate,
  getPreviousMonthFromActualDate,
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

  const nextMonth = useCallback(() => {
    setActivateNextMonth(true);
  }, []);

  const previousMonth = useCallback(() => {
    setActivatePreviousMonth(true);
  }, []);

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
    <View style={styles.calendarContainer}>
      <Slider nextMonth={nextMonth} previousMonth={previousMonth} />

      <SlideAnimation
        activateAnimationToTheLeft={activatePreviousMonth}
        activateAnimationToTheRight={activateNextMonth}
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
        componentContainerAdditionalStyles={styles.sliderAnimation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderAnimation: {
    top: 30,
  },
  calendarContainer: {
    flex: 0.5,
    borderWidth: 3,
    borderColor: '#37464f',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
    backgroundColor: '#131f24',
  },
});

export default Calendar;
