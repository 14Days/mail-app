import React from 'react';
import {TextInput, Modal, StyleSheet, View} from 'react-native';
import QButton from '../QButton';

const InputModal = ({inputList, visible, flip, commit, children}) => {
  return (
    <View style={styles.wrapper}>
      <Modal
        style={{backgroundColor: 'grey'}}
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={styles.editInfo}>
          {inputList.map((item, index) => (
            <TextInput
              style={styles.input}
              key={index}
              value={item.value}
              placeholder={item.title}
              onChangeText={item.bind}
              textContentType={item.type}
              secureTextEntry={
                item.type === 'password' || item.type === 'newPassword'
              }
            />
          ))}
          {children}
          <View style={styles.option}>
            <QButton
              title="确认修改"
              press={commit}
              style={styles.btn}
              textStyle={styles.btnText}
            />
            <QButton
              title="取消"
              press={flip}
              style={styles.btn}
              textStyle={styles.btnText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'grey',
  },
  editInfo: {
    width: 340,
    top: 200,
    paddingHorizontal: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#6273da',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#fb6a2c',
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    flex: 0.5,
    marginVertical: 20,
  },
  btnText: {
    color: '#6273da',
    fontSize: 18,
  },
});

export default InputModal;
