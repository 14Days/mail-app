import AsyncStorage from '@react-native-community/async-storage';

//'#6273da',
//'#fb6a2c',

export const printAllItem = () => {
  AsyncStorage.getAllKeys().then((res) => {
    console.log(res);
    res.forEach((item) => {
      console.log(item);
      AsyncStorage.getItem(item).then((value) => {
        console.log(value);
      });
    });
  });
};

export const storageLoginItem = (token, user_id, user_type, date) => {
  AsyncStorage.setItem('user_id', user_id + '');
  AsyncStorage.setItem('user_type', user_type + '');
  AsyncStorage.setItem('Authorization', token + '');
  AsyncStorage.setItem('expired_time', date.add(7, 'day'));
};

export const removeLoginItem = (token, user_id, user_type, date) => {
  AsyncStorage.removeItem('user_id');
  AsyncStorage.removeItem('user_type');
  AsyncStorage.removeItem('Authorization');
  AsyncStorage.removeItem('expired_time');
  AsyncStorage.removeItem('draftSet');
};

// export const extract = async (pro) => {
//   return await new Promise((resolve, reject) => {
//     pro.then((value) => {
//       resolve(value);
//     });
//   });
// };
