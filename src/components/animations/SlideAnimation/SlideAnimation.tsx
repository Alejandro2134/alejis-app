import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, LayoutChangeEvent} from 'react-native';

type Props = {
  previousMonth: ReactNode;
  nextMonth: ReactNode;
  currentMonth: ReactNode;
  activateAnimationToTheRight: boolean;
  activateAnimationToTheLeft: boolean;
  animationDuration: number;
  deactivateAnimation: () => void;
};

type Layout = {
  width: number;
  height: number;
};

const SlideAnimation: React.FC<Props> = ({
  currentMonth,
  previousMonth,
  nextMonth,
  activateAnimationToTheRight,
  activateAnimationToTheLeft,
  animationDuration,
  deactivateAnimation,
}: Props) => {
  const previousMonthXPosition = useRef(new Animated.Value(0)).current;
  const currentMonthXPosition = useRef(new Animated.Value(0)).current;
  const nextMonthXPosition = useRef(new Animated.Value(0)).current;
  const [layout, setLayout] = useState<Layout>({width: 0, height: 0});

  const startAnimation = (isForNextMonth: boolean) => {
    const translateMonth = isForNextMonth
      ? nextMonthXPosition
      : previousMonthXPosition;
    const translateMonthToValue = isForNextMonth ? -layout.width : layout.width;

    Animated.parallel([
      Animated.timing(translateMonth, {
        toValue: translateMonthToValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(currentMonthXPosition, {
        toValue: translateMonthToValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      deactivateAnimation();
      previousMonthXPosition.setValue(0);
      currentMonthXPosition.setValue(0);
      nextMonthXPosition.setValue(0);
    });
  };

  useEffect(() => {
    if (activateAnimationToTheRight) {
      startAnimation(true);
    }

    if (activateAnimationToTheLeft) {
      startAnimation(false);
    }
  });

  const onLayoutHandler = (e: LayoutChangeEvent) => {
    const {height, width} = e.nativeEvent.layout;
    setLayout({height, width});
  };

  return (
    <View onLayout={onLayoutHandler}>
      {layout && (
        <>
          <Animated.View
            style={{
              transform: [{translateX: previousMonthXPosition}],
              right: layout.width,
              ...styles.months,
            }}>
            {previousMonth}
          </Animated.View>
          <Animated.View
            style={{
              transform: [{translateX: currentMonthXPosition}],
              ...styles.months,
            }}>
            {currentMonth}
          </Animated.View>
          <Animated.View
            style={{
              transform: [{translateX: nextMonthXPosition}],
              left: layout.width,
              ...styles.months,
            }}>
            {nextMonth}
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  months: {
    position: 'absolute',
    width: '100%',
  },
});

export default SlideAnimation;
