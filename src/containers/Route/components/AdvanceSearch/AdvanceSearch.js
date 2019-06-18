import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import './AdvanceSearch_style.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import CountryData from '../../data/countryData.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handleCountryChange,
  handleSearch,
  handlecurrentPage,
  alertAppear,
} from '../../actions';
import RAlert from '../R_Alert/R_Alert';

class AdvanceSearch extends Component {
  state = {};
  countryChange = event => {
    this.props.handleCountryChange(event.target.value);
  };
  handleSearch = () => {
    console.log('in search');
    this.props.handlecurrentPage('search');
    this.props.handleSearch(0);
    //document.searchform.reset();
    document.querySelector('#searchtxt').value = '';
  };
  handletagchange = e => () => {
    //console.log(this.state);

    let a = {
      btn1: false,
      btn2: false,
      btn3: false,
    };

    a[e] = 'checked';

    this.setState(a);
    this.handleSearch();
  };
  handleaddnewclick = async () => {
    try {
      const response = await fetch('http://18.139.60.49:5000/is_logined', {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });

      const jsonObject = await response.json();
      if (!jsonObject.isLogined) {
        console.log('not loged in!!!!!!');
        // return alert("新增路線前請先登入");
        return this.props.alertAppear(false, '新增路線前請先登入');
      } else {
        return this.props.history.push('/route/addnew');
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <>
        {' '}
        <RAlert />
        <Container fluid>
          <Row className="justify-content-end r_as_add_new_btn_con m-0">
            <button
              type="button"
              className="r_as_add_new_btn r_fw_medium mb-4 m-md-0"
              onClick={this.handleaddnewclick}
            >
              新增路線
            </button>
          </Row>
          <form name="searchform">
            <Row className="m-0">
              <label
                className={
                  'r_capsule r_as_tag r_fw_bold ml-0' +
                  (this.state.btn1 ? ' r_as_tag_selected' : '')
                }
                onClick={this.handletagchange('btn1')}
                name="r_tag"
              >
                短途
                <input
                  type="radio"
                  className="tag11 d-none"
                  name="r_tag"
                  value="短途"
                  //checked={this.state.btn2 ? true : false}
                />
              </label>
              <label
                className={
                  'r_capsule r_as_tag r_fw_bold ml-0' +
                  (this.state.btn2 ? ' r_as_tag_selected' : '')
                }
                onClick={this.handletagchange('btn2')}
                name="r_tag"
              >
                長途
                <input
                  type="radio"
                  className="tag22 d-none"
                  name="r_tag"
                  value="長途"
                  //checked={this.state.btn2 ? true : false}
                />
              </label>
              <label
                className={
                  'r_capsule r_as_tag r_fw_bold ml-0' +
                  (this.state.btn3 ? ' r_as_tag_selected' : '')
                }
                onClick={this.handletagchange('btn3')}
                name="r_tag"
              >
                環島
                <input
                  type="radio"
                  className="tag33 d-none"
                  name="r_tag"
                  value="環島"
                  //checked={this.state.btn2 ? true : false}
                />
              </label>
            </Row>
            <Row className="m-0">
              <Col className="d-flex align-items-end p-0 my-4 my-md-5" lg={6}>
                <Col className="p-0">
                  <Form.Label className="r_fw_bold">國家</Form.Label>
                  <Form.Control
                    as="select"
                    className="rr_as_select"
                    placeholder="國家"
                    onChange={this.countryChange}
                    name="r_country"
                    onBlur={this.handleSearch}
                  >
                    <option value="" disabled defaultValue hidden>
                      國家
                    </option>
                    {Object.keys(CountryData).map(i => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className="p-0 position-relative ml-4">
                  <Form.Label className="r_fw_bold">地區</Form.Label>
                  <Form.Control
                    as="select"
                    className="rr_as_select"
                    placeholder="地區"
                    name="r_area"
                    onBlur={this.handleSearch}
                  >
                    <option value="" disabled defaultValue hidden>
                      地區
                    </option>
                    {Object.keys(this.props.r.areas).map(i => (
                      <option key={i} value={this.props.r.areas[i]}>
                        {this.props.r.areas[i]}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Col>
              <Col
                className="mb-3 mb-md-5 my-lg-5 d-flex align-items-end  px-0"
                lg={6}
              >
                <div className="w-100 d-flex justify-content-end">
                  <input
                    type="text"
                    className="r_as_search mx-2"
                    name="r_search"
                    id="searchtxt"
                  />
                  <button
                    className="r_as_search_btn r_color_white px-3 r_fw_bold"
                    type="button"
                    onClick={this.handleSearch}
                  >
                    搜尋
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  r: state.routeCountryChange,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { handleCountryChange, handleSearch, handlecurrentPage, alertAppear },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvanceSearch));
