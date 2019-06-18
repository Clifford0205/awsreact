import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DetailPageMainCard_style.css';
import Card from 'react-bootstrap/Card';
import {
  BackItButton,
  LikeItButton,
  SNSButtons,
} from '../DetailPageBtn/DetailPageBtn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handlelikeAsync,
  addToLikeSuccess,
  handleChallengeSuccessAsync,
  alertAppear,
} from '../../actions';
function controlchallengenum(instruction, rsid) {
  console.log('working...');
  fetch(
    'http://18.139.60.49:5000/route/challenge/num/' + instruction + '/' + rsid,
    {
      method: 'GET',
    }
  );
}
function controlcollectnum(instruction, rsid) {
  fetch(
    'http://18.139.60.49:5000/route/collection/num/' + instruction + '/' + rsid,
    {
      method: 'GET',
    }
  );
}

class DetailMainCard extends Component {
  handlelike = async () => {
    console.log('click');
    const response = await fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const jsonObject = await response.json();
    if (!jsonObject.user_id) {
      //alert("收藏路線前請先登入");
      this.props.alertAppear(false, '收藏路線前請先登入');
      return;
    } else {
      this.setState({ user_id: jsonObject.user_id });
    }
    let arr = this.props.h.liked;
    let rsid = this.props.data.r_sid;
    let newlike = 0;
    if (arr) {
      arr.forEach(function(el) {
        if (el === rsid) {
          newlike = rsid;
        }
        console.log('newLike' + newlike);
      });

      if (newlike !== 0) {
        console.log('no');
        arr.splice(arr.indexOf(newlike), 1);
        controlcollectnum(0, rsid);
      } else {
        console.log('yes');
        arr.push(this.props.data.r_sid);
        controlcollectnum(1, rsid);
      }
    } else {
      arr = [this.props.data.r_sid];
    }

    console.log(arr);
    this.props.handlelikeAsync(this.state.user_id, arr);
  };
  handleChallengeSuccess = async () => {
    console.log('challenge');
    const response = await fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const jsonObject = await response.json();
    if (!jsonObject.user_id) {
      //alert("挑戰路線前請先登入");
      this.props.alertAppear(false, '挑戰路線前請先登入');
      return;
    } else {
      this.setState({ user_id: jsonObject.user_id });
    }
    let arr = this.props.h.challengeSuccess;
    let rsid = this.props.data.r_sid;
    let newlike = 0;
    if (arr) {
      arr.forEach(function(el) {
        if (el === rsid) {
          newlike = rsid;
        }
        console.log('newLike' + newlike);
      });

      if (newlike !== 0) {
        console.log('no');
        arr.splice(arr.indexOf(newlike), 1);
        controlchallengenum(0, rsid);
      } else {
        console.log('yes');
        arr.push(this.props.data.r_sid);
        controlchallengenum(1, rsid);
      }
    } else {
      arr = [this.props.data.r_sid];
    }

    console.log(arr);
    this.props.handleChallengeSuccessAsync(this.state.user_id, arr);
  };
  render() {
    //console.log(this.props.heartRed);
    return (
      <>
        <div
          className="mb-lg-3 d-flex r_d_maincard"
          style={{ background: '#FCFCFC' }}
        >
          <div className="r_bannerLabel" />
          <Row className="w-100 m-0 r_d_rwd_con">
            <Col className="p-0 h-100 mr-md-3 mr-lg-5 r_d_rwd_con3">
              <div
                className="mr-lg-5 r_d_mainimg_con w-100 h-100"
                style={{
                  backgroundImage:
                    'url(' +
                    (this.props.data.r_img
                      ? this.props.data.r_img
                      : 'https://loremflickr.com/320/240') +
                    ')',
                }}
              />
            </Col>

            <Col md={7} className="r_d_rwd_con2">
              <Card.Body className="h-100 p-3 p-md-4 p-xl-5 mr-xl-5 d-flex flex-column">
                <Row className="flex-column">
                  <Col className="r_d_Title">{this.props.data.r_name}</Col>
                  <Col className="r_d_Title2 mb-4">
                    <span>{this.props.data.r_country}</span>
                    <span className="ml-4">{this.props.data.r_area}</span>
                  </Col>
                </Row>
                <div className="r_d_rwd_con4">
                  <Row>
                    <Col>
                      <p className="m-0">
                        經過{this.props.data.r_l_num}
                        個地點
                      </p>
                      <p className="m-0">預計{this.props.data.r_time}</p>
                    </Col>
                  </Row>
                  <Row className="mx-0 my-2 mb-xl-3">
                    <div className="r_fw_bold">
                      <p className="m-0">出發地</p>
                      <p className="m-0">目的地</p>
                    </div>
                    <Col className="ml-3">
                      <p className="m-0">{this.props.data.r_depart}</p>
                      <p className="m-0">{this.props.data.r_arrive}</p>
                    </Col>
                  </Row>
                </div>

                <Row>
                  <Col sm={6}>
                    <SNSButtons />
                  </Col>
                </Row>

                <Row className="my-2 mb-xl-3">
                  <Col>
                    <BackItButton
                      r_sid={this.props.data.r_sid}
                      challengeSuccess={this.props.challengeSuccess}
                      onClick={this.handleChallengeSuccess}
                    />
                    <LikeItButton
                      heartRed={this.props.heartRed}
                      r_sid={this.props.data.r_sid}
                      onClick={this.handlelike}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  h: store.likeRouteReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlelikeAsync,
      addToLikeSuccess,
      handleChallengeSuccessAsync,
      alertAppear,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMainCard);
