import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RoutePageHead from '../components/RoutePageHead/RoutePageHead';
import DetailPageMainCard from '../components/DetailPageMainCard/DetailPageMainCard';
import DetailPageLocation from '../components/DetailPageLocations/DetailPageLocations';
import DetailPageIntro from '../components/DetailPageIntro/DetailPageIntro';
import DetailPageComment from '../components/DetailPageComment/DetailPageComment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSingleAsync,
  handlelikeAsync,
  addToLikeSuccess,
  addToChallengeSuccess,
} from '../actions';
import { withRouter } from 'react-router-dom';
import RAlert from '../components/R_Alert/R_Alert';
import map_style from '../data/google_map_style.json';
const google = window.google;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this.map11 = null;
  }

  componentDidMount() {
    this.count = 0;
    this.props.fetchSingleAsync(this.props.match.params.id);

    let r_Collection = new FormData();
    let arr = [];
    let arr2 = [];

    fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(obj => {
        if (obj.isLogined) {
          this.setState({
            user_id: obj.user_id,
          });
          console.log('yayyyy1');
          r_Collection.append('m_sid', obj.user_id);
        }
        if (!obj.user_id) {
          throw new Error('not Logged in');
        }
        return obj.user_id;
      })
      .then(r =>
        fetch('http://18.139.60.49:5000/routeCollect', {
          method: 'post',
          body: r_Collection,
        })
          .then(res => res.json())
          .then(obj => {
            arr = JSON.parse(obj[0]['r_collection']);
            console.log(arr);
            arr2 = JSON.parse(obj[0]['r_challengeSuccess']);
            this.setState({
              r_collection: arr,
              r_challengeSuccess: arr2,
            });
            this.props.addToLikeSuccess(arr);
            this.props.addToChallengeSuccess(arr2);
          })
      )
      .catch(e => console.log(e));
  }
  componentDidUpdate() {
    if (this.props.r.data.main && this.map11) {
      console.log(this.props.r.data.main[0].r_country);
      let country = this.props.r.data.main[0].r_country;
      let area = this.props.r.data.main[0].r_area;
      let rdepart = this.props.r.data.main[0].r_depart;
      let rarrive = this.props.r.data.main[0].r_arrive;
      console.log(country);
      console.log(area);
      if (!rdepart || !rarrive) {
        alert('no information');
      }
      let lnum = this.props.r.data.location.length;
      console.log(lnum);
      let arr3 = [];
      if (lnum > 0) {
        for (let i = 0; i < lnum; i++) {
          arr3.push({
            location:
              (this.props.r.data.location[i].l_country
                ? this.props.r.data.location[i].l_country + ' '
                : '') +
              (this.props.r.data.location[i].l_area
                ? this.props.r.data.location[i].l_area + ' '
                : '') +
              this.props.r.data.location[i].l_name,
          });
        }
      }

      let map11 = new google.maps.Map(document.getElementById('map11'), {
        zoom: 4,
        center: { lat: 25.04776, lng: 121.53185 },
        styles: map_style,
      });

      directionsDisplay.setMap(map11);
      var request = {
        origin:
          (country ? country + ' ' : '') + (area ? area + ' ' : '') + rdepart,
        destination:
          (country ? country + ' ' : '') + (area ? area + ' ' : '') + rarrive,
        waypoints: arr3 ? arr3 : null,
        travelMode: 'DRIVING',
        optimizeWaypoints: true,
      };
      directionsService.route(request, function(result, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(result);
        } else {
          console.log(status);
        }
        //this.setState({ isLoaded: true });
      });
    }
  }
  render() {
    this.count++;
    console.log(this.count);
    if (this.props.r.data.main) {
      let rsid = this.props.r.data.main[0].r_sid;
      let heartRed = false;
      if (this.props.h.liked) {
        this.props.h.liked.forEach(function(el) {
          if (el === rsid) {
            heartRed = true;
          }
        });
      }
      let challengeSuccess = false;
      if (this.props.h.challengeSuccess) {
        this.props.h.challengeSuccess.forEach(function(el) {
          if (el === rsid) {
            challengeSuccess = true;
          }
        });
      }

      return (
        <>
          {/* {this.props.a.appear ? (
            <RAlert text={"" + this.props.a.success.slice(6)} type="failure" />
          ) : (
            <div />
          )} */}
          <RAlert />
          <Container fluid className="p-0">
            <div style={{ height: '56px' }} />
            <Row className="d-flex justify-content-center my-3 my-xl-5 mx-0">
              <RoutePageHead
                data={this.props.r.data.main[0]}
                function="Details"
              />
            </Row>

            <DetailPageMainCard
              className="my-xl-5"
              data={this.props.r.data.main[0]}
              heartRed={heartRed ? true : false}
              challengeSuccess={challengeSuccess ? true : false}
            />
            <DetailPageIntro
              className="my-xl-5"
              data={this.props.r.data.main[0].r_intro}
            />

            <Row
              className="m-0 my-xl-5"
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#ccc',
              }}
            >
              <div
                id="map11"
                className="h-100 w-100"
                ref={el => (this.map11 = el)}
              />
            </Row>

            <DetailPageLocation
              className="my-5"
              data={this.props.r.data.location}
              place1={this.props.r.data.main[0].r_depart}
              place2={this.props.r.data.main[0].r_arrive}
            />
            <DetailPageComment
              className="mt-0 mb-5"
              data={this.props.r.data.comment}
              rsid={this.props.r.data.main[0].r_sid}
            />
          </Container>
        </>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = store => ({
  r: store.routeSingleReducer,
  a: store.alertReducer,
  h: store.likeRouteReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSingleAsync,
      handlelikeAsync,
      addToLikeSuccess,
      addToChallengeSuccess,
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteDetail)
);
