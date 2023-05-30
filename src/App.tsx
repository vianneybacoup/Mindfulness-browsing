import React, { useContext, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './components/Root';
import { AppContext } from './context';
import Overview from './views/Overview';
import Rule from './views/Rule';
import Settings from './views/Settings';

const RuleControl = () => {
  const { host, setHost, state, setState } = useContext(AppContext);

  useEffect(() => {
    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, urlReceived);
  });

  const urlReceived = (tabs: chrome.tabs.Tab[]) => {
    if (tabs[0].url) {
      setHost(new URL(tabs[0].url!).host);

      const message = {
        query: 'GET_RULE',
        host: host,
      };

      chrome.runtime.sendMessage(message, (result) => {
        if (!result) {
          console.log('POPUP: Send message GET_RULE no response');
          setState('CONNECTION_ISSUE');
          return;
        }

        if (result.response != 'NO_RULE') {
          setState('RULE');
        } else {
          setState('NO_RULE');
        }
      });
    } else {
      setState('NOT_AN_URL');
    }
  };

  return (
    <HashRouter>
      <Root>
        <Routes>
          <Route path="/" element={<Navigate to="/rule" />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/rule" element={<Rule />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Root>
    </HashRouter>
  );
};

export default RuleControl;
