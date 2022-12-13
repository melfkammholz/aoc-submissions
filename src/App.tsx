import React, { useEffect, useCallback } from "react";
import { RootState, day as setDay, part as setPart, user as setUser, nextDay, prevDay, switchPart } from "./index";
import { useDispatch, useSelector, connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import DaySelector from "./DaySelector";
import styled from "styled-components";
import { range, currentDay, mod } from "./utils";
import { ListGroup } from "react-bootstrap";
import KeyboardShortcuts from "./KeyboardShortcuts";
import TaskPartSelector from "./TaskPartSelector";
import UserList from "./UserList";
import { year } from "./constants";

const TaskSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

function CodePreview() {
  return <pre>No solution yet</pre>
}

const LeftCol = styled(Col)`
  position: sticky;
  top: 1em;
  max-height: calc(100vh - 2em);
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 150px;

  @media (max-width: 576px) {
    grid-template-rows: unset;
  }
`;

const StyledContainer = styled(Container)`
  margin: 1em 0;
`;

function App() {
  const { day, part } = useSelector((state: RootState) => state);

  return (
    <StyledContainer fluid>
      <Row>
        <LeftCol sm={3}>
          <UserList />
          <KeyboardShortcuts />
        </LeftCol>
        <Col sm={6}>
          <TaskSelector>
            <TaskPartSelector />
            <DaySelector days={currentDay()} selected={day} />
          </TaskSelector>
          <CodePreview />
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default App;
