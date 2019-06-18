import React from "react";
import "./Button.css";
import Col from "react-bootstrap/Col"
const button = props => {
  const style = {display: "none"};
  return (
    <Col className="button">
    <button onClick={props.onClick} style={props.disable? style : null}>
      {props.btnName}
    </button>
    </Col>
  );
}

export default button;