import React from 'react';
import './App.css'

export class RuleControl extends React.Component {
  state = {
    rule: "LOADING"
  };
  host = ""

  constructor() {
    super({})
    this.handleNewRuleClick = this.handleNewRuleClick.bind(this);
    this.handleRemoveRuleClick = this.handleRemoveRuleClick.bind(this);
    this.urlReceived = this.urlReceived.bind(this);

    this.setState({ rule: this.state.rule})
  
    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, this.urlReceived)
  }

  urlReceived(tabs: chrome.tabs.Tab[]) {
    if (tabs[0].url) {
      this.host = new URL(tabs[0].url!).host;

      const message = {
        query: 'GET_RULE',
        host: this.host,
      };
      chrome.runtime.sendMessage(message, (result) => {
        if (!result) {
          console.log("POPUP: Send message GET_RULE no response")
          this.setState({rule: "CONNECTION_ISSUE"})
          return
        }

        if (result.response != 'NO_RULE') {
          this.setState({rule: "RULE" })
        } else {
          this.setState({rule: "NO_RULE"})
        }
      });
    } else {
      this.setState({rule: "NOT_AN_URL"})
    }
  }

  handleNewRuleClick() {
    const message = {
      query: 'ADD_RULE',
      host: this.host,
      timeout: 3000 //timeout_elmt.valueAsNumber * 1000,
    };
    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_ADDED') {
        this.setState({rule: "RULE"})
      }
    });
  }

  handleRemoveRuleClick() {
    const message = {
      query: 'DELETE_RULE',
      host: this.host,
    };
    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_DELETED') {
        this.setState({rule: "NO_RULE"})
      }
    });
  }

  render() {
    let ret = (
      <>
      </>
    )
    const rule = this.state.rule

    if (rule == "LOADING") {
      ret = (
        <div>
          <p>Loading ...</p>  
        </div>
      )
    } else if (rule == "RULE") {
      ret = (
        <div>
          <p>Rule found</p>
          <button onClick={this.handleRemoveRuleClick}>Remove rule</button>
        </div>
      )
    } else if (rule == "NO_RULE") {
      ret = (
        <div>
          <p>Rule not found</p>
          <button onClick={this.handleNewRuleClick}>Add rule</button>
        </div>
      )
    } else if (rule == "NOT_AN_URL") {
      ret = (
        <div>
          <p>This page cannot run this extension</p>
        </div>
      )
    } else if (rule == "CONNECTION_ISSUE") {
      ret = (
        <div>
          <p>Error in the extension</p>
        </div>
      )
    } else {
      ret = (
        <div>
          <p>{rule}</p>
        </div>
      )
    }

    return (
      <>
        {ret}
      </>
    )
  }
}