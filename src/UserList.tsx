import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { User } from "./users"
import { RootState } from "./index";

type UserListProps = {
  className?: string;
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
  const { className } = props;
  const users = useSelector((state: RootState) => state.users);
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

export default StyledUserList;