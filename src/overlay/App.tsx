import React from 'react';
import Root from './components/Root';
import { AckMessage, AckResponse } from '@background/types';

const OverlayControl: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const url = urlParams.get('url');
  if (!url) {
    const message: AckMessage = {
      query: 'ACK',
      url: 'https://google.com',
      host: '',
    };
    chrome.runtime.sendMessage<AckMessage, AckResponse>(message);

    return <Root>Error in the arguments</Root>;
  }
  const host = new URL(url).host;

  const timeout = parseInt(urlParams.get('timeout') || '5');
  setTimeout(() => {
    const message: AckMessage = {
      query: 'ACK',
      host: host,
      url: url,
    };
    chrome.runtime.sendMessage<AckMessage, AckResponse>(message);
  }, timeout);

  return <Root>Hey, you are starting {host}!</Root>;
};

export default OverlayControl;
