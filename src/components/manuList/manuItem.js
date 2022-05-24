import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ManuItem = ({title, action, icon}) => {
  return (
    <>
      <TouchableOpacity onPress={action}>
        <View style={styles.itemStyle}>
          <Image source={icon} style={styles.icon} />
          <Text style={[styles.text, styles.title]}>{title}</Text>
          <Text style={[styles.text, styles.enter]}>{'>'}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#555',
    fontSize: 15,
    lineHeight: 50,
  },
  title: {
    flex: 0.95,
  },
  enter: {
    flex: 0.05,
    fontSize: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginVertical: 10,
    marginRight: 20,
  },
  itemStyle: {
    height: 50,
    paddingLeft: 50,
    paddingRight: 30,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});

export default ManuItem;
