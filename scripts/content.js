function overlay(timeout) {
  const newDiv = document.createElement("div")
  newDiv.id = "overlay-extension"

  newDiv.style.width = "100%";
  newDiv.style.height = "100%";
  newDiv.style.backgroundColor = "white";
  newDiv.style.position = "fixed";
  newDiv.style.top = "0px";
  newDiv.style.left = "0px";
  newDiv.style.zIndex = 1000;

  const temp = document.createTextNode(window.location.host);
  newDiv.append(temp)

  document.body.append(newDiv)

  setTimeout(() => {
    document.getElementById("overlay-extension").remove();

    const message = {
      "query": "ACK",
      "host": window.location.host
    }
    chrome.runtime.sendMessage(message)
  }, timeout)
}


const message = {
  "query": "GET_RULE",
  "host": window.location.host
}
chrome.runtime.sendMessage(message, (result) => {
  if (result.response == "RULE_FOUND")
    overlay(result.timeout)
})