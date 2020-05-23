import {
  getMailList,
  mailDetail,
  deleteMail,
  getMyMailList,
} from '../service/mail';

export default {
  namespace: 'inbox',
  state: {
    mails: [],
    mymails: [],
    multicheck: false,
    mymulticheck: false,
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    check(state, {payload: {index}}) {
      const {mails} = state;
      mails[index].check = !mails[index].check;
      const ret = JSON.parse(JSON.stringify(state));
      return ret;
    },
    checkMy(state, {payload: {index}}) {
      const {mymails} = state;
      mymails[index].check = !mymails[index].check;
      const ret = JSON.parse(JSON.stringify(state));
      return ret;
    },
    switchMulticheck(state, _) {
      const {mails, multicheck} = state;
      mails.forEach((m) => {
        m.check = false;
      });
      const ret = JSON.parse(
        JSON.stringify({
          mails,
          multicheck: !multicheck,
        }),
      );
      return {
        ...state,
        ...ret,
      };
    },
    switchMyMailMulticheck(state, _) {
      const {mymails, mymulticheck} = state;
      mymails.forEach((m) => {
        m.check = false;
      });
      const ret = JSON.parse(
        JSON.stringify({
          mymails,
          mymulticheck: !mymulticheck,
        }),
      );
      return {
        ...state,
        ...ret,
      };
    },
    delete(state, _) {
      const {mails} = state;
      mails.map((m, index) => {
        if (m.check) {
          delete mails[index];
        }
      });
      for (let i = 0; i < mails.length; i++) {
        if (mails[i] === undefined) {
          mails.splice(i, 1);
          i--;
        }
      }
      return {
        ...state,
        multicheck: false,
        mails: JSON.parse(JSON.stringify(mails)),
      };
    },
    deleteMy(state, _) {
      const {mymails} = state;
      mymails.map((m, index) => {
        if (m.check) {
          delete mymails[index];
        }
      });
      for (let i = 0; i < mymails.length; i++) {
        if (mymails[i] === undefined) {
          mymails.splice(i, 1);
          i--;
        }
      }
      return {
        ...state,
        mymulticheck: false,
        mymails: JSON.parse(JSON.stringify(mymails)),
      };
    },
    deleteOne(state, {payload: index}) {
      const {mails} = state;
      mails.splice(index, 1);
      return {
        ...state,
        mails: JSON.parse(JSON.stringify(mails)),
      };
    },
    deleteOneMy(state, {payload: index}) {
      const {mymails} = state;
      mymails.splice(index, 1);
      return {
        ...state,
        mymails: JSON.parse(JSON.stringify(mymails)),
      };
    },
  },
  effects: {
    *handleInitMail(_, {put, call}) {
      try {
        const {data} = yield call(getMailList);
        const {
          data: {res},
        } = data;
        for (let i = 0; i < res.length; i++) {
          const {data: detailRes} = yield call(mailDetail, res[i].mail_id);
          res[i] = {
            ...res[i],
            ...detailRes.data,
            check: false,
          };
        }
        yield put({
          type: 'save',
          payload: {
            mails: res,
          },
        });
      } catch (e) {}
    },
    *handleInitMyMail(_, {put, call}) {
      try {
        const {data} = yield call(getMyMailList);
        const {
          data: {res},
        } = data;
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          const {data: detailRes} = yield call(mailDetail, res[i].mail_id);
          console.log(detailRes);
          res[i] = {
            ...res[i],
            ...detailRes.data,
            check: false,
          };
        }
        console.log('done');
        yield put({
          type: 'save',
          payload: {
            mymails: res,
          },
        });
      } catch (e) {}
    },
    *handleDelete(_, {put, call, select}) {
      try {
        const {mails} = yield select((state) => state.inbox);
        for (let i = 0; i < mails.length; i++) {
          if (mails[i].check) {
            const {data} = yield call(deleteMail, mails[i].mail_id);
            if (data.code !== 0) alert(`${data.msg}!\n${mails[i].subject}`);
          }
        }
        yield put({
          type: 'delete',
        });
      } catch (e) {}
    },
    *handleDeleteMy(_, {put, call, select}) {
      try {
        const {mymails} = yield select((state) => state.inbox);
        for (let i = 0; i < mymails.length; i++) {
          if (mymails[i].check) {
            const {data} = yield call(deleteMail, mymails[i].mail_id);
            if (data.code !== 0) alert(`${data.msg}!\n${mymails[i].subject}`);
          }
        }
        yield put({
          type: 'deleteMy',
        });
      } catch (e) {}
    },
    *handleDeleteOne({payload}, {put, call}) {
      const {id, successAction, index} = payload;
      try {
        const {data} = yield call(deleteMail, id);
        if (data.code !== 0) alert(data.msg);
        else {
          yield put({
            type: 'deleteOne',
            payload: {
              index,
            },
          });
          successAction();
        }
      } catch (e) {}
    },
    *handleDeleteOneMy({payload}, {put, call}) {
      const {id, successAction, index} = payload;
      try {
        console.log('deleteMy', id, index);
        const {data} = yield call(deleteMail, id);
        if (data.code !== 0) alert(data.msg);
        else {
          yield put({
            type: 'deleteOneMy',
            payload: {
              index,
            },
          });
          successAction();
        }
      } catch (e) {}
    },
  },
};
