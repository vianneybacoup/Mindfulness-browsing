import React from 'react';
import ReactDOM from 'react-dom/client';
import OverlayControl from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <OverlayControl />
  </React.StrictMode>,
);
