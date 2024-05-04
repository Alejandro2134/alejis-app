import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

type IconName = 'Left Arrow' | 'Right Arrow';

interface Props {
  iconName: IconName;
  width?: number;
  height?: number;
}

const selectIconRoute: {[key in IconName]: NodeRequire} = {
  'Left Arrow': require('../../../assets/img/left-arrow.png'),
  'Right Arrow': require('../../../assets/img/right-arrow.png'),
};

const Icon: React.FC<Props> = ({
  iconName,
  width = 100,
  height = 100,
}: Props) => {
  const [iconRoute, setIconRoute] = useState(selectIconRoute[iconName]);

  useEffect(() => {
    setIconRoute(selectIconRoute[iconName]);
  }, [iconName]);

  return <Image source={iconRoute} style={{width, height}} />;
};

export default Icon;
