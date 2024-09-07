import React, {memo, useState} from 'react';

import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import SlideAnimation from '../../animations/SlideAnimation/SlideAnimation';
import {
  getCurrentDate,
  getDateMonthName,
  getDateYearNumber,
  getNextMonthFromActualDate,
  getPreviousMonthFromActualDate,
} from '../../../helpers/date_and_time';

interface Props {
  nextMonth: () => void;
  previousMonth: () => void;
}

const TextStyles = {
  color: 'orange',
  fontSize: 20,
};

const Slider: React.FC<Props> = ({nextMonth, previousMonth}: Props) => {
  const [date, setDate] = useState(getCurrentDate());
  const [nextMonthDate, setNextMonthDate] = useState(
    getNextMonthFromActualDate(date),
  );
  const [previousMonthDate, setPreviousMonthDate] = useState(
    getPreviousMonthFromActualDate(date),
  );
  const [activateNextMonth, setActivateNextMonth] = useState(false);
  const [activatePreviousMonth, setActivatePreviousMonth] = useState(false);

  const handleNextMonth = () => {
    nextMonth();
    setActivateNextMonth(true);
  };

  const handlePreviousMonth = () => {
    previousMonth();
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
      <SlideAnimation
        activateAnimationToTheLeft={activatePreviousMonth}
        activateAnimationToTheRight={activateNextMonth}
        animationDuration={700}
        currentComponent={
          <Text
            text={`${getDateMonthName(date)} ${getDateYearNumber(date)}`}
            textStyles={{...TextStyles}}
          />
        }
        deactivateAnimation={recalculateMonths}
        nextComponent={
          <Text
            text={`${getDateMonthName(nextMonthDate)} ${getDateYearNumber(
              nextMonthDate,
            )}`}
            textStyles={{...TextStyles}}
          />
        }
        previousComponent={
          <Text
            text={`${getDateMonthName(previousMonthDate)} ${getDateYearNumber(
              previousMonthDate,
            )}`}
            textStyles={{...TextStyles}}
          />
        }
        componentContainerAdditionalStyles={styles.sliderAmimation}
      />

      <TouchableWithoutFeedback
        onPress={handlePreviousMonth}
        touchSoundDisabled={true}>
        <View style={styles.containerLeftIcon}>
          <Icon iconName="Left Arrow" height={15} width={15} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={handleNextMonth}
        touchSoundDisabled={true}>
        <View style={styles.containerRightIcon}>
          <Icon iconName="Right Arrow" height={15} width={15} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeftIcon: {
    position: 'absolute',
    left: 0,
    top: 5,
  },
  containerRightIcon: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
  sliderAmimation: {
    alignItems: 'center',
  },
});

export default memo(Slider);
