import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Main from './Main';
import Toast from 'react-native-toast-message';
import toastConfig from './utils/ToastConfig';
import { LogBox, StatusBar } from 'react-native';

LogBox.ignoreLogs(['Reanimated 2']);

const App = () => {
  return (
    <Provider store={Store}>
      <StatusBar backgroundColor='#6F4299' barStyle="light-content" />
      <Main />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
