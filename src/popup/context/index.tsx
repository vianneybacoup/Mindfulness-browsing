import { Rules } from '@background';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type AppState = 'LOADING' | 'READY' | 'CONNECTION_ISSUE' | 'NOT_AN_URL';

type AppContextProps = {
  host: string;
  setHost: (host: string) => void;
  favicon: string;
  setFavicon: (favicon: string) => void;
  state: AppState;
  setState: (state: AppState) => void;
  rules: Rules;
  setRules: (rules: Rules) => void;
  fetchAllRules: () => void;
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchAllRules: () => {},
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
  const [state, setState] = useState<AppState>(initialAppContext.state);
  const [rules, setRules] = useState<Rules>(initialAppContext.rules);

  const fetchAllRules = useCallback(() => {
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

      if (result.response === 'NOT_LOADED') {
        setTimeout(() => fetchAllRules(), 1000);
        setState('LOADING');
        return;
      }

      if (result.response === 'ALL_RULES_FOUND') {
        setRules(result.rules);
        setState('READY');
        return;
      }
    });
  }, []);

  useEffect(() => {
    fetchAllRules();
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0].url) {
        const newHost = new URL(tabs[0].url).host;
        setHost(newHost);
        setFavicon(tabs[0].favIconUrl || '');
      } else {
        setState('NOT_AN_URL');
      }
    });
  }, [fetchAllRules]);

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
        fetchAllRules,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
