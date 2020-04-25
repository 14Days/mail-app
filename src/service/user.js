import Axois from 'axios';
import {loginURL} from '../utils/url';

export const login = (username, password) => {
  return Axois({
    url: loginURL,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};
