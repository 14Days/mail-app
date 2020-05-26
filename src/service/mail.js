import {receiveURL, sendURL} from '../utils/url';
import {withToken} from './user';
export const getMailList = () => {
  return withToken({
    url: receiveURL,
    method: 'GET',
  });
};

export const mailDetail = (mail_id) => {
  return withToken({
    url: `${receiveURL}/${mail_id}`,
    method: 'GET',
  });
};

export const sendMailDetail = (mail_id) => {
  return withToken({
    url: `${sendURL}/${mail_id}`,
    method: 'GET',
  });
};

export const deleteMail = (mail_id) => {
  return withToken({
    url: `${receiveURL}/${mail_id}`,
    method: 'DELETE',
  });
};

export const sendMail = (subject, content, receivers) => {
  const data = {
    subject,
    content,
  };
  if (receivers.length !== 0) data.receivers = receivers;
  return withToken({
    url: sendURL,
    method: 'POST',
    data,
  });
};

export const getMyMailList = () => {
  return withToken({
    url: sendURL,
    method: 'GET',
  });
};
