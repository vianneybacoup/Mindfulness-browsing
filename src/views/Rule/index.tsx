import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context';
import AddRuleView from './components/AddRule';
import BottomBar from './components/BottomBar';
import EditRuleView from './components/EditRule';

const Container = styled.div`
  flex: 1;
`;

const Rule = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Container>
        {state === 'LOADING' ? (
          <>
            <p>Loading ...</p>
          </>
        ) : state === 'RULE' ? (
          <EditRuleView />
        ) : state === 'CONNECTION_ISSUE' ? (
          <>
            <p>Error in the extension</p>
          </>
        ) : state === 'NOT_AN_URL' ? (
          <>
            <p>This page cannot run this extension</p>
          </>
        ) : state === 'NO_RULE' ? (
          <AddRuleView />
        ) : (
          <p>{state}</p>
        )}
      </Container>
      <BottomBar />
    </>
  );
};

export default Rule;
