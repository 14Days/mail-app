import {getUserList, grantAmdin, deleteUser} from '../service/admin';
import {getUserInfo} from '../service/user';
export default {
  namespace: 'admin',
  state: {
    userList: [],
    checkIndex: -1,
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    check(state, {payload: {checkIndex}}) {
      return {
        ...state,
        checkIndex,
      };
    },
    delete(state, {payload: {id}}) {
      const {userList} = state;
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) {
          userList.splice(i, 1);
          break;
        }
      }
      const ret = JSON.parse(JSON.stringify(userList));
      return {
        ...state,
        userList: ret,
      };
    },
  },
  effects: {
    *handleInit(_, {put, call}) {
      try {
        const {data: res} = yield call(getUserList);
        const {code, data, msg} = res;
        if (code === 0) {
          const userList = data.res;
          for (let i = 0; i < userList.length; i++) {
            const {
              data: {
                data: {sex},
              },
            } = yield call(getUserInfo, userList[i].id);
            userList[i].sex = sex;
          }
          yield put({
            type: 'save',
            payload: {
              userList,
            },
          });
        } else {
          alert(msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *handleDelete({payload: {id}}, {put, call}) {
      try {
        const {data: res} = yield call(deleteUser, id);
        const {code, data, msg} = res;
        if (code === 0) {
          yield put({
            type: 'delete',
            payload: {
              id,
            },
          });
        }
        alert(`[${msg}] ${data}`);
      } catch (e) {}
    },
  },
};
