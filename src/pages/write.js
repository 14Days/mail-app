import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {fixedReceiver} from '../utils/mail';
import sendIcon from '../static/send.png';
import saveLocalIcon from '../static/savelocal.png';

const Write = (props) => {
  console.log(props.route.params);
  const fromDraft = props.route.params !== undefined;
  const {params} = props.route;
  const [receiver, setReceiver] = useState(
    props.user_type === 1 ? '发往所有用户' : fromDraft ? params.receiver : '',
  );
  const [copy, setCopy] = useState(fromDraft ? params.copy : '');
  const [subject, setSubject] = useState(fromDraft ? params.subject : '');
  const [content, setContent] = useState(fromDraft ? params.content : '');
  const clear = () => {
    setContent('');
    setCopy('');
    setSubject('');
    setReceiver('');
  };
  return (
    <>
      <ScrollView>
        <HeaderText
          editable={props.user_type !== 1}
          title="收件人"
          value={receiver}
          setter={setReceiver}
        />
        <HeaderText
          editable={props.user_type !== 1}
          title="抄送"
          placeholder="多个用户请用';'分割"
          value={copy}
          setter={(t) => {
            setCopy(t);
            fixedReceiver(receiver, setReceiver, t, copy, setCopy);
          }}
        />
        <HeaderText title="主题" value={subject} setter={setSubject} />

        <KeyboardAvoidingView>
          <TextInput
            multiline={true}
            style={{
              backgroundColor: 'white',
              height: 500,
              textAlignVertical: 'top',
              paddingHorizontal: 30,
              paddingTop: 20,
            }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{backgroundColor: 'white'}}>
        {receiver && subject ? (
          <TouchableOpacity
            style={styles.send}
            onPress={() => {
              props.dispatch({
                type: 'mail/handleSend',
                payload: {
                  subject,
                  content,
                  receiver,
                  copy,
                  successAction: () => {
                    clear();
                    props.navigation.pop();
                    if (params && params.draft !== undefined) {
                      const {key} = params.draft;
                      props.dispatch({
                        type: 'mail/handleDeleteOne',
                        payload: {
                          key,
                        },
                      });
                    }
                  },
                },
              });
            }}>
            <Image source={sendIcon} style={styles.btnIcon} />
          </TouchableOpacity>
        ) : null}
        {receiver && subject ? (
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              props.dispatch({
                type: 'mail/handleUpdateDraft',
                payload: {
                  data: {
                    receiver,
                    copy,
                    content,
                    subject,
                    key: fromDraft ? params.key : undefined,
                  },
                  successAction: () => {
                    clear();
                    alert('已将内容保存至草稿箱!');
                    props.navigation.pop();
                  },
                },
              });
            }}>
            <Image source={saveLocalIcon} style={styles.btnIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const HeaderText = ({title, value, setter, editable, placeholder}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 51,
        paddingLeft: 20,
      }}>
      <View
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          display: 'flex',
          flexDirection: 'row',
          // paddingRight: title === '收件人' ? 60 : 0,
        }}>
        <Text
          style={{flex: 0.2, lineHeight: 50, color: '#aaa', paddingLeft: 10}}>
          {title}
        </Text>
        <TextInput
          style={{
            flex: 0.8,
            paddingRight: 20,
          }}
          placeholder={placeholder}
          editable={editable}
          value={value}
          onChangeText={(t) => {
            setter(t);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  send: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 40,
    bottom: 0,
  },
  save: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    left: 40,
    bottom: 0,
  },
  btnIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 24,
    height: 24,
    marginVertical: 13,
  },
});

export default connect((state) => ({
  ...state.mail,
  ...state.user,
}))(Write);
