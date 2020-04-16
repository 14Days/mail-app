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
  AppRegistry.registerComponent(appName, () => Container);
})();
