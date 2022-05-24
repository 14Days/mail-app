import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const QButton = ({title, style, textStyle, press}) => {
  return (
    <TouchableOpacity style={{...styles.view, ...style}} onPress={press}>
      <Text style={{...styles.text, ...textStyle}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  view: {
    backgroundColor: 'white',
  },
});

export default QButton;
