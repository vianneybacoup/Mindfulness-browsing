import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  height: 200px;
  width: 200px;
  font-size: 1.5em;
  text-align: center;
`;

type RuleControlState =
  | 'LOADING'
  | 'RULE'
  | 'CONNECTION_ISSUE'
  | 'NO_RULE'
  | 'NOT_AN_URL';

const RuleControl = () => {
  const [state, setState] = useState<RuleControlState>('LOADING');
  const [host, setHost] = useState<string>('');

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

  const handleRemoveRuleClick = () => {
    const message = {
      query: 'DELETE_RULE',
      host: host,
    };
    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_DELETED') {
        setState('NO_RULE');
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
        <>
          <p>Rule found</p>
          <button onClick={handleRemoveRuleClick}>Remove rule</button>
        </>
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
