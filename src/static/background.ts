export type Rule = {
  timeout: number;
};

export type Rules = { [name: string]: Rule };

let loaded = false;
let rules: Rules = {};
let ack: { [name: string]: string } = {};

export type MessageGetRule = {
  host: string;
};
function getRuleHandler(message: MessageGetRule) {
  const hostRule = rules[message.host];
  if (!hostRule) {
    return { response: 'NO_RULE' };
  }

  return {
    response: 'RULE_FOUND',
    timeout: hostRule.timeout,
  };
}

function getAllRulesHandler() {
  return {
    response: 'ALL_RULES_FOUND',
    rules,
  };
}

export type MessageRunRule = {
  host: string;
};
function runRuleHandler(
  message: MessageRunRule,
  sender: chrome.runtime.MessageSender,
) {
  const hostRule = rules[message.host];
  if (!hostRule) {
    return { response: 'NO_RULE' };
  }

  const hostack = ack[message.host];
  if (hostack) {
    return { response: 'ALREADY_ACK' };
  }

  if (!sender.tab?.url || !sender.tab?.id) {
    return {};
  }

  const urlParams =
    '?url=' +
    encodeURIComponent(sender.tab.url) +
    '&timeout=' +
    hostRule.timeout;
  chrome.tabs.update(sender.tab.id, {
    url: chrome.runtime.getURL('src/overlay/overlay.html') + urlParams,
  });
  return {};
}

export type MessageAck = {
  host: string;
  url: string;
};
function ackHandler(message: MessageAck, sender: chrome.runtime.MessageSender) {
  if (!sender.tab?.id) {
    return {};
  }

  ack[message.host] = 'ack';
  chrome.storage.session.set({ ack: ack });
  chrome.tabs.update(sender.tab.id, { url: message.url });
  return {};
}

export type MessageAddRule = {
  host: string;
  timeout: number;
};
function addRuleHandler(message: MessageAddRule) {
  rules[message.host] = { timeout: message.timeout };
  chrome.storage.sync.set({ rules: rules });

  return { response: 'RULE_ADDED' };
}

export type MessageDelRule = {
  host: string;
};
function delRuleHandler(message: MessageDelRule) {
  delete rules[message.host];
  chrome.storage.sync.set({ rules: rules });

  delete ack[message.host];
  chrome.storage.session.set({ ack: ack });

  return { response: 'RULE_DELETED' };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!loaded) {
    sendResponse({ response: 'NOT_LOADED' });
    return;
  }

  switch (message.query) {
    case 'GET_RULE':
      sendResponse(getRuleHandler(message));
      break;
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
});

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
