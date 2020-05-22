import {
  login,
  register,
  getUserInfo,
  updateUserPwd,
  updateUserInfo,
} from '../service/user';
import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';
import {printAllItem, storageLoginItem, removeLoginItem} from '../utils/index';
export default {
  namespace: 'user',
  state: {
    access: false,
    user_id: '',
    user_type: '',
    id: '',
    nickname: '',
    sex: '',
    username: '',
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *handleLogin(
      {payload: {username, password, loginSuccessAction}},
      {put, call},
    ) {
      try {
        const {data} = yield call(login, username, password);
        const {code, data: loginData, msg} = data;

        if (code === 0) {
          const {token, user_id, user_type} = loginData;
          yield put({
            type: 'save',
            payload: loginData,
          });
          /* 跳转 */
          loginSuccessAction();
          /* 保存token至本地 */
          storageLoginItem(token, user_id, user_type, dayjs());
          /* 立即获取用户信息 */
          yield put({
            type: 'handleGetUserInfo',
            payload: {
              userId: user_id,
            },
          });
        } else {
          alert(msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *handleLoginedStart(_, {put, call}) {
      try {
        const userId = yield call(AsyncStorage.getItem, 'user_id');
        yield put({
          type: 'handleGetUserInfo',
          payload: {
            userId,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    *handleGetUserInfo({payload: {userId}}, {put, call}) {
      try {
        const {data} = yield call(getUserInfo, userId);
        const {code, data: userInfoData, msg} = data;
        if (code === 0) {
          yield put({
            type: 'save',
            payload: userInfoData,
          });
        } else {
          alert(msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *handleLogout(_, {put}) {
      removeLoginItem();
      yield put({
        type: 'save',
        patload: {
          access: false,
        },
      });
    },
    *handleUpdatePwd(
      {payload: {userId, username, oldpwd, newpwd, successAction}},
      {call},
    ) {
      const {data: loginRes} = yield call(login, username, oldpwd);
      const {code, msg} = loginRes;
      if (code !== 0) {
        alert(msg);
      } else {
        const {data: updateRes} = yield call(updateUserPwd, userId, newpwd);
        alert(updateRes.msg);
        successAction();
      }
    },
    *handleUpdateInfo(
      {payload: {userId, nickname, sex, successAction}},
      {put, call},
    ) {
      const {data: updateRes} = yield call(updateUserInfo, userId, {
        nickname,
        sex,
      });
      alert(updateRes.msg);
      yield put({
        type: 'handleGetUserInfo',
        payload: {
          userId,
        },
      });
      successAction();
    },
    *handleRegister({payload: {username, password, successAction}}, {call}) {
      const {data: res} = yield call(register, username, password);
      alert(res.msg);
      if (res.code === 0) successAction();
    },
  },
};
