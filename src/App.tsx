import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import Root from './components/Root';
import EditRuleView from './views/EditRuleView';

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

  const handleNewRuleClick = () => {
    const message = {
      query: 'ADD_RULE',
      host: host,
      timeout: 3000, //timeout_elmt.valueAsNumber * 1000,
    };
    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_ADDED') {
        setState('RULE');
      }
    });
  };

  return (
    <Root>
      {state === 'LOADING' ? (
        <>
          <p>Loading ...</p>
        </>
      ) : state === 'RULE' ? (
        <EditRuleView />
      ) : state === 'CONNECTION_ISSUE' ? (
        <>
          <p>Error in the extension</p>
        </>
      ) : state === 'NOT_AN_URL' ? (
        <>
          <p>This page cannot run this extension</p>
        </>
      ) : state === 'NO_RULE' ? (
        <>
          <p>Rule not found</p>
          <button onClick={handleNewRuleClick}>Add rule</button>
        </>
      ) : (
        <p>{state}</p>
      )}
    </Root>
  );
};

export default RuleControl;
