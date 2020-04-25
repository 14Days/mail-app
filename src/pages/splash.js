import React from 'react';
import {Text} from 'react-native';
import {StackActions} from '@react-navigation/native';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.dispatch(StackActions.replace('Login'));
  }, 3000);
  return (
    <>
      <Text>广告位招租</Text>
      <Text>Powered By 14Days</Text>
    </>
  );
};

export default Splash;
