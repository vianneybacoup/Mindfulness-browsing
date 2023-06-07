import React, { useContext, useState } from 'react';
import { AppContext } from '../context';

const DEFAULT_TIMEOUT = 3;

const AddRuleView: React.FC = () => {
  const { host, setState } = useContext(AppContext);
  const [time, setTime] = useState<number>(DEFAULT_TIMEOUT);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value as unknown as number);
  };

  const onAddRule = () => {
    const message = {
      query: 'ADD_RULE',
      host: host,
      timeout: time * 1000,
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
      <input type="number" onChange={onInputChange} value={time} />
      <button onClick={onAddRule}>Add rule</button>
    </>
  );
};

export default AddRuleView;
