import React from 'react';
import {Text} from 'react-native';

const Splash = ({navigation}) => {
  setTimeout(() => {
    if (Math.floor(Math.random() * 2) === 1) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Main');
    }
  }, 3000);
  return (
    <>
      <Text>Powered By 14Days</Text>
    </>
  );
};

export default Splash;
