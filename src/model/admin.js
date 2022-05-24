import {getUserList, grantAmdin, deleteUser} from '../service/admin';
import {getUserInfo} from '../service/user';
export default {
  namespace: 'admin',
  state: {
    userList: [],
    checkIndex: -1,
    nextPage: 0,
    alerted: false,
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        userList: [],
        checkIndex: -1,
        nextPage: 0,
        alerted: false,
      };
    },
    check(state, {payload: {checkIndex: index}}) {
      const {checkIndex} = state;
      return {
        ...state,
        checkIndex: index === checkIndex ? -1 : index,
      };
    },
    delete(state, _) {
      const {checkIndex, userList} = state;
      userList.splice(checkIndex, 1);
      return {
        ...state,
        userList: JSON.parse(JSON.stringify(userList)),
        checkIndex: -1,
      };
    },
    grant(state, _) {
      const {checkIndex, userList} = state;
      userList[checkIndex].user_type =
        (userList[checkIndex].user_type === 1) + 1;
      return {
        ...state,
        userList: JSON.parse(JSON.stringify(userList)),
      };
    },
    ban(state, _) {
      const {checkIndex, userList} = state;
      userList[checkIndex].user_type =
        (userList[checkIndex].user_type === 2) + 2;
      return {
        ...state,
        userList: JSON.parse(JSON.stringify(userList)),
      };
    },
  },
  effects: {
    *handleInit(_, {put, call, select}) {
      try {
        const {nextPage, userList, alerted} = yield select(
          (state) => state.admin,
        );
        const {data: res} = yield call(getUserList, nextPage);
        const {code, data, msg} = res;
        if (code === 0) {
          const {count, res: userListNew} = data;
          if (userListNew !== 0) {
            for (let i = 0; i < userListNew.length; i++) {
              const {
                data: {
                  data: {sex},
                },
              } = yield call(getUserInfo, userListNew[i].id);
              userListNew[i].sex = sex;
            }
            for (
              let i = nextPage * 10, offset = 0;
              offset < userListNew.length;
              offset++
            ) {
              userList[i + offset] = userListNew[offset];
            }
            yield put({
              type: 'save',
              payload: {
                userList: JSON.parse(JSON.stringify(userList)),
                nextPage: userListNew.length === 10 ? nextPage + 1 : nextPage,
                alerted: false,
              },
            });
          } else if (!alerted) {
            alert('已加载全部用户!');
            yield put({
              type: 'save',
              payload: {
                alerted: true,
              },
            });
          }
        } else {
          alert(msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    *handleDelete(_, {put, call, select}) {
      try {
        const {checkIndex, userList} = yield select((state) => state.admin);
        const {data: res} = yield call(deleteUser, userList[checkIndex].id);
        const {code, data, msg} = res;
        if (code === 0) {
          yield put({
            type: 'delete',
          });
        }
        alert(`[${msg}] ${data}`);
      } catch (e) {}
    },
    *handleGrant(_, {put, call, select}) {
      try {
        const {checkIndex, userList} = yield select((state) => state.admin);
        const {user_type, id} = userList[checkIndex];
        const to = user_type === 1 ? 2 : 1;
        switch (user_type) {
          case 1:
          case 2: {
            const {data: res} = yield call(grantAmdin, id, to);
            alert(res.msg);
            yield put({
              type: 'grant',
            });
            break;
          }
          case 3: {
            alert('该用户处于封禁中');
            break;
          }
        }
      } catch (e) {}
    },
    *handleBan(_, {put, call, select}) {
      try {
        const {checkIndex, userList} = yield select((state) => state.admin);
        const {user_type, id} = userList[checkIndex];
        const to = (user_type === 2) + 2;
        switch (user_type) {
          case 1: {
            alert('该用户是管理员');
            break;
          }
          case 2:
          case 3: {
            const {data: res} = yield call(grantAmdin, id, to);
            alert(res.msg);
            yield put({
              type: 'ban',
            });
            break;
          }
        }
      } catch (e) {}
    },
  },
};
