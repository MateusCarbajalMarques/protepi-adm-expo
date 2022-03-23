import React, { useEffect } from 'react';
//import SplashScreen from 'react-native-splash-screen';
import Routes from './src/routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
};
