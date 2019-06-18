import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReturnBtn from '../ReturnBtn/ReturnBtn';
import './RoutePageHead_style.css';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchPostsAsync,
  handlecurrentPage,
  fetchPopularPostsAsync,
} from '../../actions';

class RoutePageHead extends Component {
  state = {};
  handlePageChange = page => async () => {
    await this.props.handlecurrentPage(page);
    switch (this.props.r.currentState) {
      case 'popular':
        this.props.fetchPopularPostsAsync(0);
        this.props.history.push('/route');
        break;
      default:
        this.props.fetchPostsAsync(0);
        return this.props.history.push('/route');
    }
  };
  render() {
    switch (this.props.function) {
      case 'Details':
        // console.log('Details');
        return (
          <Col xs={9}>
            <Row className="d-flex justify-content-between mb-2 mb-xl-5">
              <ReturnBtn />
              <div>
                <span
                  className=" mx-3 r_infocard_list"
                  onClick={this.handlePageChange('newest')}
                >
                  最新路線
                </span>
                <span
                  className="ml-3 r_infocard_list"
                  onClick={this.handlePageChange('popular')}
                >
                  熱門路線
                </span>
              </div>
            </Row>
            <Row>
              <Col className="d-flex justify-content-start align-items-center px-0 pb-2 pt-4 pb-md-3 flex-row-reverse flex-md-row">
                <div className="d-flex flex-row-reverse flex-md-row">
                  <div className="r_d_avatar_con">
                    <img src={this.props.data.m_photo} alt="author's avatar" />
                  </div>
                  <div className="r_d_avatar_name r_fw_bold mx-3">
                    {this.props.data.m_name}
                  </div>
                </div>

                <div className="ml-3 ml-sm-5 text-right text-md-left mr-3 mr-md-0 r_d_l_576_d-none">
                  <div className="r_fs_12">發布時間</div>
                  <div className="r_fs_12">
                    {new Date(this.props.data.r_time_added)
                      .toLocaleString()
                      .slice(0, -3)}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        );
      default:
        return (
          <Col xs={9}>
            <Row className="d-flex justify-content-between mb-2 mb-xl-5">
              <ReturnBtn />
              <div>
                <span
                  className=" mx-3 r_infocard_list"
                  onClick={this.handlePageChange('newest')}
                >
                  最新路線
                </span>
                <span
                  className="ml-3 r_infocard_list"
                  onClick={this.handlePageChange('popular')}
                >
                  熱門路線
                </span>
              </div>
            </Row>
          </Col>
        );
    }
  }
}

const mapStateToProps = store => ({ r: store.routeReducer });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPostsAsync,
      handlecurrentPage,
      fetchPopularPostsAsync,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RoutePageHead));
