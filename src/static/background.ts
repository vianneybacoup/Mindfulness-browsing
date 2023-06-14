type Rule = {
  timeout: number;
};

let loaded = false;
let rules: { [name: string]: Rule } = {};
let ack: { [name: string]: string } = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!loaded) {
    sendResponse({
      response: 'NOT_LOADED',
    });
    return;
  }

  let response = {};
  switch (message.query) {
    case 'GET_RULE':
      if (!rules[message.host]) {
        response = {
          response: 'NO_RULE',
        };
      } else {
        response = {
          response: 'RULE_FOUND',
          timeout: rules[message.host].timeout,
        };
      }
      break;
    case 'RUN_RULE':
      if (!rules[message.host]) {
        response = {
          response: 'NO_RULE',
        };
      } else if (ack[message.host]) {
        response = {
          response: 'ALREADY_ACK',
          timeout: rules[message.host].timeout,
        };
      } else {
        if (!sender.tab || !sender.tab.url || !sender.tab.id) {
          return {};
        }
        const urlParams =
          '?url=' +
          encodeURIComponent(sender.tab.url) +
          '&timeout=' +
          rules[message.host].timeout;
        chrome.tabs.update(sender.tab.id, {
          url: chrome.runtime.getURL('src/overlay/overlay.html') + urlParams,
        });
      }
      break;
    case 'ACK':
      ack[message.host] = 'ack';
      chrome.storage.session.set({ ack: ack });
      if (!sender.tab || !sender.tab.id) {
        return {};
      }
      chrome.tabs.update(sender.tab.id, { url: message.url });
      break;
    case 'ADD_RULE':
      rules[message.host] = { timeout: message.timeout };
      chrome.storage.sync.set({ rules: rules });

      response = {
        response: 'RULE_ADDED',
      };
      break;
    case 'DELETE_RULE':
      delete rules[message.host];
      chrome.storage.sync.set({ rules: rules });

      delete ack[message.host];
      chrome.storage.session.set({ ack: ack });

      response = {
        response: 'RULE_DELETED',
      };
      break;
    default:
      response = {
        response: 'QUERY_NOT_RECOGNIZED',
      };
      break;
  }
  sendResponse(response);
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
