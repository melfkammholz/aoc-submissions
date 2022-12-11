import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { range, clamp } from "./utils";
import { ListGroup } from "react-bootstrap";

const TaskSelector = styled.div`
  display: flex;
  flex-direction: row;
`;

type DaySelectorProps = {
  days: number;
};

const DaySelector: React.FC<DaySelectorProps> = (props) => {
  const { days } = props;
  return (
    <Nav variant="pills">
      {range(1, days + 1).map(d => (
        <Nav.Item>
          <Nav.Link>{d}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

function TaskPartSelector() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link>A</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>B</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

const Key = styled.span`
  background: #f0f0f0;
  padding: .125em .2em;
  font-family: monospace;
  border-radius: .125em;
  border: 1px solid #b0b0b0;
  margin: .25em;
  line-height: 1;
  display: inline-block;

  @media (prefers-color-scheme: dark) {
    color: black;
  }
`;

type KeyboardShortcutsProps = {
  className?: string;
};

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = (props) => {
  const { className } = props;
  return (
    <div className={className}>
      <h5>Keyboard shortcuts</h5>
      <ul>
        <li><Key>w</Key>/<Key>s</Key> move between users</li>
        <li><Key>a</Key>/<Key>d</Key> move between tasks</li>
        <li><Key>q</Key> switch between task parts</li>
      </ul>
    </div>
  );
}

const StyledKeyboardShortcuts = styled(KeyboardShortcuts)`
  margin: 1em;

  h5 {
    font-size: 1.1em;
  }

  @media (max-width: 576px) {
    display: none;
  }
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
    {users.map(user => (
      <UserListGroupItem>
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

  const days = new Date(
    clamp(
      new Date(`${year}-12-01`).valueOf(),
      new Date(`${year}-12-25`).valueOf(),
      Date.now()
    )
  ).getDate();

  return (
    <StyledContainer fluid>
      <Row>
        <LeftCol sm={3}>
          <StyledUserList users={users} />
          <StyledKeyboardShortcuts />
        </LeftCol>
        <Col sm={6}>
          <TaskSelector>
            <TaskPartSelector />
            <DaySelector days={days} />
          </TaskSelector>
          <CodePreview />
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default App;
