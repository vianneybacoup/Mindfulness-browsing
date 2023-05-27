function overlay(timeout: number) {
  const newDiv: HTMLDivElement = document.createElement('div');
  newDiv.id = 'overlay-extension';

  newDiv.style.width = '100%';
  newDiv.style.height = '100%';
  newDiv.style.backgroundColor = 'white';
  newDiv.style.position = 'fixed';
  newDiv.style.top = '0px';
  newDiv.style.left = '0px';
  newDiv.style.justifyContent = 'center';
  newDiv.style.alignItems = 'center';
  newDiv.style.display = 'flex';
  newDiv.style.zIndex = '2147483646';

  const newDiv2 = document.createElement('div');
  newDiv2.style.fontSize = '50px';
  newDiv2.style.zIndex = '2147483647';

  const temp = document.createTextNode(
    'Hey, you are starting ' + window.location.hostname + '!',
  );

  newDiv2.append(temp);
  newDiv.append(newDiv2);

  document.body.append(newDiv);

  setTimeout(() => {
    newDiv.remove();

    const message = {
      query: 'ACK',
      host: window.location.host,
    };
    chrome.runtime.sendMessage(message);
  }, timeout);
}

const message = {
  query: 'GET_RULE',
  host: window.location.host,
};
chrome.runtime.sendMessage(message, (result) => {
  if (result.response == 'RULE_FOUND') overlay(result.timeout);
});

export default undefined