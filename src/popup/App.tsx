import Root from '@popup/components/Root';
import { AppContext } from '@popup/context';
import AllRulesView from '@popup/views/AllRulesView';
import LoadingView from '@popup/views/LoadingView';
import RuleView from '@popup/views/RuleView';
import React, { useContext } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

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
