import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import {saveDraftStorage} from '../utils/mail';
import {StackActions} from '@react-navigation/native';
import InputModal from '../components/InputModal';
import ManuList from '../components/manuList';
import maleIcon from '../static/male.png';
import femaleIcon from '../static/female.png';
import quitIcon from '../static/quit.png';
import mnguserIcon from '../static/manageuser.png';
import changepwdIcon from '../static/changepwd.png';

const Mine = (props) => {
  const {dispatch, navigation, ...other} = props;
  const [oldpwd, setOld] = useState('');
  const [newpwd, setNew] = useState('');
  const [asurenew, setAsure] = useState('');
  const [nickname, setNickname] = useState('');
  const list = [
    {
      title: '修改密码',
      icon: changepwdIcon,
      press: () => {
        switchVisible1(!visible1);
      },
    },
    {
      title: '管理用户',
      icon: mnguserIcon,
      press: () => {
        if (props.user_type !== 1) {
          alert('您没有权限!');
        } else {
          props.navigation.navigate('Admin');
        }
      },
    },
    {
      title: '退出登录',
      icon: quitIcon,
      press: () => {
        dispatch({
          type: 'user/handleLogout',
          payload: {
            successAction: () => {
              navigation.dispatch(StackActions.replace('Login'));
            },
          },
        });
      },
    },
  ];
  const changepwdList = [
    {
      title: '旧密码',
      value: oldpwd,
      bind: setOld,
      type: 'password',
    },
    {
      title: '新密码',
      value: newpwd,
      bind: setNew,
      type: 'password',
    },
    {
      title: '确认密码',
      value: asurenew,
      bind: setAsure,
      type: 'newPassword',
    },
  ];
  const infoList = [
    {
      title: '昵称',
      value: nickname,
      bind: setNickname,
      type: 'nickname',
    },
  ];
  const [visible1, switchVisible1] = useState(false);
  const [visible2, switchVisible2] = useState(false);
  const [sex, setSex] = useState(props.sex === 1);
  return (
    <>
      <InputModal
        inputList={changepwdList}
        visible={visible1}
        flip={() => {
          switchVisible1(!visible1);
        }}
        commit={() => {
          if (newpwd !== asurenew) alert('两次输入密码不一致');
          else {
            dispatch({
              type: 'user/handleUpdatePwd',
              payload: {
                userId: props.id,
                username: props.username,
                oldpwd,
                newpwd,
                successAction: () => {
                  switchVisible1(!visible1);
                  setOld('');
                  setNew('');
                  setAsure('');
                },
              },
            });
          }
        }}
      />
      <InputModal
        inputList={infoList}
        visible={visible2}
        flip={() => {
          switchVisible2(!visible2);
        }}
        commit={() => {
          if (nickname === '') alert('昵称为空');
          else {
            dispatch({
              type: 'user/handleUpdateInfo',
              payload: {
                userId: props.id,
                nickname,
                sex: sex ? 1 : 2,
                successAction: () => {
                  switchVisible2(!visible2);
                  setNickname('');
                },
              },
            });
          }
        }}>
        <Text style={{marginLeft: 4, marginTop: 20}}>
          <Text style={styles.sexLabel}>性别</Text>
          <Switch
            trackColor={{false: '#EE799F', true: '#5CACEE'}}
            thumbColor="#eee"
            onValueChange={() => {
              setSex(!sex);
            }}
            value={sex}
            style={styles.switch}
          />
        </Text>
      </InputModal>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          switchVisible2(!visible2);
        }}>
        <View style={styles.cannotChange}>
          <Image
            source={props.sex === 1 ? maleIcon : femaleIcon}
            style={styles.icon}
          />
          <View>
            <Text style={{fontSize: 20}}>{props.nickname}</Text>
            <Text>
              <Text style={styles.text}>
                {props.user_type === 2
                  ? '普通用户 | '
                  : props.user_type === 1
                  ? '管理员用户 | '
                  : '封禁用户 | '}
              </Text>
              <Text style={styles.text}>UID:{props.id}</Text>
            </Text>
          </View>
          <Text>></Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingTop: 40, backgroundColor: 'white'}}>
        <ManuList array={list} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnFont: {
    color: '#6273da',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 50,
  },
  header: {
    backgroundColor: 'white',
  },
  icon: {
    width: 70,
    height: 70,
    margin: 20,
    marginRight: 0,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 35,
  },
  cannotChange: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 40,
  },
  text: {
    color: 'grey',
  },
  editInfo: {
    width: 300,
    height: 200,
    top: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  switch: {
    height: 10,
    width: 70,
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
  sexLabel: {
    color: '#a0a0a0',
    lineHeight: 40,
  },
});

export default connect((state) => state.user)(Mine);
