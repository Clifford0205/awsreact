import React, { Component } from 'react';
import './InfoCard_style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faHeart,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handlelikeAsync,
  alertAppear,
  handlechangeheartnumber,
} from '../../actions';
import RAlert from '../R_Alert/R_Alert';

class InfoCard extends Component {
  state = {};
  componentDidMount() {}
  controlcollectnum = (instruction, rsid) => {
    fetch(
      'http://18.139.60.49:5000/route/collection/num/' + instruction + '/' + rsid,
      {
        method: 'GET',
      }
    ).then(r => {
      fetch('http://18.139.60.49:5000/routecollectionnum/' + rsid, {
        method: 'get',
      })
        .then(res => res.json())
        .then(r => {
          this.props.handlechangeheartnumber(rsid, r);
          console.log('!!!!!!!!!!!!!!!!!!!');
          console.log(r);
        });
    });
  };
  handlelike = async () => {
    const response = await fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const jsonObject = await response.json();
    // if (jsonObject.isLogined) {
    //   this.setState({
    //     user_id: jsonObject.user_id
    //   });
    // }
    if (!jsonObject.user_id) {
      //alert("收藏路線前請先登入");
      this.props.alertAppear(false, '收藏路線前請先登入');
      return;
    }
    let arr = this.props.h.liked;
    let rsid = this.props.data.r_sid;
    //console.log(arr);
    //console.log(rsid);
    if (arr) {
      let newlike = 0;
      arr.forEach(function(el) {
        if (el === rsid) {
          newlike = rsid;
        }
        console.log('newLike' + newlike);
      });

      if (newlike !== 0) {
        console.log('no');
        arr.splice(arr.indexOf(newlike), 1);
        this.controlcollectnum(0, rsid);
      } else {
        console.log('yes');
        arr.push(this.props.data.r_sid);
        this.controlcollectnum(1, rsid);
      }
    } else {
      arr = [this.props.data.r_sid];
    }

    console.log(arr);
    this.props.handlelikeAsync(this.props.user_id, arr);
  };
  render() {
    let rsid = this.props.data.r_sid;
    let heartRed = false;
    if (this.props.h.liked) {
      this.props.h.liked.forEach(function(el) {
        if (el === rsid) {
          heartRed = true;
        }
      });
    }
    return (
      <>
        <Row className="justify-content-between w-100 r_card_con m-0 my-2 my-md-3 flex-nowrap">
          <Col className="r_list_img_con p-0 position-relative col-3">
            <div className="like_wrap  position-absolute">
              <FontAwesomeIcon
                className={
                  'font-awesome r_heart ' + (heartRed ? '  r_heart_red' : '')
                }
                icon={faHeart}
                onClick={this.handlelike}
              />
              <p className={'collect_num' + (heartRed ? '  r_heart_red' : '')}>
                {this.props.data.r_collect_num}
              </p>
            </div>

            {/* ---------------NEED TO CHANGE THIS------------------------------------- */}
            <img
              // src={
              //     this.props.data.r_img
              //         ? 'http://18.139.60.49:5000/r_upload_img/' +
              //           this.props.data.r_img
              //         : 'https://loremflickr.com/320/240'
              // }
              src={
                this.props.data.r_img
                  ? this.props.data.r_img
                  : 'https://loremflickr.com/320/240'
              }
              alt="route img"
            />
          </Col>

          <Col xs={2} className="d-flex align-items-end r_list_700_dnone my-3">
            <div className="h-100 d-flex flex-column align-items-end justify-content-between mr-3 m_w_79">
              <p className="m-0 r_fw_medium text-right r_card_ellipsis  m_w_79">
                {this.props.data.r_depart}
              </p>
              <p className="m-0 text-right r_fw_medium">
                <span className="r_color_red r_fw_bold">
                  經過{this.props.data.r_l_num}個地點
                </span>
                <br />
                預計{this.props.data.r_time}
              </p>
              <p className="m-0 r_fw_medium text-right r_card_ellipsis  m_w_79">
                {this.props.data.r_arrive}
              </p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between h-100">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="r_list_circle" />
                <div className="r_list_arrow_stick" />
                <FontAwesomeIcon
                  className="font-awesome r_sort_down"
                  icon={faSortDown}
                />
              </div>
              <div className="r_list_circle" />
            </div>
          </Col>

          <Col className="d-flex my-2 my-sm-3 flex-column justify-content-between r_list_main_con">
            <div className="r_list_rwd_main-con">
              <Row className="justify-content-between m-0 align-items-start">
                <Col md={10} className="d-flex pl-0">
                  <Row className="m-0 w-100 flex-nowrap">
                    <Col xs={9} className="p-0 w-100">
                      <h3 className="r_fw_bold r_fs_18 r_card_title ">
                        {this.props.data.r_name}
                      </h3>
                      <div className="d-flex mt-md-2 r_fw_bold">
                        <div>{this.props.data.r_country}</div>
                        <div className="r_spaceholder" />
                        <div>{this.props.data.r_area}</div>
                      </div>
                    </Col>
                    <Col xs={3} className=" pr-0">
                      <div className="r_list_tag r_fw_extra_bold px-2 m-1">
                        {this.props.data.r_tag}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={2}
                  className="d-flex flex-column align-items-center r_list_800_dnone pl-3 flex-grow-0 pr-0"
                >
                  <div className="r_list_avatar_con">
                    <img src={this.props.data.m_photo} alt="author's avatar" />
                  </div>

                  <div className="center r_fw_bold ">
                    {this.props.data.m_name}
                  </div>
                </Col>
              </Row>

              <div className="r_list_dnone d-flex align-items-end justify-content-between w-100 mt-3">
                <Col className="d-flex justify-conten-between col-10 p-0">
                  <div className="d-flex col-12 col-sm-6 p-0">
                    <div className="d-flex align-items-center pr-3">
                      <strong>到</strong>
                    </div>
                    <div className="m_w_128 r_card_ellipsis">
                      {this.props.data.r_depart}
                      <br />
                      {this.props.data.r_arrive}
                    </div>
                  </div>

                  <div className="d-flex flex-column col-6 p-0 r_list-600_dnone">
                    <span>預計{this.props.data.r_time}</span>
                    <span>經過{this.props.data.r_l_num}個地點</span>
                  </div>
                </Col>
                <Link className="mr-1" to={`/route/${this.props.data.r_sid}`}>
                  <span>
                    {' '}
                    <FontAwesomeIcon
                      className="font-awesome r_arrow_right "
                      icon={faArrowRight}
                    />
                  </span>
                </Link>
              </div>

              <Row className="my-2 mt-2 mt-md-2 r_list_700_dnone m-0 r_list_intro">
                <Col sm={9} className="p-0 m_h_84">
                  {this.props.data.r_intro}
                </Col>
              </Row>
            </div>

            <Row className="d-flex justify-content-between r_list_700_dnone m-0">
              <Link
                className="r_list_700_dnone"
                to={`/route/${this.props.data.r_sid}`}
              >
                <span className="r_color_red r_fw_bold ">查看路線</span>
              </Link>
              <div className="r_fs_12">
                {new Date(this.props.data.r_time_added).toLocaleString()}
              </div>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = store => ({
  h: store.likeRouteReducer,
  a: store.alertReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { handlelikeAsync, alertAppear, handlechangeheartnumber },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoCard);
