import React, { useContext } from 'react';
import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { AppContext } from '../../../context';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const RuleBox = styled.div`
  border-radius: 10px;
  border: 2px solid #74bdcb;
  background-color: #c3e3e9;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 14px;
`;

const Title = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bolder;
`;

const Host = styled.span`
  font-size: 14px;
  font-weight: bolder;
`;

const BottomContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  border-top: 1px solid #74bdcb;
  background-color: #ffffff;
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

const EditRuleView = () => {
  const { host, setState } = useContext(AppContext);

  const onRemoveRule = () => {
    const message = {
      query: 'DELETE_RULE',
      host: host,
    };

    chrome.runtime.sendMessage(message, (result) => {
      if (result.response == 'RULE_DELETED') {
        setState('NO_RULE');
      }
    });
  };

  return (
    <Root>
      <RuleBox>
        <Title>Rule found</Title>
        <div>
          <span>on </span>
          <Host>{host}</Host>
        </div>
        {/* TODO: replace with correct timeout */}
        <BottomContainer>X sec</BottomContainer>
      </RuleBox>
      <Button onClick={onRemoveRule}>
        <AiFillDelete /> Remove
      </Button>
    </Root>
  );
};

export default EditRuleView;
