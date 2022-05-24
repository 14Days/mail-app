/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {create} from 'dva-core';
import {Provider} from 'react-redux';
import App from './App';
import Models from './src/model';
import {name as appName} from './app.json';

(function () {
  const app = create();
  Models.forEach((model) => {
    app.model(model);
  });
  app.start();

  const Container = () => (
    <Provider store={app._store}>
      <App />
    </Provider>
  );

  console.log(app);
  console.ignoredYellowBox = [
    'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
    'source.uri should not be an empty string',
    'Invalid props.style key',
  ];

  console.disableYellowBox = true; // 关闭全部黄色警告
  AppRegistry.registerComponent(appName, () => Container);
})();
