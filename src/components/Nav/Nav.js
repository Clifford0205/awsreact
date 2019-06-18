import React from 'react';
import Logo from '../Logo/Logo';
import classes from './Nav.module.css';
import './Nav.module.css';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import InstallModal from './InstallModal';
import { Row, Dropdown, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';
import './myMember-App.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  clearPostsBefore,
  handleclearlikestate,
} from '../../containers/Route/actions';

class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showNav: true,
      loginUser: '',
      isLogined: '',
      user_id: '',
      session_name: '',
      session_photo: '',
      showModalIns: false,
    };

    this.observer = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // console.log('ROUTE CHANGED');
    this.checkUserState();
  }

  menuHandler = () => {
    if (window.innerWidth <= 992) {
      this.setState((prevState, prevProp) => ({
        showMenu: !prevState.showMenu,
      }));
    }
  };
  saveLoginData = obj => {
    this.setState(obj);
  };

  // 開啟登入視窗
  handleAddModalShowLog = () => {
    this.setState({
      showModalLogin: true,
    });
  };

  // 關閉登入視窗
  handleModalCloseLogin = () => {
    this.setState({ showModalLogin: false });
  };

  // 開啟註冊視窗
  handleAddModalShowIns = () => {
    this.setState({
      showModalIns: true,
    });
  };

  // 關閉註冊視窗
  handleModalCloseIns = () => {
    this.setState({ showModalIns: false });
  };

  async componentDidMount() {
    // window.addEventListener("resize", () => {
    //   if (window.innerWidth > 992 && this.state.showMenu) {
    //     this.setState({ showMenu: false });
    //   }
    // });

    //查看是否登入
    this.checkUserState();
  }

  // 元件 "即將" 卸載出網頁
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  checkUserState = async () => {
    try {
      const response = await fetch('http://18.139.60.49:5000/is_logined', {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });

      // if (!response.ok) throw new Error(response.statusText);

      const jsonObject = await response.json();

      // console.log('Nav', jsonObject);
      await this.setState({
        loginUser: jsonObject.loginUser,
        isLogined: jsonObject.isLogined,
        user_id: jsonObject.user_id,
        session_name: jsonObject.session_name,
        session_photo: jsonObject.session_photo,
      });
    } catch (e) {
      // console.log(e);
    } finally {
    }
  };

  //登出
  logOut = async () => {
    try {
      const response = await fetch('http://18.139.60.49:5000/logout', {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }).then(localStorage.removeItem('meber'));
      const jsonObject = await response.json();
      // console.log(jsonObject);
      await this.setState({
        loginUser: jsonObject.loginUser,
        isLogined: jsonObject.isLogined,
        user_id: jsonObject.user_id,
      });
      await this.props.handleclearlikestate();
      await this.props.clearPostsBefore();
      // document.location.href = '/';
      this.props.history.push('/');
    } catch (e) {
      // console.log(e);
    }
  };

  render() {
    let location = this.props.history.location.pathname;
    // console.log(location);
    const style = {
      background: `linear-gradient(
      45deg,
      rgb(255, 255, 255, 0.2),
      rgb(255, 6, 0, 0.9),
      rgb(255, 255, 255, 0.2)
    )`,
      opacity: '0.7',
      width: '100%',
    };
    let navClass = [classes.Background];
    if (!this.state.showNav) {
      navClass = [classes.Background, classes.Close];
    }

    let menuClass = [classes.Nav];
    let activeStyle = {
      color: 'white',
      fontSize: '1.2rem',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    };
    if (this.state.showMenu) {
      menuClass = [classes.Nav, classes.Open];
      activeStyle = { color: 'white', fontSize: '2.5rem' };
    }
    return (
      <nav className={classes.Navbar}>
        <div className={navClass.join(' ')} ref={el => (this.nav = el)}>
          <Logo />

          <div className={classes.Menu} onClick={this.menuHandler}>
            <div />
            <div />
            <div />
          </div>
          <ul className={menuClass.join(' ')}>
            <Container fluid={true} className="text-nowrap">
              <Row className="justify-content-end" style={{ margin: 0 }}>
                <Col lg={2} className="nav_m_w_80">
                  <li className="m-0">
                    <NavLink
                      to="/route"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      騎車路線
                    </NavLink>
                  </li>
                </Col>

                <Col lg={2} className="nav_m_w_80">
                  <li className="text-nowrap m-0">
                    <NavLink
                      to="/course"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      課程專區
                    </NavLink>
                  </li>
                </Col>
                <Col lg={2} className="nav_m_w_80">
                  <li className="text-nowrap m-0">
                    <NavLink
                      to="/news"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      文章專區
                    </NavLink>
                  </li>
                </Col>
                <Col lg={2} className="nav_m_w_80">
                  <li className="text-nowrap m-0">
                    <NavLink
                      to="/products"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      商品頁面
                    </NavLink>
                  </li>
                </Col>
              </Row>
            </Container>
          </ul>
        </div>
        <div className="myMember-App ml-auto">
          <InstallModal
            show={this.state.showModalIns}
            close={this.handleModalCloseIns}
          />
          <Navbar bg="light" expand="lg" className="w-100">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Form inline className="w-100 h-100">
                <NavLink
                  to="/Login"
                  className={
                    this.state.user_id == '' || this.state.user_id == undefined
                      ? 'd-block'
                      : 'd-none'
                  }
                >
                  登入
                </NavLink>
                <Button
                  variant=" ml-auto"
                  onClick={this.handleAddModalShowIns}
                  className={
                    this.state.user_id == '' || this.state.user_id == undefined
                      ? 'd-block'
                      : 'd-none'
                  }
                >
                  註冊
                </Button>

                <Dropdown
                  className={
                    this.state.user_id == '' || this.state.user_id == undefined
                      ? 'd-none'
                      : 'd-block'
                  }
                >
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-basic"
                    className="d-flex personal-btn h-100 align-items-center"
                  >
                    <div className="flex-grow-1">
                      <div className="littlePhoto mx-auto">
                        <img
                          src={this.state.session_photo}
                          className="mylittlePhoto"
                        />
                      </div>
                    </div>
                    <div className="align-middle navbar-username flex-grow-1 text-left">
                      {this.state.session_name}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      to={`/member/edit/${this.state.user_id}`}
                      className="dropdown-item"
                    >
                      會員資料
                    </Link>

                    <Link
                      to={`/member/road/${this.state.user_id}`}
                      className="dropdown-item"
                    >
                      路線列表
                    </Link>

                    <Link
                      to={`/member/news/${this.state.user_id}`}
                      className="dropdown-item"
                    >
                      收藏文章
                    </Link>

                    <Link
                      to={`/member/course/${this.state.user_id}`}
                      className="dropdown-item"
                    >
                      我的課程
                    </Link>

                    <Link
                      to={`/member/product/${this.state.user_id}`}
                      className="dropdown-item"
                    >
                      商品管理
                    </Link>

                    <Dropdown.Item
                      eventKey="3"
                      onClick={this.logOut}
                      className="logout-btn"
                    >
                      登出
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearPostsBefore, handleclearlikestate }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(NavTop);
