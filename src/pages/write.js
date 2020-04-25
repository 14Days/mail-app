import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Write = () => {
  const [sender, setSender] = useState('');
  const [copy, setCopy] = useState('');
  const [title, setTitle] = useState('');

  return (
    <>
      <HeaderText title="收件人" value={sender} setter={setSender} />
      <HeaderText title="抄送" value={copy} setter={setCopy} />
      <HeaderText title="主题" value={title} setter={setTitle} />
      <TextInput
        multiline={true}
        autoFocus={true}
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlignVertical: 'top',
          paddingHorizontal: 30,
        }}
      />
    </>
  );
};

const HeaderText = ({title, value, setter}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 51,
        paddingLeft: 20,
      }}>
      <View
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text
          style={{flex: 0.2, lineHeight: 50, color: '#aaa', marginLeft: 10}}>
          {title}
        </Text>
        <TextInput
          style={{
            flex: 0.8,
            paddingRight: 20,
          }}
          value={value}
          onChangeText={(t) => {
            setter(t);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flex: 0.8,
  },
});

export default Write;
