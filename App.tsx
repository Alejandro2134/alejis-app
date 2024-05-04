import React from 'react';
import SlideAnimation from './src/components/animations/SlideAnimation/SlideAnimation';
import {Button} from 'react-native';

const App = () => {
  return (
    <SlideAnimation
      currentMonth={<Button title="Hello, world!" onPress={() => {}} />}
      previousMonth={<Button title="Helloss" onPress={() => {}} />}
    />
  );
};

export default App;
