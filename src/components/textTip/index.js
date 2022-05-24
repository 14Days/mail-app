import React from 'react';
import {Text} from 'react-native';

const TextTip = ({value}) => {
  return (
    <Text style={{color: 'grey', marginTop: 50, textAlign: 'center'}}>
      {value}
    </Text>
  );
};

export default TextTip;
