import React from 'react';
import {Routes} from './src/routes/Routes';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {persistor, } from './src/redux/Store';
import { store } from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import "react-native-get-random-values";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
