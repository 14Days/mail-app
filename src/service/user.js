import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {loginURL} from '../utils/url';
import {userInfoURL, registerURL} from '../utils/url';

export const register = async (username, password) => {
  return await Axios({
    url: registerURL,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};

export const login = async (username, password) => {
  return await Axios({
    url: loginURL,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};

export const withToken = async (AxoisConfig) => {
  return new Promise((resolve) => {
    AsyncStorage.getItem('Authorization').then((value) => {
      resolve(
        Axios({
          ...AxoisConfig,
          headers: {
            Authorization: value,
          },
        }),
      );
    });
  });
};

export const getUserInfo = async (userID) => {
  return await withToken({
    url: `${userInfoURL}/${userID}`,
    method: 'GET',
  });
};

export const updateUserPwd = async (userID, newpwd) => {
  return await withToken({
    url: `${userInfoURL}/${userID}`,
    method: 'PUT',
    data: {
      password: newpwd,
    },
  });
};

export const updateUserInfo = async (userID, info) => {
  return await withToken({
    url: `${userInfoURL}/${userID}`,
    method: 'PUT',
    data: info,
  });
};
