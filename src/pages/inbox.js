import React, {useState} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';
import Mail from '../components/mail';
import unreadIcon from '../static/unread.png';
import mutilcheckIcon from '../static/multicheck.png';
import deleteIcon from '../static/delete.png';

import {connect} from 'react-redux';

const Inbox = (props) => {
  return (
    <>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.unreadBtn}>
          <Text style={styles.center}>
            <Image source={unreadIcon} style={styles.icon} />
            <Text style={styles.topText}>查看未读</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.unreadBtn}
          onPress={() => {
            props.dispatch({
              type: 'inbox/switchMulticheck',
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
      {props.mails.map((mail, index) => (
        <Mail
          title={mail.title}
          date={mail.date}
          from={mail.from}
          content={mail.content}
          key={index}
          index={index}
          check={mail.check}
          navigate={props.navigation.navigate}
        />
      ))}
      {props.multicheck ? (
        <TouchableOpacity style={styles.delete}>
          <Image source={deleteIcon} style={styles.deleteIcon} />
        </TouchableOpacity>
      ) : undefined}
    </>
  );
};

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
    flex: 0.5,
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

export default connect((state) => state.inbox)(Inbox);
