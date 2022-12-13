import React from "react";
import {
  RootState,
  part as setPart
} from "./index";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";

type TaskPartSelectorProps = {
};

const TaskPartSelector: React.FC<TaskPartSelectorProps> = () => {
  const part = useSelector((state: RootState) => state.part);
  const dispatch = useDispatch();
  return (
    <Nav variant="pills" activeKey={part}>
      <Nav.Item>
        <Nav.Link eventKey={0} onClick={() => dispatch(setPart(0))}>
          A
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={1} onClick={() => dispatch(setPart(1))}>
          B
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TaskPartSelector;