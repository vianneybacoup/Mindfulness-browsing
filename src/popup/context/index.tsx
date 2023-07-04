import React, { createContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Rules } from '../../static/background';

type RuleState =
  | 'LOADING'
  | 'RULE'
  | 'CONNECTION_ISSUE'
  | 'NO_RULE'
  | 'NOT_AN_URL';

type AppContextProps = {
  host: string;
  setHost: (host: string) => void;
  favicon: string;
  setFavicon: (favicon: string) => void;
  state: RuleState;
  setState: (state: RuleState) => void;
  rules: Rules;
  setRules: (rules: Rules) => void;
};

const initialAppContext: AppContextProps = {
  host: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setHost: () => {},
  favicon: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFavicon: () => {},
  state: 'LOADING',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setState: () => {},
  rules: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRules: () => {},
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

type AppContextProviderProps = {
  children: React.ReactElement;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [host, setHost] = useState<string>(initialAppContext.host);
  const [favicon, setFavicon] = useState<string>(initialAppContext.favicon);
  const [state, setState] = useState<RuleState>(initialAppContext.state);
  const [rules, setRules] = useState<Rules>(initialAppContext.rules);

  useEffect(() => {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0].url) {
        const newHost = new URL(tabs[0].url).host;
        setHost(newHost);
        setFavicon(tabs[0].favIconUrl || '');

        const message = {
          query: 'GET_RULE',
          host: newHost,
        };

        chrome.runtime.sendMessage(message, (result) => {
          if (!result) {
            console.log('POPUP: Send message GET_RULE no response');
            setState('CONNECTION_ISSUE');
            return;
          }

          console.log(result);

          if (result.response != 'NO_RULE') {
            setState('RULE');
          } else {
            setState('NO_RULE');
          }
        });
      } else {
        setState('NOT_AN_URL');
      }
    });
  }, []);

  useEffect(() => {
    if (state !== 'NO_RULE' && state !== 'RULE') return;

    const message = {
      query: 'GET_ALL_RULES',
    };

    chrome.runtime.sendMessage(message, (result) => {
      if (!result) {
        console.log('POPUP: Send message GET_ALL_RULES no response');
        setState('CONNECTION_ISSUE');
        return;
      }

      console.log(result);

      if (result.response === 'ALL_RULES_FOUND') setRules(result.rules);
    });
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        host,
        setHost,
        favicon,
        setFavicon,
        state,
        setState,
        rules,
        setRules,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
