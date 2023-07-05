import {
  AckMessage,
  AckResponse,
  AddRuleMessage,
  AddRuleResponse,
  DeleteRuleMessage,
  DeleteRuleResponse,
  GetAllRulesResponse,
  Message,
  Response,
  Rules,
  RunRuleMessage,
  RunRuleResponse,
} from './types';

let loaded = false;
let rules: Rules = {};
let ack: { [name: string]: string } = {};

const getAllRulesHandler = (): GetAllRulesResponse => ({
  response: 'ALL_RULES_FOUND',
  rules,
});

const runRuleHandler = (
  { host }: RunRuleMessage,
  sender: chrome.runtime.MessageSender,
): RunRuleResponse => {
  const rule = rules[host];
  if (!rule) {
    return { response: 'NO_RULE' };
  }

  const hostack = ack[host];
  if (hostack) {
    return { response: 'ALREADY_ACK' };
  }

  if (!sender.tab?.url || !sender.tab?.id) {
    return {};
  }

  const urlParams =
    '?url=' + encodeURIComponent(sender.tab.url) + '&timeout=' + rule.timeout;
  chrome.tabs.update(sender.tab.id, {
    url: chrome.runtime.getURL('src/overlay/overlay.html') + urlParams,
  });
  return {};
};

const ackHandler = (
  { host, url }: AckMessage,
  sender: chrome.runtime.MessageSender,
): AckResponse => {
  if (!sender.tab?.id) {
    return {};
  }

  ack[host] = 'ack';
  chrome.storage.session.set({ ack });
  chrome.tabs.update(sender.tab.id, { url });
  return { response: 'ACK' };
};

const addRuleHandler = ({ host, rule }: AddRuleMessage): AddRuleResponse => {
  rules[host] = rule;
  chrome.storage.sync.set({ rules });

  return { response: 'RULE_ADDED' };
};

const delRuleHandler = ({ host }: DeleteRuleMessage): DeleteRuleResponse => {
  delete rules[host];
  chrome.storage.sync.set({ rules });

  delete ack[host];
  chrome.storage.session.set({ ack });

  return { response: 'RULE_DELETED' };
};

chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse: (response: Response) => void) => {
    console.log(message);
    if (!loaded) {
      sendResponse({ response: 'NOT_LOADED' });
      return;
    }

    switch (message.query) {
      case 'GET_ALL_RULES':
        sendResponse(getAllRulesHandler());
        break;
      case 'RUN_RULE':
        sendResponse(runRuleHandler(message, sender));
        break;
      case 'ACK':
        sendResponse(ackHandler(message, sender));
        break;
      case 'ADD_RULE':
        sendResponse(addRuleHandler(message));
        break;
      case 'DELETE_RULE':
        sendResponse(delRuleHandler(message));
        break;
      default:
        sendResponse({ response: 'QUERY_NOT_RECOGNIZED' });
        break;
    }
  },
);

chrome.storage.sync.get('rules', (result) => {
  if (result.rules) {
    rules = result.rules;
  }
  loaded = true;
});

chrome.storage.session.get('ack', (result) => {
  if (result.ack) {
    ack = result.ack;
  }
});

export default undefined;
