import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import replyIcon from '../static/reply.png';
import deleteIcon from '../static/delete.png';

const Detail = (props) => {
  const {route, mails, mymails} = props;
  const {index, send} = route.params;
  let mail;
  if (send) mail = mymails[index];
  else mail = mails[index];
  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Text style={styles.title}>{mail.title}</Text>
          <Text>发送：{`${mail.from_user}(${mail.from_addr})`}</Text>
          <Text>时间：{mail.time}</Text>
        </View>
        <View style={styles.body}>
          <Text>{mail.content}</Text>
        </View>
      </ScrollView>
      <View style={styles.btnArea}>
        <TouchableOpacity
          style={styles.unreadBtn}
          onPress={() => {
            props.dispatch({
              type: `inbox/handleDeleteOne${send ? 'My' : ''}`,
              payload: {
                id: mail.mail_id,
                index,
                successAction: () => {
                  props.navigation.pop();
                },
              },
            });
          }}>
          <Text style={styles.center}>
            <Image source={deleteIcon} style={styles.icon} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unreadBtn} onPress={() => {}}>
          <Text style={styles.center}>
            <Image source={replyIcon} style={styles.icon} />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
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
});

export default connect((state) => state.inbox)(Detail);
