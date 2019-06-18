import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import "./R_Alert_style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { alertDisappear } from "../../actions";

class RAlert extends Component {
  state = {};

 handleokalert=()=>{
 return this.props.alertDisappear();
 }

  render() {
    if (this.props.a.appear) {
      setTimeout(() => {
        return this.props.alertDisappear();
      }, 2000);
      switch (this.props.a.success) {
        case true:
          console.log("yes2");
          return (
            <div className="position-fixed r_alert_bg d-flex justify-content-center align-items-center">
              <Col xs={8} className="r_fs_20 r_alert_box d-flex p-0 ">
                <Col
                  xs={3}
                  sm={4}
                  className="r_alert_black d-flex align-items-center p-0 p-sm-3"
                >
                  <svg
                    className="r_alert_svg w-100"
                    id="Layer_1"
                    viewBox="0 0 283.5 283.5"
                  >
                    <circle
                      id="r_tickcircle"
                      className="st0 r_alert_path"
                      cx="141.7"
                      cy="135.2"
                      r="79.6"
                    />
                    <polyline
                      id="r_tick"
                      className="st1 r_alert_path"
                      points="182.1,108.7 127.7,162.2 98.5,133 "
                    />
                  </svg>
                </Col>

                <Col className="r_alert_text d-flex flex-column align-items-center justify-content-center ">
                  <p>{this.props.a.msg}</p>
                  <div className="m-3 mt-5"><button type="button" className="alertokbtnblack" onClick={this.handleokalert}>確定</button></div>
                </Col>
              </Col>
            </div>
          );
        case false:
          return (
            <div className="position-fixed r_alert_bg d-flex justify-content-center align-items-center">
              <Col xs={8} className="r_fs_20 r_alert_box d-flex p-0 ">
                <Col
                  xs={3}
                  sm={4}
                  className="r_alert_red d-flex align-items-center p-0 p-sm-3"
                >
                  <svg className="r_alert_svg w-100" viewBox="0 0 283.5 283.5">
                    <circle
                      id="XMLID_1_"
                      className="st0 r_alert_path"
                      cx="141.7"
                      cy="141.7"
                      r="79.6"
                    />

                    <line
                      className="st1 r_alert_path"
                      x1="179.6"
                      y1="101.2"
                      x2="98.5"
                      y2="182.3"
                    />
                    <line
                      className="st1 r_alert_path"
                      x1="103.8"
                      y1="101.2"
                      x2="185"
                      y2="182.3"
                    />
                  </svg>
                </Col>

                <Col className="r_alert_text d-flex flex-column align-items-center justify-content-center r_alert_text_red">
                  <p>{this.props.a.msg}</p>
                  <div className="m-3 mt-5"><button type="button" className="alertokbtnred" onClick={this.handleokalert}>確定</button></div>
                </Col>
              </Col>
            </div>
          );
        default:
          return <></>;
      }
    } else return <></>;
  }
}
const mapStateToProps = state => ({
  a: state.alertReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ alertDisappear }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RAlert);
