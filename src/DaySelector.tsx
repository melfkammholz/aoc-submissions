import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import {
  AppDispatch,
  day,
  RootState
} from "./index";
import { range } from "./utils";

type DaySelectorProps = {
  days: number;
  selected?: number;
};

const DaySelector: React.FC<DaySelectorProps> = (props) => {
  const { days } = props;
  const selected = useSelector((state: RootState) => state.day - 1);
  const dispatch = useDispatch();
  return (
    <Nav variant="pills" activeKey={selected}>
      {range(1, days + 1).map((d) => (
        <Nav.Item key={d}>
          <Nav.Link eventKey={d - 1} onClick={() => dispatch(day(d))}>
            {d}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default DaySelector;