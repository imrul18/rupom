import React from 'react';
import {Provider} from 'react-redux';
import Store from './app/ReduxStore/Store.js';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import Main from './app/screens/Main.js';

const App = () => {
  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  );
};

export default App;
