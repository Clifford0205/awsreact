import React, { Component } from "react";
import "./LoadMoreBtn_style.css";

class LoadMoreBtn extends Component {
  state = {};
  render() {
    return (
      <button
        className={"r_load_more_btn r_color_white " + this.props.none}
        onClick={this.props.onClick}
      >
        更多路線
      </button>
    );
  }
}

export default LoadMoreBtn;
