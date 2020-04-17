import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Login = (props) => {
  return (
    <View>
      <Text>sd</Text>
      <TouchableOpacity
        onPress={() => {
          console.log(props.navigation);
          props.navigation.navigate('Login');
        }}>
        <View>
          <Text>count1:{props.count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
