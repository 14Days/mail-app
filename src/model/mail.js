import {
  readDraftStorage,
  deleteDraftStorage,
  saveDraftStorage,
} from '../utils/mail';
import {sendMail} from '../service/mail';

export default {
  namespace: 'mail',
  state: {
    draftList: {},
    multicheck: false,
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    check(state, {payload: {key}}) {
      const {draftList} = state;
      draftList[key].check = !draftList[key].check;
      const ret = JSON.parse(JSON.stringify(state));
      return ret;
    },
    switchMulticheck(state, _) {
      const {draftList, multicheck} = state;
      Object.keys(draftList).map((key) => {
        draftList[key].check = false;
      });
      const ret = JSON.parse(
        JSON.stringify({
          draftList,
          multicheck: !multicheck,
        }),
      );
      return ret;
    },
  },
  effects: {
    *handleLoad(_, {put, call}) {
      const _draftSet = yield call(readDraftStorage);
      if (_draftSet !== null) {
        const {draftList} = JSON.parse(_draftSet);
        Object.keys(draftList).map((key) => {
          draftList[key].check = false;
        });
        yield put({
          type: 'save',
          payload: {
            draftList,
          },
        });
      }
    },
    *handleDelete(_, {put, call, select}) {
      const {draftList} = yield select((state) => state.mail);
      // Object.keys(draftList).map((key) => {
      //   if (draftList[key].check) {
      //     delete draftList[key];
      //     deleteDraftStorage(key);
      //   }
      // });
      for (let key in draftList) {
        if (draftList[key].check) {
          yield call(deleteDraftStorage, key);
          delete draftList[key];
        }
      }
      yield put({
        type: 'save',
        payload: {
          draftList: JSON.parse(JSON.stringify(draftList)),
          multicheck: false,
        },
      });
    },
    *handleUpdateDraft({payload: {data, successAction}}, {put, call}) {
      const {receiver, copy, content, subject, key} = data;
      yield call(saveDraftStorage, receiver, copy, content, subject, key);
      yield put({
        type: 'handleLoad',
      });
      successAction();
    },
    *handleSend({payload}, {put, call}) {
      try {
        const {receiver, copy, subject, content, successAction} = payload;
        let receivers = [];
        if (receivers === '发往所有用户') {
        } else {
          receivers.push(receiver);
          if (copy !== '') {
            receivers = [...receivers, ...copy.split(';')];
            if (receivers.slice(-1)[0] === '') receivers.pop();
          }
        }
        const {data} = yield call(sendMail, subject, content, receiver);
        if (data.code !== 0) alert(data.msg);
        else {
          alert('发送成功');
          successAction();
        }
      } catch (e) {}
    },
  },
};
