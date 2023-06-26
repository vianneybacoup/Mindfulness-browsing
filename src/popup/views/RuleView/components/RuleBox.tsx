import React, { useContext, useState } from 'react';
import { FiShield, FiShieldOff } from 'react-icons/fi';
import Input from '../../../../overlay/components/Input';
import { AppContext } from '../../../context';

const RuleBox: React.FC = () => {
  const { host, state, setState } = useContext(AppContext);
  const [timeout, setTimeout] = useState<number>(15);
  const active = state === 'RULE';

  const onTimeoutChange = (e) => {
    setTimeout(e.target.value);
  };

  const onAddRule = () => {
    const message = {
      query: 'ADD_RULE',
      host: host,
      timeout: timeout * 1000,
    };

    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_ADDED') {
        setState('RULE');
      }
    });
  };

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
      <div className="pl-4 pr-4 flex flex-col text-sm">
        <div className="flex flex-row items-center justify-center">
          {active ? (
            <div className="rounded-md bg-emerald-500 p-1 text-white">
              <FiShield className="" size={15} />
            </div>
          ) : (
            <div className="rounded-md bg-red-500 p-1 text-white">
              <FiShieldOff className="" size={15} />
            </div>
          )}

          <div className="p-2">{active ? 'Active' : 'No rule found'}</div>
        </div>

        <div className="text-xs mt-3 text-slate-500">Timeout</div>
        <Input
          placeholder="timeout"
          value={timeout}
          onChange={onTimeoutChange}
        />

        {active ? (
          <>
            <button
              className="p-2 mt-2 rounded-md bg-emerald-500 text-white font-semibold"
              onClick={onAddRule}
            >
              Edit Rule
            </button>
            <button
              className="p-2 mt-2 rounded-md bg-red-500 text-white font-semibold"
              onClick={onRemoveRule}
            >
              Delete Rule
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 mt-2 rounded-md bg-emerald-500 text-white font-semibold"
              onClick={onAddRule}
            >
              Create Rule
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RuleBox;
