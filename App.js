/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Main from './src/pages/main';
import Login from './src/pages/login';
import Splash from './src/pages/splash';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="Login"
          component={Login}
          title="fuck"
          options={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen name="Login1" component={Login} />
        <Stack.Screen name="Login2" component={Login} />
        <Stack.Screen name="Login3" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

export default App;
