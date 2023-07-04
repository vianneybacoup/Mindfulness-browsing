import RuleControl from '@popup/App';
import AppContextProvider from '@popup/context';
import '@popup/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

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
