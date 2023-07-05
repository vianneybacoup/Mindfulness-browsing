import React from 'react';
import Header from './components/Header';
import RuleBox from './components/RuleBox';

const RuleView: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <RuleBox />
    </div>
  );
};

export default RuleView;
