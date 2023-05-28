import React, { useContext } from 'react';
import { AppContext } from '../context';

const AddRuleView = () => {
  const { host, setState } = useContext(AppContext);

  const onAddRule = () => {
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

  return (
    <>
      <p>{host}</p>
      <p>Rule not found</p>
      <button onClick={onAddRule}>Add rule</button>
    </>
  );
};

export default AddRuleView;
