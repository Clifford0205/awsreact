import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handleAddNewLocationCountryChange,
  handleAddNewLocationDelete,
  handleAddNewLocationUp,
  handleAddNewLocationDown,
} from '../../actions';

class AddNewLocations extends Component {
  state = {};
  countryChange = event => {
    this.props.handleAddNewLocationCountryChange(
      this.props.num,
      event.target.value
    );
  };
  addNewLocationDelete = () => {
    this.props.handleAddNewLocationDelete(this.props.num);
  };
  orderUp = () => {
    this.props.handleAddNewLocationUp(this.props.num);
  };
  orderDown = () => {
    this.props.handleAddNewLocationDown(this.props.num);
  };

  render() {
    if (!this.props.l.locationList[0]) {
      this.props.l.locationList.filter(
        i => i.num === this.props.num
      )[0].areas = [];
    }

    return (
      <>
        <datalist id={'areaData' + this.props.num}>
          {this.props.l.locationList
            .filter(i => i.num === this.props.num)[0]
            .areas.map(i => (
              <option key={i} value={i} />
            ))}
          }
        </datalist>
        <Col className="d-flex justify-content-start px-0 mx-3">
          <Col className="d-flex justify-content-start p-0">
            <div className="pr-5">
              <div className="position-relative h-100">
                <div className="r_d_circle" />
                <div className="r_d_stick position-absolute" />
              </div>
            </div>
            <div className="w-100 position-relative r_an_l_con p-5">
              <input type="text" name="r_sid[]" className="d-none rr_sid" />
              <button
                type="button"
                className="r_an_del_btn position-absolute m-3 p-3"
                onClick={this.addNewLocationDelete}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div>
                <div className="ordercontrol pb-4">
                  <button type="button" onClick={this.orderUp}>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </button>
                  <button
                    type="button"
                    onClick={this.orderDown}
                    className="ml-4"
                  >
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                </div>
                <label htmlFor={'l_name' + this.props.l_num}>
                  地點{'' + (this.props.l_num + 1)}
                </label>
                <input
                  id={'l_name' + this.props.l_num}
                  type="text"
                  className="form-control r_form_group geol_name"
                  name="l_name[]"
                  placeholder="地點名稱"
                />
                <small>必填</small>
              </div>
              <Row className="m-0 mt-4">
                <Col className="d-flex flex-column p-0">
                  <label htmlFor={'l_country' + this.props.l_num}>國家</label>
                  <input
                    name="l_country[]"
                    list="countryData"
                    id={'l_country' + this.props.l_num}
                    onChange={this.countryChange}
                    className="geol_country r_form_group form-control"
                    placeholder="國家"
                  />
                </Col>
                <Col className="d-flex flex-column p-0 ml-5">
                  <label htmlFor={'l_area[]' + this.props.l_num}>地區</label>
                  <input
                    className="geol_area r_form_group form-control"
                    name="l_area[]"
                    list={'areaData' + this.props.num}
                    id={'l_area[]' + this.props.l_num}
                    placeholder="地區"
                  />
                </Col>
              </Row>
              <div className="d-flex flex-column mt-4">
                <label htmlFor={'l_intro[]' + this.props.l_num}>描述</label>
                <textarea
                  type="text"
                  name="l_intro[]"
                  placeholder="描述"
                  style={{ border: '1px solid #ccc' }}
                  id={'l_intro[]' + this.props.l_num}
                  className="r_form_group form-control"
                />
              </div>
              <input
                name="l_order[]"
                value={this.props.l_num}
                className="d-none"
                readOnly
              />
            </div>
          </Col>
        </Col>
      </>
    );
  }
}

const mapStateToProps = state => ({
  l: state.routeAddNewLocation,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleAddNewLocationCountryChange,
      handleAddNewLocationDelete,
      handleAddNewLocationUp,
      handleAddNewLocationDown,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewLocations);
