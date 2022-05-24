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
import Detail from './src/pages/detail';
import Register from './src/pages/register';
import Admin from './src/pages/admin';
import Draft from './src/pages/draft';
import inboxIcon from './src/static/inbox.png';
import mineIcon from './src/static/mine.png';

const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const MainStack = createStackNavigator();
const MineStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="LoginStack"
          component={LoginStackComp}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
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

// const LoginStackComp = () => {
//   return (
//     <LoginStack.Navigator>
//       <LoginStack.Screen
//         name="Splash"
//         component={Splash}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <LoginStack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           headerShown: false,
//           ...TransitionPresets.FadeFromBottomAndroid,
//         }}
//       />
//     </LoginStack.Navigator>
//   );
// };

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
        name="Draft"
        component={Draft}
        options={{
          title: '草稿箱',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MainStack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: '邮件详情',
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
        name="Admin"
        component={Admin}
        options={{
          title: '管理用户',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </MainStack.Navigator>
  );
};

const MineStackComp = () => {
  return (
    <MineStack.Navigator>
      <MineStack.Screen
        name="Mine"
        component={Mine}
        options={{
          title: '个人信息',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MineStack.Screen
        name="Admin"
        component={Admin}
        options={{
          title: '管理用户',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </MineStack.Navigator>
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
        name="MineStack"
        component={MineStackComp}
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

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default App;
