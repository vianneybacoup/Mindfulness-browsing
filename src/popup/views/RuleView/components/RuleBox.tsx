import {
  AddRuleMessage,
  AddRuleResponse,
  DeleteRuleMessage,
  DeleteRuleResponse,
} from '@background/types';
import Input from '@popup/components/Input';
import { AppContext } from '@popup/context';
import React, { useContext, useEffect, useState } from 'react';
import { FiShield, FiShieldOff } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const RuleBox: React.FC = () => {
  const {
    host: currentHost,
    favicon: currentFavicon,
    rules,
    fetchAllRules,
  } = useContext(AppContext);
  const [timeout, setTimeout] = useState<number>(15);
  const location = useLocation();
  const navigate = useNavigate();
  const host = location.state ? location.state.rule : currentHost;
  const favicon = location.state ? rules[host].favicon : currentFavicon;
  const active = !!Object.keys(rules).find((rule) => rule === host);

  const onTimeoutChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimeout(Number(e.target.value));
  };

  const onAddRule = () => {
    const message: AddRuleMessage = {
      query: 'ADD_RULE',
      host: host,
      rule: { timeout: timeout * 1000, favicon },
    };

    chrome.runtime.sendMessage<AddRuleMessage, AddRuleResponse>(
      message,
      (result) => {
        if (result.response == 'RULE_ADDED') {
          console.log('rule added');
          fetchAllRules();
        }
      },
    );

    if (location.state) navigate(-1);
  };

  const onRemoveRule = () => {
    const message: DeleteRuleMessage = {
      query: 'DELETE_RULE',
      host,
    };

    chrome.runtime.sendMessage<DeleteRuleMessage, DeleteRuleResponse>(
      message,
      (result) => {
        if (result.response == 'RULE_DELETED') {
          console.log('rule deleted');
          fetchAllRules();
        }
      },
    );

    if (location.state) navigate(-1);
  };

  useEffect(() => {
    if (!active) return;

    setTimeout(rules[host].timeout / 1000);
  }, [active, rules, host, location.state]);

  return (
    <div className="pl-4 pr-4 flex flex-col text-sm flex-1">
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
        type="number"
      />

      <div className="mb-4 flex-1 flex flex-col items-center justify-end">
        {active ? (
          <>
            <button
              className="p-2 w-full rounded-md bg-emerald-500 text-white font-semibold"
              onClick={onAddRule}
            >
              Edit Rule
            </button>
            <button
              className="p-2 mt-2 w-full rounded-md bg-red-500 text-white font-semibold"
              onClick={onRemoveRule}
            >
              Delete Rule
            </button>
          </>
        ) : (
          <button
            className="p-2 w-full rounded-md bg-emerald-500 text-white font-semibold"
            onClick={onAddRule}
          >
            Create Rule
          </button>
        )}
      </div>
    </div>
  );
};

export default RuleBox;
