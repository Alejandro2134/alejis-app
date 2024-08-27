import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, LayoutChangeEvent} from 'react-native';

type Props = {
  previousComponent: ReactNode;
  nextComponent: ReactNode;
  currentComponent: ReactNode;
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
  currentComponent,
  previousComponent,
  nextComponent,
  activateAnimationToTheRight,
  activateAnimationToTheLeft,
  animationDuration,
  deactivateAnimation,
}: Props) => {
  const previousComponentXPosition = useRef(new Animated.Value(0)).current;
  const currentComponentXPosition = useRef(new Animated.Value(0)).current;
  const nextComponentXPosition = useRef(new Animated.Value(0)).current;
  const [layout, setLayout] = useState<Layout>({width: 0, height: 0});

  const startAnimation = (isForNextMonth: boolean) => {
    const translateComponent = isForNextMonth
      ? nextComponentXPosition
      : previousComponentXPosition;
    const translateComponentToValue = isForNextMonth
      ? -layout.width
      : layout.width;

    Animated.parallel([
      Animated.timing(translateComponent, {
        toValue: translateComponentToValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(currentComponentXPosition, {
        toValue: translateComponentToValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      deactivateAnimation();
      previousComponentXPosition.setValue(0);
      currentComponentXPosition.setValue(0);
      nextComponentXPosition.setValue(0);
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
              transform: [{translateX: previousComponentXPosition}],
              right: layout.width,
              ...styles.months,
            }}>
            {previousComponent}
          </Animated.View>
          <Animated.View
            style={{
              transform: [{translateX: currentComponentXPosition}],
              ...styles.months,
            }}>
            {currentComponent}
          </Animated.View>
          <Animated.View
            style={{
              transform: [{translateX: nextComponentXPosition}],
              left: layout.width,
              ...styles.months,
            }}>
            {nextComponent}
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
