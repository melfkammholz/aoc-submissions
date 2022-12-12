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

const TaskSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

function CodePreview() {
  return <pre>No solution yet</pre>
}

type User = {
  name: string;
  langName: string;
};

type UserListProps = {
  className?: string;
  users: User[];
};

const UserName = styled.span`
  @media (max-width: 576px) {
    white-space: nowrap;
  }
`;

const UserLang = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
`;

const users = [
  { name: "Bob", langName: "Bob" }
];

const UserListGroupItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
`;

const UserList: React.FC<UserListProps> = (props) => {
  const { className, users } = props;
  return <ListGroup className={className}>
    {users.map((user, i) => (
      <UserListGroupItem key={i}>
        <UserName>{user.name}</UserName>
        <UserLang>{user.langName}</UserLang>
      </UserListGroupItem>
    ))}
  </ListGroup>
}

const StyledUserList = styled(UserList)`
  top: 1em;
  overflow-y: scroll;

  @media (max-width: 576px) {
    flex-direction: row;
    overflow-x: scroll;
  }
`;

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
  const year = 2022;

  const { day, part } = useSelector((state: RootState) => state);

  return (
    <StyledContainer fluid>
      <Row>
        <LeftCol sm={3}>
          <StyledUserList users={users} />
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
