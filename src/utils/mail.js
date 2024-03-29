import AsyncStorage from '@react-native-community/async-storage';

export const flatContent = (content, len) =>
  content.replace(/\s/g, '').slice(0, len);

export const saveDraftStorage = async (
  receiver,
  copy,
  content,
  subject,
  key = undefined,
) => {
  return new Promise((resolve) => {
    readDraftStorage().then((draftSet) => {
      if (draftSet === null) {
        const newDraft = {
          id: 0,
          subject,
          content,
          receiver,
          copy,
        };
        const draftList = {0: newDraft};
        AsyncStorage.setItem(
          'draftSet',
          JSON.stringify({
            usedId: 0,
            draftList,
          }),
        );
      } else {
        const {usedId, draftList} = JSON.parse(draftSet);
        const thiskey = key ? key : usedId;
        const newDraft = {
          id: thiskey,
          subject,
          content,
          receiver,
          copy,
        };
        draftList[thiskey] = newDraft;
        AsyncStorage.setItem(
          'draftSet',
          JSON.stringify({
            usedId: usedId + key ? 1 : 0,
            draftList,
          }),
        );
      }
      resolve();
    });
  });
};

export const deleteDraftStorage = (id) => {
  return new Promise((resolve) => {
    readDraftStorage().then((draftSet) => {
      const {draftList, ...other} = JSON.parse(draftSet);
      delete draftList[id];
      console.log(draftList);
      AsyncStorage.setItem(
        'draftSet',
        JSON.stringify({
          ...other,
          draftList,
        }),
      );
      resolve();
    });
  });
};

export const readDraftStorage = async () => {
  return await AsyncStorage.getItem('draftSet');
};

export const constructReply = (from, subject, content) =>
  `\n${'-'.repeat(60)}\n[${subject}] from ${from}\n${content}`;

export const fixedReceiver = (r, setr, c, prec, setc) => {
  if (r.indexOf('@') === -1 && r !== '') {
    setr(`${r}@wghtstudio.cn`);
  }
  if (c.slice(-1) === ';' && c.length > prec.length) {
    const s = c.split(';');
    s.pop();
    for (let i = 0; i < s.length; i++) {
      if (s[i].indexOf('@') === -1) s[i] += '@wghtstudio.cn';
    }
    setc(`${s.join(';')};`);
  }
};
