import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/es/Col'
import GoogleMap from './GoogleMap'

class MapDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.course[0],
    }
  }

  render() {
    return (
      <>
        <Container fluid>
          <Row className="my-4 justify-content-center">
            <Col lg={10}>
              <h5>上課地點：{this.state.course.c_courseLocation}</h5>
            </Col>
          </Row>
        </Container>
        <Container fluid className="mapDiv">
          {/*<p>insert google map here</p>*/}
          <GoogleMap />
        </Container>
      </>
    )
  }
}

export default MapDiv
