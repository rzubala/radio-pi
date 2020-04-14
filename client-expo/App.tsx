import React from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import AppNavigator from './navigation/AppNavigator'
import configReducer from './store/reducers/config'
import tracksReducer from './store/reducers/tracks'

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const rootReducer = combineReducers({
  config: configReducer,
  tracks: tracksReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
