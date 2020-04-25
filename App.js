import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from './src/pages/main';
import Login from './src/pages/login';
import Splash from './src/pages/splash';
import Inbox from './src/pages/inbox';
import Send from './src/pages/send';
import Mine from './src/pages/mine';
import Write from './src/pages/write';
import inboxIcon from './src/static/inbox.png';
import mineIcon from './src/static/mine.png';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginStack"
          component={LoginStackComp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tab"
          component={TabComp}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStackComp = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
    </LoginStack.Navigator>
  );
};

const MainStackComp = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{
          title: '14Days',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MainStack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          title: '收件箱',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MainStack.Screen
        name="Send"
        component={Send}
        options={{
          title: '已发送',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MainStack.Screen
        name="Write"
        component={Write}
        options={{
          title: '写邮件',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </MainStack.Navigator>
  );
};

const TabComp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainStack"
        component={MainStackComp}
        options={{
          title: '邮箱',
          tabBarIcon: () => (
            <Image source={inboxIcon} style={{width: 20, height: 20}} />
          ),
        }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          title: '我的',
          tabBarIcon: () => (
            <Image source={mineIcon} style={{width: 20, height: 20}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
