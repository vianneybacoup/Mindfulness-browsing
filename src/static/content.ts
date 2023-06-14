const message = {
  query: 'RUN_RULE',
  host: window.location.host,
};
chrome.runtime.sendMessage(message, async (answer) => {
  if (answer.response === 'NOT_LOADED') {
    await new Promise((r) => setTimeout(r, 1000));

    chrome.runtime.sendMessage(message);
  }
});

export default undefined;
