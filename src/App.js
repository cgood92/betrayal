import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Provider} from '@ant-design/react-native';
import {NativeRouter, useHistory} from 'react-router-native';

import ErrorBoundary from './ErrorBoundary';

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

function App() {
  const history = useHistory();

  return (
    <Provider>
      <View style={styles.navContainer}>
        <Button onPress={() => history.push('/join')}>Join a game</Button>
        <Button onPress={() => history.push('/host')}>Host a game</Button>
      </View>
    </Provider>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <NativeRouter>
        <App />
      </NativeRouter>
    </ErrorBoundary>
  );
}
