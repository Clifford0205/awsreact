import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoutePageHead from '../components/RoutePageHead/RoutePageHead';
import AddNewMainForm from '../components/AddNewMainForm/AddNewMainForm';
import FormHead from '../components/FormHead/FormHead';
import AddNewLocationsContainer from '../components/AddNewMainForm/AddNewLocationsContainer';
import RAlert from '../components/R_Alert/R_Alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handleAddNewLocation,
  handleAddNewSubmit,
  addNewReset,
  alertDisappear,
  alertAppear,
} from '../actions';
import { withRouter } from 'react-router';
import map_style from '../data/google_map_style.json';
const google = window.google;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

class RouteAddNew extends Component {
  state = {};

  async componentDidMount() {
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
        return this.props.history.push('/route');
      }
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate() {
    if (this.props.l.success === true) {
      setTimeout(() => {
        return this.props.history.push('/route');
      }, 1300);
    }
    //console.log(this.props)
  }
  componentWillUnmount() {
    this.props.addNewReset();
  }
  addNewLocation = () => {
    this.props.handleAddNewLocation();
  };

  addNewSubmit = async () => {
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
        //return alert("新增路線前請先登入");
        this.props.alertAppear(false, '新增路線前請先登入');
        return;
      }

      await this.setState({
        user_id: jsonObject.user_id,
      });

