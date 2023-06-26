import React, { useContext, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './components/Root';
import { AppContext } from './context';
import AllRulesView from './views/AllRulesView';
import RuleView from './views/RuleView';

const RuleControl: React.FC = () => {
  const { host, setHost, setFavicon, setState } = useContext(AppContext);

  useEffect(() => {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, urlReceived);
  });

  const urlReceived = (tabs: chrome.tabs.Tab[]) => {
    if (tabs[0].url) {
      setHost(new URL(tabs[0].url).host);
      setFavicon(tabs[0].favIconUrl || '');

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
          <Route path="/all" element={<AllRulesView />} />
          <Route path="/rule" element={<RuleView />} />
        </Routes>
      </Root>
    </HashRouter>
  );
};

export default RuleControl;
