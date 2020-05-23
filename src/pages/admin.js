import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import InputModal from '../components/InputModal';
import deleteIcon from '../static/delete.png';
import grantIcon from '../static/grant.png';
import revokeIcon from '../static/revoke.png';
import banIcon from '../static/ban.png';
import UserInfo from '../components/user';
import addIcon from '../static/write.png';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      username: '',
      password: '',
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'admin/handleInit',
    });
  }
  grant = (type) => {
    this.props.dispatch({
      type: 'admin/handleGrant',
      payload: {
        type,
      },
    });
  };
  ban = () => {
    this.props.dispatch({
      type: 'admin/handleBan',
    });
  };
  delete = () => {
    this.props.dispatch({
      type: 'admin/handleDelete',
    });
  };
  render() {
    const {props} = this;
    const {userList, checkIndex, dispatch} = props;
    const {visible, username, password} = this.state;
    const registerList = [
      {
        title: '账号',
        value: username,
        bind: (text) => {
          this.setState({
            username: text,
          });
        },
        type: 'username',
      },
      {
        title: '密码',
        value: password,
        bind: (text) => {
          this.setState({
            password: text,
          });
        },
        type: 'password',
      },
    ];
    return userList.length === 0 ? null : (
      <>
        <InputModal
          inputList={registerList}
          visible={visible}
          flip={() => {
            this.setState({
              visible: !visible,
            });
          }}
          commit={() => {
            if (username === '') alert('用户名为空');
            else if (password === '') alert('密码为空');
            else {
              dispatch({
                type: 'user/handleRegister',
                payload: {
                  username,
                  password,
                  successAction: () => {
                    this.setState({
                      visible: false,
                      username: '',
                      password: '',
                    });
                    dispatch({
                      type: 'admin/handleInit',
                    });
                  },
                },
              });
            }
          }}
        />
        <ScrollView>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              this.setState({
                visible: true,
              });
            }}>
            <Image source={addIcon} style={styles.icon} />
          </TouchableOpacity>
          {userList.map((u, index) => (
            <UserInfo userData={u} key={index} index={index} />
          ))}
          <View style={styles.holder} />
        </ScrollView>
        {checkIndex !== -1 ? (
          <View style={styles.bottomArea}>
            <TouchableOpacity style={styles.op} onPress={this.grant}>
              <Image
                source={
                  userList[checkIndex].user_type === 1 ? revokeIcon : grantIcon
                }
                style={styles.opIcon}
              />
              <Text style={styles.opText}>授权/消权</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.op} onPress={this.ban}>
              <Image source={banIcon} style={styles.opIcon} />
              <Text style={styles.opText}>封禁/解封</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.op} onPress={this.delete}>
              <Image source={deleteIcon} style={styles.opIcon} />
              <Text style={styles.opText}>删除账户</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  }
}
const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: 'white',
    height: 50,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
  },
  bottomArea: {
    bottom: 24,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
  },
  holder: {
    height: 100,
  },
  op: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  opIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 24,
    height: 24,
    marginVertical: 13,
  },
  opText: {
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
    marginTop: 5,
  },
});
export default connect((state) => state.admin)(Admin);
