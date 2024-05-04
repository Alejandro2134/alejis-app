import React from 'react';

import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

interface Props {
  sliderText: string;
  nextMonth: () => void;
  previousMonth: () => void;
}

const TextStyles = {
  color: 'orange',
  fontSize: 20,
};

const Slider: React.FC<Props> = ({
  sliderText,
  nextMonth,
  previousMonth,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={previousMonth}
        touchSoundDisabled={true}>
        <View>
          <Icon iconName="Left Arrow" height={15} width={15} />
        </View>
      </TouchableWithoutFeedback>
      <Text text={sliderText} textStyles={{...TextStyles}} />
      <TouchableWithoutFeedback onPress={nextMonth} touchSoundDisabled={true}>
        <View>
          <Icon iconName="Right Arrow" height={15} width={15} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Slider;
