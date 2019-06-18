import React from 'react';
// import { data } from '../data/data';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
// import PathNow from '../component/PathNow';
import Sidebar from '../component/Sidebar';
import DetailNav from '../component/DetailNav';
import './road.scss';
import checkUserState from '../util/check';

var getWindowOptions = function() {
  var width = 500;
  var height = 450;
  var left = window.innerWidth / 2 - width / 2;
  var top = window.innerHeight / 2 - height / 2;

  return [
    'resizable,scrollbars,status',
    'height=' + height,
    'width=' + width,
    'left=' + left,
    'top=' + top,
  ].join();
};

class road extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NavTitle1: '我收藏的路線',
      NavTitle2: '我發起的路線',
      // NavTitle3: '我騎過的路線',
      nowPage: false,
      dpType: 'none',
      id: '',
      loginUser: '',
      isLogined: '',
      user_id: '',
      myCollect: [],
      col_routeData: [],
      rise_routeData: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // window.twttr.widgets.load();
    if (this.state.col_routeData.length > 0) {
      var fbBtn = document.querySelectorAll('.facebook-share');
      console.log(fbBtn);
      var title = encodeURIComponent(
        'Hey everyone, come & see how good I look!'
      );
      var shareUrl =
        'https://www.facebook.com/sharer/sharer.php?u=' +
        window.location.href +
        '&title=' +
        title;
      fbBtn.href = shareUrl;

      fbBtn.forEach(btn =>
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
          win.opener = null;
        })
      );
    }
  }

  async componentDidMount() {
    const jsonObject = await checkUserState();
    console.log('jsonObject', jsonObject);
    // p.then(jsonObject => {
    //   console.log('2', jsonObject);
    await this.setState({
      loginUser: jsonObject.loginUser,
      isLogined: jsonObject.isLogined,
      user_id: jsonObject.user_id,
    });
    await this.memberDataFetch();
    await this.getRaise();
  }

  //載入會員資料
  memberDataFetch = async () => {
    try {
      let id = this.props.match.params.id;
      let user_id = this.state.user_id;
      console.log(id);
      console.log(user_id);
      this.setState({ id: id });
      const response = await fetch(
        `http://18.139.60.49:5000/member/${user_id ? user_id : id}`,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      );

      // if (!response.ok) throw new Error(response.statusText);

      const jsonObject = await response.json();

      console.log(jsonObject);
      console.log('hhhhhhhhh', jsonObject[0].r_collection);
      console.log(JSON.parse(jsonObject[0].r_collection));
      await this.setState({
        myMemberData: jsonObject,
        m_photo: jsonObject[0].m_photo,
        m_name: jsonObject[0].m_name,
        old_password: jsonObject[0].m_password,
        myCollect: JSON.parse(jsonObject[0].r_collection),
      });
      if (jsonObject[0].r_collection !== null) {
        console.log(jsonObject[0].r_collection);
        if (JSON.parse(jsonObject[0].r_collection).length > 0) {
          //拿到收藏的產品資訊
          console.log(JSON.parse(jsonObject[0].r_collection).length);
          console.log(this.state.myCollect);
          this.getRoute();
        }
      } else {
        this.setState({ myCollect: [] });
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  //拿到SQL收藏的產品
  getRoute = async () => {
    var sendObj = {
      arr: this.state.myCollect,
    };
    const rescourse = await fetch(`http://18.139.60.49:5000/myrouter`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(sendObj),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const routeObj = await rescourse.json();
    console.log(routeObj);
    await this.setState({ col_routeData: routeObj }, () =>
      console.log(this.state.col_routeData)
    );

    console.log(routeObj);
  };

  handleTitleClick = e => {
    this.setState({ nowPage: true });
    console.log(e.target.id);
    console.log(e.target.className);
    let Allbox = document.querySelectorAll('.Allbox');
    let AllItem = document.querySelectorAll('.nav-link');
    for (var i = 0; i < Allbox.length; i++) {
      Allbox[i].classList.remove('show');
    }
    for (var i = 0; i < AllItem.length; i++) {
      AllItem[i].classList.remove('active');
    }
    document.querySelector(`.${e.target.id}`).classList.add('show');
    document.querySelector(`#${e.target.id}`).classList.add('active');
    // e.target.classList.add('show');
  };

  //刪除收藏還要更新SQL
  handleCancel = id => () => {
    console.log(this.state.myCollect);
    console.log(id);
    const newData = this.state.myCollect.filter((item, index) => item !== id);
    console.log(newData);
    this.setState({ myCollect: newData }, () =>
      console.log(this.state.myCollect)
    );

    var sendObj = {
      sid: newData,
      user_id: this.state.user_id,
    };

    console.log(sendObj);

    fetch(`http://18.139.60.49:5000/c_route`, {
      credentials: 'include',
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(sendObj), // data can be `string` or {object}!
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(obj => {
        console.log(obj);
        this.getRoute();
      })

      // .then(this.setState({myCollect:newData}))
      .catch(error => console.error('Error:', error));
  };

  //拿到SLQ發起的路線
  getRaise = async () => {
    let id = this.props.match.params.id;
    let user_id = this.state.user_id;
    const response = await fetch(
      `http://18.139.60.49:5000/routeRaise/${user_id ? user_id : id}`,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    );

    // if (!response.ok) throw new Error(response.statusText);

    const jsonObject = await response.json();
    console.log(jsonObject);

    await this.setState({ rise_routeData: jsonObject });
  };

  //刪除收藏的路線
  riseCancel = id => () => {
    console.log(id);
    for (let s in this.state.rise_routeData) {
      console.log(this.state.rise_routeData[s].r_sid);

      if (this.state.rise_routeData[s].r_sid == id) {
        console.log('刪除');
        var sendObj = {
          id: id,
        };
        fetch(`http://18.139.60.49:5000/routeDelete`, {
          credentials: 'include',
          method: 'POST', // or 'PUT'
          body: JSON.stringify(sendObj), // data can be `string` or {object}!
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(obj => {
            console.log(obj);
            this.getRaise();
          })

          // .then(this.setState({myCollect:newData}))
          .catch(error => console.error('Error:', error));
      }
    }
  };

  render() {
    let data = [];
    if (this.state.col_routeData) {
      data = this.state.col_routeData;
    }

    let r_data = [];
    if (this.state.rise_routeData) {
      r_data = this.state.rise_routeData;
    }

    if (
      (this.state.id != this.state.user_id &&
        this.state.id &&
        this.state.user_id) ||
      this.state.user_id == undefined
    ) {
      return <Redirect to="/" />;
      // alert(this.state.id + ' ' + this.state.user_id);
    } else {
      return (
        <>
          <Container className="member_road">
            <Row>
              <Sidebar
                src={this.state.m_photo}
                name={this.state.m_name}
                myId={this.state.id}
              />

              <Col className="detailArea">
                <DetailNav
                  title1={this.state.NavTitle1}
                  title2={this.state.NavTitle2}
                  title3={this.state.NavTitle3}
                  title4={this.state.NavTitle4}
                  handleTitleClick={this.handleTitleClick}
                />

                <div className="box1 Allbox show">
                  {data.map((item, index) => (
                    <div
                      className="card mb-3"
                      style={{ maxWidth: '850px' }}
                      key={item.c_sid}
                    >
                      <div className="row no-gutters align-items-center">
                        <div className="col-md-6">
                          <img
                            src={item.r_img}
                            className="card-img"
                            alt="..."
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="d-flex">
                              <div className="titlename flex-grow-1">
                                <p className="card-title">{item.r_name}</p>
                                <p className="card-text">
                                  <small className="text-muted">
                                    類型:{item.r_tag} 發布時間:
                                    {item.r_time_added}
                                  </small>
                                </p>
                              </div>
                              <Button
                                className="cancel ml-auto "
                                variant="danger"
                                onClick={this.handleCancel(item.r_sid)}
                              >
                                取消追蹤
                              </Button>
                            </div>
                            <p className="card-text2 ">
                              <div> 國家:{item.r_country}</div>
                              <div> 地區:{item.r_area}</div>
                              <div> 出發地點:{item.r_depart}</div>
                              <div> 抵達地點:{item.r_arrive}</div>
                              <div className="describe">
                                {' '}
                                路線描述:{item.r_intro}
                              </div>
                            </p>

                            {/* <div className="d-flex">
                              <p>價格:{item.p_price}</p>
                              <h5 className="ml-auto">{item.c_level}</h5>
                            </div> */}

                            <div className="d-flex">
                              <div>
                                <a
                                  style={{ fontSize: '1rem', color: 'black' }}
                                  href={`https://twitter.com/intent/tweet?url=${
                                    window.location.href
                                  }&text="bike news!"`}
                                >
                                  <i className="fab fa-twitter" />
                                </a>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  style={{ fontSize: '1rem', color: 'black' }}
                                  className="facebook-share"
                                >
                                  <i className="fab fa-facebook-f" />
                                </a>
                              </div>
                              {/* <a href="javascript:;">
                                <i className="fab fa-facebook" />
                              </a>
                              <a href="javascript:;">
                                <i className="fab fa-instagram" />
                              </a> */}
                              <h5 className="price">騎乘時間:{item.r_time}</h5>
                              <Link
                                class="btn btn-dark ml-auto"
                                to={`/route/${item.r_sid}`}
                              >
                                查看路線資訊
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="box2 Allbox">
                  {r_data.map((item, index) => (
                    <div
                      className="card mb-3"
                      style={{ maxWidth: '850px' }}
                      key={item.c_sid}
                    >
                      <div className="row no-gutters">
                        <div className="col-md-6">
                          <img
                            src={item.r_img}
                            className="card-img"
                            alt="..."
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="d-flex">
                              <div className="titlename flex-grow-1">
                                <p className="card-title">{item.r_name}</p>
                                <p className="card-text">
                                  <small className="text-muted">
                                    類型:{item.r_tag} 發布時間:
                                    {item.r_time_added}
                                  </small>
                                </p>
                              </div>
                              <Button
                                className="cancel ml-auto "
                                variant="danger"
                                onClick={this.riseCancel(item.r_sid)}
                              >
                                刪除發起
                              </Button>
                            </div>
                            <p className="card-text2 ">
                              <div> 國家:{item.r_country}</div>
                              <div> 地區:{item.r_area}</div>
                              <div> 出發地點:{item.r_depart}</div>
                              <div> 抵達地點:{item.r_arrive}</div>
                              <div className="describe">
                                {' '}
                                路線描述:{item.r_intro}
                              </div>
                            </p>

                            {/* <div className="d-flex">
                              <p>價格:{item.p_price}</p>
                              <h5 className="ml-auto">{item.c_level}</h5>
                            </div> */}

                            <div className="d-flex">
                              <div>
                                <a
                                  style={{ fontSize: '1rem', color: 'black' }}
                                  href={`https://twitter.com/intent/tweet?url=${
                                    window.location.href
                                  }&text="bike news!"`}
                                >
                                  <i className="fab fa-twitter" />
                                </a>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  style={{ fontSize: '1rem', color: 'black' }}
                                  className="facebook-share"
                                >
                                  <i className="fab fa-facebook-f" />
                                </a>
                              </div>
                              {/* <a href="javascript:;">
                                <i className="fab fa-facebook" />
                              </a>
                              <a href="javascript:;">
                                <i className="fab fa-instagram" />
                              </a> */}
                              <h5 className="price">騎乘時間:{item.r_time}</h5>
                              <Link
                                class="btn btn-dark ml-auto"
                                to={`/route/${item.r_sid}`}
                              >
                                查看路線資訊
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="box3 Allbox">目前尚無資料</div> */}
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default withRouter(road);
