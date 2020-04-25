import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import ManuList from '../components/manuList';
import inboxIcon from '../static/inbox.png';
import sendIcon from '../static/send.png';
import tempIcon from '../static/temp.png';
import settingIcon from '../static/setting.svg';
import writeIcon from '../static/write.png';

const Main = (props) => {
  const list = [
    {
      title: '收件箱',
      icon: inboxIcon,
      press: () => {
        props.navigation.navigate('Inbox');
      },
    },
    {
      title: '已发送',
      icon: sendIcon,
      press: () => {
        props.navigation.navigate('Send');
      },
    },
    {
      title: '草稿箱',
      icon: tempIcon,
      press: () => {
        props.navigation.navigate('Inbox');
      },
    },
  ];
  return (
    <>
      <View>
        <ManuList array={list} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Write');
          }}>
          <Image source={writeIcon} style={styles.write} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  write: {
    width: 80,
    height: 80,
    marginTop: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 0.5,
  },
});

export default connect((state) => state.main)(Main);
