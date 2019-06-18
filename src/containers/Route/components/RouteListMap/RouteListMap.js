import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

class RouteListMap extends Component {
  state = {};
  render() {
    let style = {
      height: '35rem',
      //   backgroundColor: 'beige',
    };
    return (
      <Row>
        <div style={style} className="w-100 my-5" />
      </Row>
    );
  }
}

export default RouteListMap;
