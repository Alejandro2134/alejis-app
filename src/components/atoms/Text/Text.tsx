import React from 'react';
import {ColorValue, Text as RNText, StyleSheet} from 'react-native';

interface Props {
  text: string;
  textStyles: {
    color: ColorValue;
    fontSize: number;
  };
}

const Text: React.FC<Props> = ({text, textStyles}: Props) => {
  return <RNText style={[styles.default, textStyles]}>{text}</RNText>;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Nunito-Black',
  },
});

export default Text;
