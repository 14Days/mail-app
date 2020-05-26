import React, {Fragment, useState} from 'react';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Login = ({navigation, dispatch, ...other}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Fragment>
      <View style={styles.main}>
        {/*标题文字*/}
        <View style={styles.title}>
          <Text style={styles.titleText}>邮箱登录</Text>
        </View>
        {/*登陆框*/}
        <View style={styles.signIn}>
          <View style={styles.User}>
            <TextInput
              style={{
                paddingLeft: 25,
                flex: 0.5,
                width: 300,
                height: 50,
              }}
              maxLength={18}
              username={true}
              placeholder="username"
              autoCapitalize={'none'}
              textContentType={'username'}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <Text
              style={{
                flex: 0.5,
                height: 50,
                width: 300,
                lineHeight: 50,
              }}>
              @wghtstudio.cn
            </Text>
          </View>
          <View style={styles.Pwd}>
            <TextInput
              style={styles.Input}
              placeholder="password"
              textContentType={'password'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </View>

        {/*登陆按钮*/}
        <TouchableOpacity
          onPress={() => {
            if (username === '') {
              alert('请输入用户名');
            } else if (password === '') {
              alert('请输入密码');
            } else {
              dispatch({
                type: 'user/handleLogin',
                payload: {
                  username,
                  password,
                  loginSuccessAction: () => {
                    navigation.dispatch(StackActions.replace('Tab'));
                  },
                },
              });
            }
          }}
          style={styles.btn}>
          <Text style={{fontSize: 16, color: '#333'}}>登陆</Text>
        </TouchableOpacity>

        {/*注册按钮*/}
        <TouchableOpacity
          style={styles.regist}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{fontSize: 10}}>>> 没有账号？注册一个 >></Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EDEDED',
    justifyContent: 'flex-start',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
  },
  titleText: {
    color: '#666',
    fontSize: 20,
  },
  signIn: {
    backgroundColor: '#EDEDED',
    width: 300,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    borderRadius: 10,
  },
  Input: {
    marginLeft: 20,
  },
  User: {
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  Pwd: {
    flex: 1,
  },
  btn: {
    display: 'flex',
    backgroundColor: '#D4D4D4',
    height: 40,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regist: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btmText: {
    color: '#B0B0B0',
    fontSize: 10,
    lineHeight: 20,
  },
});

export default connect((state) => state.user)(Login);