      await this.props.handleAddNewSubmit(this.state.user_id);
    } catch (e) {
      console.log(e);
    }
  };

  //   getcoordinates = (address, field) => {
  //     geocoder.geocode({ address: address }, async (results, status) => {
  //       try {
  //         if (status === "OK") {
  //           document.querySelector("#" + field).value = JSON.stringify(results);
  //           this.markerD = new google.maps.Marker({
  //             map: this.map22,
  //             position: results[0].geometry.location,
  //             title: address
  //           });
  //           this.markerD.setMap(this.map22);
  //           this.map22.setCenter(results[0].geometry.location);
  //         } else {
  //           alert("Geocode was not successfull because " + status);
  //           throw new Error("Geocode was not successfull because " + status);
  //         }
  //       } catch (e) {
  //         console.log("" + e);
  //       }
  //     });
  //   };

  handleMapPreview = () => {
    console.log('xxx');
    document.querySelector('#mapdisplaycon').style.display = 'flex';
    // if (this.markerD) {
    //   this.markerD.setMap(null);
    // }
    // this.getcoordinates(event.target.value, "depart_info");
    let country = document.querySelector('#r_country').value;
    let area = document.querySelector('#r_area').value;
    let rdepart = document.querySelector('#r_depart').value;
    let rarrive = document.querySelector('#r_arrive').value;
    console.log(country);
    console.log(area);
    if (!rdepart || !rarrive) {
      //alert("no information");
      //return console.log("no information");
      return this.props.alertAppear(false, '請輸入出發地及目的地');
    }
    let lnum = document.querySelectorAll('.rr_sid').length;
    let geolname = document.querySelectorAll('.geol_name');
    let geolcountry = document.querySelectorAll('.geol_country');
    let geolarea = document.querySelectorAll('.geol_area');
    let arr = [];
    if (lnum > 0) {
      for (let i = 0; i < lnum; i++) {
        arr.push({
          location:
            (geolcountry[i].value ? geolcountry[i].value + ' ' : '') +
            (geolarea[i].value ? geolarea[i].value + ' ' : '') +
            geolname[i].value,
        });
      }
    }
    this.map22 = new google.maps.Map(document.getElementById('map22'), {
      zoom: 4,
      center: { lat: 25.04776, lng: 121.53185 },
      styles: map_style,
    });
    let map22 = this.map22;

    directionsDisplay.setMap(this.map22);
    var request = {
      origin:
        (country ? country + ' ' : '') + (area ? area + ' ' : '') + rdepart,
      destination:
        (country ? country + ' ' : '') + (area ? area + ' ' : '') + rarrive,
      waypoints: arr ? arr : null,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    };
    console.log(arr);
    console.log(request);
    directionsService.route(request, function(result, status) {
      if (status === 'OK') {
        // 回傳路線上每個步驟的細節
        //console.log(result.routes[0].legs[0].steps);
        document.querySelector('#r_map_info').value = JSON.stringify(
          result.geocoded_waypoints
        );
        //console.log(result);
        // console.log(result.geocoded_waypoints);
        directionsDisplay.setDirections(result);
        // let Line = new google.maps.Polyline({
        //   path: result.routes[0].overview_path,
        //   geodesic: true,
        //   strokeColor: "#F52A2A",
        //   strokeOpacity: 1.0,
        //   strokeWeight: 5
        // });

        // Line.setMap(map22);
      } else {
        console.log(result);
        console.log(status);
      }
    });
  };

  //   handleMapPreview = event => {
  //     console.log("yyy");
  //     console.log(event.target.value);
  //     //getcoordinates(event.target.value, "arrive_info");
  //   };

  render() {
    // let redirect=null;
    // if (this.props.a.appear) {
    //   setTimeout(() => this.props.alertDisappear(), 1400);
    // }
    return (
      <>
        {/* {this.props.l.success === true ? (
          <>
            <RAlert text="新增路線成功" type="success" />
    
          </>
        ) : this.props.l.success === false ? (
          <RAlert text={this.props.l.error} type="failure" />
        ) : (
          <div />
        )} */}
        <RAlert />
        <Container fluid className="p-0">
          <div style={{ height: '56px' }} />
          <Row className="justify-content-center my-3 my-xl-5 mx-0">
            <RoutePageHead function="AddNew" />
          </Row>
          <Row className="my-xl-5 m-0 justify-content-center">
            <Col sm={11} xl={10} className="d-flex flex-column">
              <FormHead text="新增路線" />
              <Row className="m-0">
                <Col sm={2} className="d-flex align-items-center">
                  <h3 className="r_fs_14 r_fw_bold"> 基本信息</h3>
                </Col>
                <Col>
                  <AddNewMainForm
                    handlegeolocation1={this.handlegeolocation1}
                    handlegeolocation2={this.handlegeolocation2}
                  />
                </Col>
              </Row>

              <Row className="m-0">
                <Col sm={2} />
                <Col>
                  <Row className="m-0 r_dotted_border mt-3 mt-md-5" />
                  <FormHead text="為路線新增地點" />
                </Col>
              </Row>
              <Row className="m-0 mt-3 mb-5">
                <Col
                  sm={2}
                  className="d-flex align-items-start flex-column justify-content-center"
                >
                  <h3 className="r_fs_14 m-0 r_fw_bold">地點信息</h3>
                </Col>
                <Col className="mt-5">
                  <AddNewLocationsContainer num={this.props.l.locationList} />
                </Col>
              </Row>
              <Row className="m-0 justify-content-end my-4 my-md-5">
                <Col sm={2} className="d-flex justify-content-end p-0">
                  <label> </label>
                </Col>
                <Col className="d-flex">
                  <button
                    className="btn location_btn m-0 w-50"
                    onClick={this.addNewLocation}
                  >
                    新增地點
                  </button>
                  <button
                    className="m-0 mappreview11 w-50 ml-5"
                    onClick={this.handleMapPreview}
                  >
                    預覽地圖
                  </button>
                </Col>
              </Row>
              <Row className="m-0 mt-xl-5 ">
                <small
                  className="form-text text-muted text-right m-0  justify-content-end"
                  style={{ height: '18px' }}
                >
                  地圖預覽並不支援所有國家敬請見諒
                </small>
              </Row>
              <Row
                id="mapdisplaycon"
                className="m-0 mb-xl-5"
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: '#ffffff',
                  display: 'none',
                }}
              >
                <div id="map22" className="w-100 h-100" />
                {/* <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyCNjMMcvnKTcRCOJvpxFe6xgqytgjl0tBI"
                  }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  /> */}
                {/* </GoogleMapReact> */}
              </Row>

              <Row className="m-0 justify-content-center ">
                <Col sm={2} className="d-flex justify-content-end p-0">
                  <label> </label>
                </Col>
                <button
                  className="m-3 py-1 addnewsubmitbtn "
                  onClick={this.addNewSubmit}
                >
                  提交
                </button>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  l: state.routeAddNewLocation,
  a: state.alertReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleAddNewLocation,
      handleAddNewSubmit,
      addNewReset,
      alertDisappear,
      alertAppear,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RouteAddNew));
