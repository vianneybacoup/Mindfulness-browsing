import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ReactDOM from 'react-dom/client';
import RuleControl from './App';
import AppContextProvider from './context';
import './css/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <RuleControl />
    </AppContextProvider>
  </React.StrictMode>,
);
