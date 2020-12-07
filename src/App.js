import React from 'react';
import {Provider} from '@ant-design/react-native';
import {NativeRouter, Route, Switch} from 'react-router-native';
import HostOrJoin from './HostOrJoin';

import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/">
          <HostOrJoin />
        </Route>
      </Switch>
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
