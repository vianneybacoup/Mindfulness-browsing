function overlay() {
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
    chrome.storage.session.set({ "host": window.location.host }, () => {
      if (chrome.runtime.lastError)
        alert('Error setting');
    })
  }, 2000)
}

chrome.storage.session.get("host", function(result) {
  if (chrome.runtime.lastError)
    alert('Error getting');

  if (result.host == undefined) { 
    overlay()
  }
})
