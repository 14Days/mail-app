import Axios from 'axios';
import {userInfoURL} from '../utils/url';
import {withToken} from './user';
export const getUserList = async () => {
  return await withToken({
    url: userInfoURL,
    method: 'GET',
  });
};

export const grantAmdin = async (id, user_type) => {
  return await withToken({
    url: `${userInfoURL}/${id}`,
    method: 'PUT',
    data: {
      user_type,
    },
  });
};

export const deleteUser = async (id) => {
  return await withToken({
    url: `${userInfoURL}/${id}`,
    method: 'DELETE',
  });
};
