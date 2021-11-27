import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Main from './Main';
import Toast from 'react-native-toast-message';
import toastConfig from './utils/ToastConfig';
import {LogBox } from 'react-native';

LogBox.ignoreLogs(['Reanimated 2', 'VideoCallScreen']);

const App = () => {
  return (
    <Provider store={Store}>
      <Main />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
