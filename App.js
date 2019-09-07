import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Provider} from 'react-redux';

import Router from './src/config/routes'
import store from './src/redux/store';

export default function App() {
  return (
      <Provider store={store}>
          <Router/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
