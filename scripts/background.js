const rules = {
    "developer.chrome.com": {
        "timeout": 2000
    }
}

var ack = []

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    var response = {}
    switch (message.query) {
        case "GET_RULE":
            if (ack.includes(message.host)) {
                response = {
                    "response": "ALREADY_ACK"
                }
            } else if (rules[message.host]) {
                response = {
                    "response": "RULE_FOUND",
                    "timeout": rules[message.host].timeout
                }
            } else {
                response = {
                    "response": "NO_RULE"
                }
            }
            break
        case "ACK":
            ack.push(message.host)
            break
        default:
            response = {
                "response": "QUERY_NOT_RECOGNIZED"
            }
            break
    }
    sendResponse(response)
})