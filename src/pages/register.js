import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

const Register = ({navigation, dispatch}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const commitRegister = () => {
    if (username === '') {
      alert('用户名为空');
    } else if (password === '' || checkPassword === '') {
      alert('密码为空');
    } else if (password !== checkPassword) {
      alert('密码不一致');
    } else {
      dispatch({
        type: 'user/handleRegister',
        payload: {
          username,
          password,
          successAction: () => {
            navigation.pop();
          },
        },
      });
    }
  };
  return (
    <>
      <View style={styles.main}>
        {/*标题文字*/}
        <View style={styles.title}>
          <Text style={styles.titleText}>注册账号</Text>
        </View>
        {/*登陆框*/}
        <View style={styles.signIn}>
          <View style={styles.User}>
            <TextInput
              style={styles.Input}
              placeholder="请输入账号"
              autoCapitalize={'none'}
              maxLength={15}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
          </View>
          <View style={styles.Pwd}>
            <TextInput
              style={styles.Input}
              placeholder="请输入密码"
              textContentType={'password'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              maxLength={16}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View style={styles.User}>
            <TextInput
              style={styles.Input}
              placeholder="重新输入密码"
              textContentType={'password'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              maxLength={10}
              onChangeText={(text) => {
                setCheckPassword(text);
              }}
            />
          </View>
        </View>

        {/*注册*/}
        <TouchableOpacity style={styles.btn} onPress={commitRegister}>
          <Text style={{fontSize: 16}}>注册</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.pop();
          }}>
          <Text style={{fontSize: 16}}>返回</Text>
        </TouchableOpacity>
      </View>
    </>
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
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    borderRadius: 10,
  },
  Input: {
    flex: 1,
    marginLeft: 20,
  },
  User: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#D4D4D4',
    alignItems: 'center',
  },
  Pwd: {
    flex: 1,
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
    borderTopWidth: 1,
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
});

export default connect((state) => state.user)(Register);
