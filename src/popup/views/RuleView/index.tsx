import React, { useContext } from 'react';
import { AppContext } from '../../context';
import RuleBox from './components/RuleBox';
import Header from './components/Header';

const RuleView: React.FC = () => {
  const { state } = useContext(AppContext);
  console.log(state);

  return (
    <>
      <Header />
      <RuleBox />
    </>
  );
};

export default RuleView;
