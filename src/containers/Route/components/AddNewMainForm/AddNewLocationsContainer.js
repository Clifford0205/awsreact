import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddNewLocations from './AddNewLocations';
import { connect } from 'react-redux';

class AddNewLocationsContainer extends Component {
  state = {};
  render() {
    return (
      <Container fluid className="p-0">
        <Row className="d-flex flex-column w-100 m-0 pb-5">
          <Col className="d-flex justify-content-start px-0 mx-3">
            <Col lg={5} className="d-flex justify-content-start p-0">
              <div className="pr-5">
                <div className="position-relative h-100">
                  <div className="r_d_circle" />
                  <div className="r_d_stick position-absolute" />
                </div>
              </div>

              <div className="r_fw_bold pl-3 pb-3">{this.props.l.depart}</div>
            </Col>
            <Col className="my-4" />
          </Col>
          <form
            name="form2"
            method="post"
            className="w-100"
            encType="multipart/form-data"
            id="form2"
          >
            {this.props.num.map((i, k) => {
              return <AddNewLocations key={i.num} num={i.num} l_num={k} />;
            })}
          </form>
          <Col className="d-flex justify-content-start px-0 mx-3 ">
            <Col className="d-flex justify-content-start p-0">
              <div className="pr-5 pt-3 position-relative h-100">
                <div className="position-relative h-100">
                  <div
                    className="r_d_stick position-absolute"
                    style={{ height: '2.5rem', bottom: '23px' }}
                  />
                  <div className="r_d_circle " />
                </div>
              </div>
              {/* <div className="r_d_stick position-absolute" /> */}
              <div className="r_fw_bold pl-3 pt-4">{this.props.l.arrive}</div>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  l: state.routeAddNewLocation,
});

export default connect(mapStateToProps)(AddNewLocationsContainer);
