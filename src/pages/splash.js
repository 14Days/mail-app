import React from 'react';
import {Text} from 'react-native';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';
import {connect} from 'react-redux';

import {printAllItem} from '../utils/index';

const Splash = ({navigation, dispatch}) => {
  printAllItem();
  // AsyncStorage.getAllKeys().then(res => {console.log(res)})
  AsyncStorage.getItem('expired_time').then(
    (time) => {
      console.log(time);
      const expired = dayjs(time);
      const now = dayjs();
      console.log('expired', expired);
      console.log('now', now);
      console.log('now,s', now.toString());
      if (now.isBefore(expired)) {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Tab'));
        }, 3000);
        dispatch({
          type: 'user/handleLoginedStart',
        });
      } else {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Login'));
        }, 3000);
      }
    },
    (err) => {
      console.log(err);
    },
  );

  return (
    <>
      <Text>广告位招租</Text>
      <Text>Powered By 14Days</Text>
    </>
  );
};

export default connect((state) => state.user)(Splash);
