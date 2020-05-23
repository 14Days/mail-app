import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {flatContent} from '../../utils/mail';

const Draft = ({data, dispatch, multicheck, navigate}) => {
  const {check, receiver, copy, content, subject, key} = data;
  return (
    <TouchableOpacity
      style={check ? styles.containerCheck : styles.container}
      onPress={() => {
        if (multicheck) {
          dispatch({
            type: 'mail/check',
            payload: {
              key,
            },
          });
        } else {
          navigate('Write', data);
        }
      }}>
      <HeaderText title="收件人" value={receiver} />
      <HeaderText title="抄送" value={copy} />
      <HeaderText title="主题" value={subject} />
      <Text style={{lineHeight: 40}}>{flatContent(content, 25)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  containerCheck: {
    height: 120,
    backgroundColor: '#cae1ff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
});

const HeaderText = ({title, value}) => {
  return (
    <View
      style={{
        height: 24,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={{flex: 0.2, lineHeight: 24, color: '#aaa'}}>{title}</Text>
        <Text
          style={{
            flex: 0.8,
            paddingRight: 20,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default connect((state) => state.mail)(Draft);
