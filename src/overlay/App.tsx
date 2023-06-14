import React from 'react';
import Root from './components/Root';

const OverlayControl: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const url = urlParams.get('url');
  if (!url) {
    const message = {
      query: 'ACK',
      url: 'https://google.com',
    };
    chrome.runtime.sendMessage(message);

    return <Root>Error in the arguments</Root>;
  }
  const host = new URL(url).host;

  const timeout = parseInt(urlParams.get('timeout') || '5');
  setTimeout(() => {
    const message = {
      query: 'ACK',
      host: host,
      url: url,
    };
    chrome.runtime.sendMessage(message);
  }, timeout);

  return <Root>Hey, you are starting {host}!</Root>;
};

export default OverlayControl;
