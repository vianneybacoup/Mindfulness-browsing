import React, { useContext } from 'react';
import { AppContext } from '../context';

const EditRuleView: React.FC = () => {
  const { host, setState } = useContext(AppContext);

  const onRemoveRule = () => {
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

  return (
    <>
      <p>{host}</p>
      <p>Rule found</p>
      <button onClick={onRemoveRule}>Remove rule</button>
    </>
  );
};

export default EditRuleView;
