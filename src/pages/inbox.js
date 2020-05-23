import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import Mail from '../components/mail';
import mutilcheckIcon from '../static/multicheck.png';
import deleteIcon from '../static/delete.png';

import {connect} from 'react-redux';

class Inbox extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'inbox/handleInitMail',
    });
    console.log(this.props);
  }
  render() {
    const {props} = this;
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
                type: 'inbox/switchMulticheck',
              });
              console.log(props);
            }}>
            <Text style={styles.center}>
              <Image source={mutilcheckIcon} style={styles.icon} />
              <Text style={styles.topText}>
                {props.multicheck ? '取消多选' : '多选'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {props.mails.map((mail, index) => (
            <Mail
              title={mail.title}
              date={mail.time}
              from={mail.from_user}
              content={mail.content}
              key={index}
              index={index}
              check={mail.check}
              navigate={props.navigation.navigate}
              send={false}
            />
          ))}
        </ScrollView>
        {props.multicheck ? (
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              props.dispatch({
                type: 'inbox/handleDelete',
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

export default connect((state) => state.inbox)(Inbox);
