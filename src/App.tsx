import React, { useEffect, useState } from 'react';
import './App.css';

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

  switch (state) {
    case 'LOADING':
      return (
        <div>
          <p>Loading ...</p>
        </div>
      );
    case 'RULE':
      return (
        <div>
          <p>Rule found</p>
          <button onClick={handleRemoveRuleClick}>Remove state</button>
        </div>
      );
    case 'NO_RULE':
      return (
        <div>
          <p>Rule not found</p>
          <button onClick={handleNewRuleClick}>Add state</button>
        </div>
      );
    case 'NOT_AN_URL':
      return (
        <div>
          <p>This page cannot run this extension</p>
        </div>
      );
    case 'CONNECTION_ISSUE':
      return (
        <div>
          <p>Error in the extension</p>
        </div>
      );
    default:
      return (
        <div>
          <p>{state}</p>
        </div>
      );
  }
};

export default RuleControl;
