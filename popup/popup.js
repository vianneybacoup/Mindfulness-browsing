const btn = document.getElementById("btn")
var host = ""

function del_rule() {
    const message = {
        "query": "DELETE_RULE",
        "host": host
    }
    chrome.runtime.sendMessage(message, (result) => {
        if (result.response == "RULE_DELETED") {
            btn.removeEventListener("click", del_rule)
            btn.addEventListener("click", add_rule)
            btn.innerText = "Add rule (3s)"
        }
    })
}

function add_rule() {
    const message = {
        "query": "ADD_RULE",
        "host": host,
        "timeout": 3000
    }
    chrome.runtime.sendMessage(message, (result) => {
        if (result.response == "RULE_ADDED") {
            btn.removeEventListener("click", add_rule)
            btn.addEventListener("click", del_rule)
            btn.innerText = "Remove rule"
        }
    })
}

var query = { active: true, currentWindow: true }
chrome.tabs.query(query, (tab) => {
    host = new URL(tab[0].url).host
    
    const message = {
        "query": "GET_RULE",
        "host": host
    }
    chrome.runtime.sendMessage(message, (result) => {
        if (result.response != "NO_RULE") {
            btn.addEventListener("click", del_rule)
            btn.innerText = "Remove rule"
        } else {
            btn.addEventListener("click", add_rule)
            btn.innerText = "Add rule (3s)"
        }
    })
})