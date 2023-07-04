import React, { useContext } from 'react';
import { AppContext } from '../../context';

const AllRulesView: React.FC = () => {
  const { rules } = useContext(AppContext);

  return (
    <div className="p-2">
      {Object.keys(rules).map((rule, index) => (
        <div key={`rule-${index}`}>{rule}</div>
      ))}
    </div>
  );
};

export default AllRulesView;
