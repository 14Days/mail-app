import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const Mail = (props) => {
  const {
    index,
    from,
    title,
    content,
    hadread = true,
    date,
    check,
    dispatch,
    multicheck,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (multicheck) {
          dispatch({
            type: 'inbox/check',
            payload: {
              index,
            },
          });
        } else {
          props.navigate('Detail', {index});
        }
      }}>
      <View style={check ? styles.checkContainer : styles.container}>
        <View style={styles.avatar}>
          <Text style={styles.from}>{from[0]}</Text>
        </View>
        <View style={styles.side}>
          <View>
            <View style={styles.header}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {hadread ? null : <View style={styles.point} />}
                <Text style={styles.title}>{title}</Text>
              </View>
              <Text style={styles.date}>{`${date}>`}</Text>
            </View>
          </View>
          <Text>
            {content.length <= 20 ? content : `${content.slice(0, 40)}...`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 99,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  checkContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 99,
    backgroundColor: '#cae1ff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  avatar: {
    flex: 0.2,
  },
  side: {
    flex: 0.8,
  },
  from: {
    color: '#6495ED',
    height: 50,
    width: 50,
    marginVertical: 25,
    borderRadius: 25,
    borderColor: '#6495ED',
    borderWidth: 1,
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 30,
  },
  point: {
    height: 10,
    width: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 7,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 30,
  },
  title: {
    fontSize: 18,

    fontWeight: 'bold',
  },
  date: {
    color: '#aaa',

    lineHeight: 20,
  },
});

export default connect((state) => state.inbox)(Mail);
