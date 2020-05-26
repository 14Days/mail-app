import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import TextTip from '../components/textTip';
import DraftItem from '../components/mail/draft';
import mutilcheckIcon from '../static/multicheck.png';
import deleteIcon from '../static/delete.png';

class Draft extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'mail/handleLoad',
    });
  }
  render() {
    // AsyncStorage.setItem(
    //   'draftSet',
    //   JSON.stringify({
    //     usedID: 3,
    //     draftList: {
    //       1: {
    //         subject: 'Hello',
    //         content:
    //           '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
    //         receiver: 'q@host.cn',
    //         copy: 'qzj@host.cn;qxj123@host.cn;',
    //       },
    //       2: {
    //         subject: 'Hello',
    //         content: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    //         receiver: 'q@host.cn',
    //         copy: 'qzj@host.cn;qxj123@host.cn;',
    //       },
    //     },
    //   }),
    // );
    const props = this.props;
    console.log(props);
    const {draftList} = props;
    console.log(Object.keys(draftList).length);
    return (
      <>
        <View style={styles.btnArea}>
          {/* <TouchableOpacity style={styles.unreadBtn}>
          <Text style={styles.center}>
            <Image source={unreadIcon} style={styles.icon} />
            <Text style={styles.topText}>查看未读</Text>
          </Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.unreadBtn}
            onPress={() => {
              props.dispatch({
                type: 'mail/switchMulticheck',
              });
            }}>
            <Text style={styles.center}>
              <Image source={mutilcheckIcon} style={styles.icon} />
              <Text style={styles.topText}>
                {props.multicheck ? '取消多选' : '多选'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {Object.keys(draftList).length === 0 ? (
          <TextTip value="草稿箱为空" />
        ) : (
          Object.keys(draftList).map((key) => (
            <DraftItem
              key={key}
              data={{...draftList[key], key}}
              navigate={props.navigation.navigate}
            />
          ))
        )}
        {props.multicheck ? (
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              props.dispatch({
                type: 'mail/handleDelete',
              });
            }}>
            <Image source={deleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        ) : undefined}
      </>
    );
  }
}

const styles = StyleSheet.create({
  btnArea: {
    height: 48,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    display: 'flex',
    flexDirection: 'row',
  },
  unreadBtn: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 8,
    marginRight: 20,
  },
  topText: {
    lineHeight: 40,
  },
  delete: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 40,
    bottom: 40,
  },
  deleteIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 24,
    height: 24,
    marginVertical: 13,
  },
});

export default connect((state) => state.mail)(Draft);
