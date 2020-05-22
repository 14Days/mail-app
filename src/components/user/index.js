import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import maleIcon from '../../static/male.png';
import femaleIcon from '../../static/female.png';

const UserInfo = (props) => {
  const {userData, dispatch, index, checkIndex} = props;
  const {username, sex, nickname, user_type, id} = userData;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: 'admin/check',
            payload: {
              checkIndex: index === checkIndex ? -1 : index,
            },
          });
        }}>
        <View
          style={index === checkIndex ? styles.checkItem : styles.itemStyle}>
          <Image
            source={sex === 1 ? maleIcon : femaleIcon}
            style={styles.icon}
          />
          <Text
            style={[
              styles.text,
              styles.title,
            ]}>{`${username}(${nickname})`}</Text>
          <Text style={{...styles.text, flex: 0.35}}>
            {user_type === 1
              ? '管理员'
              : user_type === 2
              ? '普通用户'
              : '已封禁'}
          </Text>
          {/* <Text style={[styles.text, styles.enter]}>{'>'}</Text> */}
        </View>
      </TouchableOpacity>
      {/* {show ? <Detail id={id} type={user_type} /> : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  // operate: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   backgroundColor: 'white',
  //   justifyContent: 'space-evenly',
  // },
  // btn: {
  //   width: '33.3%',
  //   height: 40,
  // },
  // btntext: {
  //   textAlign: 'center',
  //   lineHeight: 40,
  //   fontSize: 18,
  // },
  icon: {
    width: 30,
    height: 30,
    marginVertical: 10,
    marginRight: 20,
  },
  text: {
    color: '#555',
    fontSize: 15,
    lineHeight: 50,
  },
  title: {
    flex: 0.95,
  },
  // enter: {
  //   flex: 0.05,
  //   fontSize: 15,
  // },
  itemStyle: {
    height: 50,
    paddingLeft: 50,
    paddingRight: 30,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  checkItem: {
    height: 50,
    paddingLeft: 50,
    paddingRight: 30,
    backgroundColor: '#cae1ff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});

export default connect((state) => state.admin)(UserInfo);

// const Detail = connect((state) => state.admin)((props) => {
//   const {id, type, dispatch} = props;
//   const grant = (type) => {
//     dispatch({
//       type: 'admin/handleGrant',
//       payload: {
//         id,
//         type,
//       },
//     });
//   };
//   return (
//     <View style={styles.operate}>
//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => {
//           switch (type) {
//             case 1:
//               grant(2);
//               break;
//             case 2:
//               grant(1);
//               break;
//             case 3:
//               alert('该用户处于封禁中');
//               break;
//           }
//         }}>
//         <Text style={{...styles.btntext, color: 'blue'}}>
//           {type === 1 ? '取消权限' : '授予权限'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => {
//           switch (type) {
//             case 1:
//               alert('该用户是管理员');
//               break;
//             case 2:
//               grant(3);
//               break;
//             case 3:
//               grant(2);
//               break;
//           }
//         }}>
//         <Text style={{...styles.btntext, color: 'orange'}}>
//           {type === 3 ? '解除' : '封禁'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => {
//           switch (type) {
//             case 1:
//               alert('请先取消管理员权限');
//               break;
//             case 2:
//             case 3:
//               dispatch({
//                 type: 'admin/handleDelete',
//                 payload: {
//                   id,
//                 },
//               });
//               break;
//           }
//           console.log(props);
//         }}>
//         <Text style={{...styles.btntext, color: 'red'}}>删除</Text>
//       </TouchableOpacity>
//     </View>
//   );
// });
