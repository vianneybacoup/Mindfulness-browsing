import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiTwotoneAppstore } from 'react-icons/ai';

const Root = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  display: flex;
  align-item: flex-end;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  color: grey;
  text-align: center;
  font-size: 12px;
  flex: 1;
  cursor: pointer;
`;

const BottomBar = (): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <Root>
      <Button onClick={() => navigate('/overview')}>
        <AiTwotoneAppstore /> Overview
      </Button>
      <Button
        style={{ borderLeft: '1px solid grey' }}
        onClick={() => navigate('/settings')}
      >
        Settings
      </Button>
    </Root>
  );
};

export default BottomBar;
