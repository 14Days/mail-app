import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const Main = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props);
        props.dispatch({
          type: 'main/increase',
        });
      }}>
      <View>
        <Text>count1:{props.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default connect((state) => state.main)(Main);
