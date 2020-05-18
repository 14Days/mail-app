import React from 'react';
import {Text} from 'react-native';
import Mail from '../components/mail';

const Send = () => {
  return (
    <>
      <Mail
        title="嗯嗯嗯嗯嗯嗯"
        date="2019-04-04 20:00"
        from="行"
        content="正文正文正文正文正文正文"
      />
      <Mail
        title="标题标题"
        date="2019-04-04 20:00"
        from="得"
        content="正文正文正文正文正文正文"
      />
    </>
  );
};

export default Send;
