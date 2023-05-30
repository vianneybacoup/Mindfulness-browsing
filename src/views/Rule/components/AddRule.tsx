import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context';

const DEFAULT_TIMEOUT = 3;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const RuleBox = styled.div`
  border-radius: 10px;
  border: 2px solid #ffa384;
  background-color: #ffe0d6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 14px;
  padding: 10px;
`;

const Title = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bolder;
`;

const Host = styled.span`
  font-size: 14px;
  font-weight: bolder;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 3px;
  color: grey;
  text-align: center;
  font-size: 12px;
  flex: 1;
  cursor: pointer;
`;

const Input = styled.input`
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 3px;
`;

const AddRuleView = () => {
  const { host, setState } = useContext(AppContext);
  const [time, setTime] = useState<number>(DEFAULT_TIMEOUT);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value as unknown as number);
  };

  const onAddRule = () => {
    const message = {
      query: 'ADD_RULE',
      host: host,
      timeout: time * 1000,
    };

    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_ADDED') {
        setState('RULE');
      }
    });
  };

  return (
    <Root>
      <RuleBox>
        <Title>No rule found</Title>
        <div>
          <span>on </span>
          <Host>{host}</Host>
        </div>
      </RuleBox>
      <Input type="number" onChange={onInputChange} value={time} />
      <Button onClick={onAddRule}>New rule</Button>
    </Root>
  );
};

export default AddRuleView;
