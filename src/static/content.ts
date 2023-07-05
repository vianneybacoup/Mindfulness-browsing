import { RunRuleMessage, RunRuleResponse } from '@background/types';

const message: RunRuleMessage = {
  query: 'RUN_RULE',
  host: window.location.host,
};
chrome.runtime.sendMessage<RunRuleMessage, RunRuleResponse>(
  message,
  async (answer) => {
    if (answer.response === 'NOT_LOADED') {
      await new Promise((r) => setTimeout(r, 1000));

      chrome.runtime.sendMessage<RunRuleMessage, RunRuleResponse>(message);
    }
  },
);

export default undefined;
