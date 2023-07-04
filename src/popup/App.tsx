import React, { useContext } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './components/Root';
import { AppContext } from './context';
import AllRulesView from './views/AllRulesView';
import LoadingView from './views/LoadingView';
import RuleView from './views/RuleView';

const RuleControl: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <HashRouter>
      <Root>
        {state === 'LOADING' ? (
          <LoadingView />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/rule" />} />
            <Route path="/all" element={<AllRulesView />} />
            <Route path="/rule" element={<RuleView />} />
          </Routes>
        )}
      </Root>
    </HashRouter>
  );
};

export default RuleControl;
