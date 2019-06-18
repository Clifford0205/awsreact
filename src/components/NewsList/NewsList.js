import React from "react";

import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";
import "./NewsList.css";

class NewsList extends React.Component {
  render() {
    let endPoint = this.props.text.indexOf("</figure>") + 9;
    let figure = this.props.text.slice(0, endPoint);
    let text = this.props.text.slice(endPoint);

    return (
      <Col lg={this.props.size} className="lists">
        <div className="NewsList">
          <div className="Type">#{this.props.type}</div>
          <div className="ReadMore">
            <button onClick={this.props.onClick}>閱讀文章</button>
          </div>

          <div className="Image" dangerouslySetInnerHTML={{ __html: figure }} />
          <div className="Title">
            <h4>{this.props.title}</h4>
          </div>
          <div
            className="Article"
            dangerouslySetInnerHTML={{
              __html: text + `<div className='Cover'></div>`
            }}
          />
        </div>
      </Col>
    );
  }
}

export default withRouter(NewsList);
