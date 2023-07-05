export type Rule = {
  timeout: number;
  favicon: string;
};

export type Rules = { [name: string]: Rule };

export type GenericResponse = 'NOT_LOADED' | 'QUERY_NOT_RECOGNIZED';

export type GetAllRulesMessage = {
  query: 'GET_ALL_RULES';
};

export type GetAllRulesResponse = {
  response: 'ALL_RULES_FOUND' | GenericResponse;
  rules: Rules;
};

export type RunRuleMessage = {
  query: 'RUN_RULE';
  host: string;
};

export type RunRuleResponse = {
  response?: 'NO_RULE' | 'ALREADY_ACK' | GenericResponse;
};

export type AckMessage = {
  query: 'ACK';
  host: string;
  url: string;
};

export type AckResponse = {
  response?: 'ACK' | GenericResponse;
};

export type AddRuleMessage = {
  query: 'ADD_RULE';
  host: string;
  rule: Rule;
};

export type AddRuleResponse = {
  response: 'RULE_ADDED' | GenericResponse;
};

export type DeleteRuleMessage = {
  query: 'DELETE_RULE';
  host: string;
};

export type DeleteRuleResponse = {
  response: 'RULE_DELETED' | GenericResponse;
};

export type Message =
  | AddRuleMessage
  | AckMessage
  | DeleteRuleMessage
  | GetAllRulesMessage
  | RunRuleMessage;

export type Response =
  | AddRuleResponse
  | AckResponse
  | DeleteRuleResponse
  | GetAllRulesResponse
  | RunRuleResponse;
