import React, {ReactNode, useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

type Props = {
  previousMonth: ReactNode;
  nextMonth?: ReactNode;
  currentMonth: ReactNode;
};

const SlideAnimation: React.FC<Props> = ({
  currentMonth,
  previousMonth,
}: Props) => {
  const xPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(xPosition, {
      toValue: 400,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View>
      <Animated.View
        style={{
          transform: [{translateX: xPosition}],
          elevation: 100,
          position: 'absolute',
          width: '100%',
          left: -400,
        }}>
        {previousMonth}
      </Animated.View>

      <Animated.View
        style={{elevation: 0, position: 'absolute', width: '100%'}}>
        {currentMonth}
      </Animated.View>
    </View>
  );
};

export default SlideAnimation;
