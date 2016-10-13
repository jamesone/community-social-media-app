import {AsyncStorage,} from 'react-native';
import { createStore, applyMiddleware, compose, combineReducers, } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import Reactotron from 'reactotron';
import * as reducers from './modules';
import devTools from 'remote-redux-devtools';
import {persistStore, autoRehydrate, rehydrator,} from 'redux-persist'


Reactotron.connect({
  enabled: __DEV__,
});

const enhancer = compose(
  autoRehydrate(),
  applyMiddleware(
    reduxThunkMiddleware,
    Reactotron.reduxMiddleware,
  ),
  devTools()
);

export default function configureStore(initialState, onComplete: ?() => void) {
  const store = createStore(
    combineReducers({
      ...reducers,
    }),
    initialState,
    enhancer,
  );
  persistStore(store, {storage: AsyncStorage, whitelist: ['user', 'filter', 'category']}, onComplete);
  Reactotron.addReduxStore(store, {storage: AsyncStorage});
  return store;
}
