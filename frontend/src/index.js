import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { StoreProvider } from './store/StoreProvider';
import { getOrInitializeStore } from './utils/store';

ReactDOM.render(
  <StoreProvider store={getOrInitializeStore()}>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
