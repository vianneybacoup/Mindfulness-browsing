import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './components/Root';
import AllRulesView from './views/AllRulesView';
import RuleView from './views/RuleView';

const RuleControl: React.FC = () => {
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
