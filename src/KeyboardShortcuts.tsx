import React from "react";
import { connect } from "react-redux";
import {
  AppDispatch,
  nextDay,
  prevDay,
  nextUser,
  prevUser,
  switchPart
} from "./index";
import styled from "styled-components";

type KeyboardShortcutsProps = {
  className?: string;
  prevUser: () => void;
  nextUser: () => void;
  prevDay: () => void;
  nextDay: () => void;
  switchPart: () => void;
};

const Key = styled.span`
  background: #f0f0f0;
  padding: 0.125em 0.2em;
  font-family: monospace;
  border-radius: 0.125em;
  border: 1px solid #b0b0b0;
  margin: 0.25em;
  line-height: 1;
  display: inline-block;

  @media (prefers-color-scheme: dark) {
    color: black;
  }
`;

class KeyboardShortcuts extends React.Component<KeyboardShortcutsProps> {
  static defaultProps = {
    prevUser: () => {},
    nextUser: () => {},
    prevDay: () => {},
    nextDay: () => {},
    switchPart: () => {}
  };

  constructor(props: KeyboardShortcutsProps) {
    super(props);

    this.keydownListener = this.keydownListener.bind(this);
  }

  keydownListener(event: KeyboardEvent) {
    if (event.key === "w" || event.key === "k") this.props.prevUser();
    else if (event.key === "s" || event.key === "j") this.props.nextUser();
    else if (event.key === "a" || event.key === "h") this.props.prevDay();
    else if (event.key === "d" || event.key === "l") this.props.nextDay();
    else if (event.key === "q") this.props.switchPart();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keydownListener);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydownListener);
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <h5>Keyboard shortcuts</h5>
        <ul>
          <li>
            <Key>w</Key>/<Key>s</Key> move between users
          </li>
          <li>
            <Key>a</Key>/<Key>d</Key> move between tasks
          </li>
          <li>
            <Key>q</Key> switch between task parts
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  prevDay: () => dispatch(prevDay()),
  nextDay: () => dispatch(nextDay()),
  prevUser: () => dispatch(prevUser()),
  nextUser: () => dispatch(nextUser()),
  switchPart: () => dispatch(switchPart())
});

const ConnectedKeyboardShortcuts = connect(
  null,
  mapDispatchToProps
)(KeyboardShortcuts);

const StyledKeyboardShortcuts = styled(ConnectedKeyboardShortcuts)`
  margin: 1em;

  h5 {
    font-size: 1.1em;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export default StyledKeyboardShortcuts;
