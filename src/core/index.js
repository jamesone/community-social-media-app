import React from 'react';
import {AsyncStorage} from 'react-native';
import createStore from './redux/create';
import {persistStore} from 'redux-persist'
import Routes from '@routes/app';
import { Provider, } from 'react-redux';
const store = createStore();

class Kernel extends React.Component {

  render (){
    return (
      <Provider store={store}>
      <Routes />
    </Provider>
    )
  }
}

export default Kernel;
