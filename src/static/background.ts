type Rule = {
  timeout: number;
};

let rules: { [name: string]: Rule } = {};
let ack: { [name: string]: string } = {};

chrome.storage.sync.get('rules', function (result) {
  if (result.rules) {
    rules = result.rules;
  }
});
chrome.storage.session.get('ack', function (result) {
  if (result.ack) {
    ack = result.ack;
  }
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  let response = {};
  switch (message.query) {
    case 'GET_RULE':
      if (rules[message.host] == undefined) {
        response = {
          response: 'NO_RULE',
        };
      } else if (ack[message.host]) {
        response = {
          response: 'ALREADY_ACK',
          timeout: rules[message.host].timeout,
        };
      } else {
        response = {
          response: 'RULE_FOUND',
          timeout: rules[message.host].timeout,
        };
      }
      break;
    case 'ACK':
      ack[message.host] = 'ack';
      chrome.storage.session.set({ ack: ack });
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

export default undefined;
