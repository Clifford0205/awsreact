import React, { Component } from "react";
import { withRouter } from "react-router";
import "./ReturnBtn_style.css";

class ReturnBtn extends Component {
  state = {};
  redirect = () => {
    this.props.history.push("/route");
  };
  render() {
    return (
      <div>
        <span
          href={document.referrer}
          className="r_return_btn"
          onClick={this.redirect}
        >
          返回
        </span>
      </div>
    );
  }
}

export default withRouter(ReturnBtn);
