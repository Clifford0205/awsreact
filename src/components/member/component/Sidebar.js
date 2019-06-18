import React from 'react';
// import { data } from '../data/data';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
// import PathNow from '../component/PathNow';
import './Sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // m_photo: '',
      // m_name: '',
    };
  }

  // async componentDidMount() {
  //   try {
  //     let id = this.props.match.params.id;
  //     console.log(id);
  //     const response = await fetch(`http://localhost:5555/member/${id}`, {
  //       method: 'GET',
  //       headers: new Headers({
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       }),
  //     });

  //     // if (!response.ok) throw new Error(response.statusText);

  //     const jsonObject = await response.json();

  //     console.log(jsonObject);
  //     await this.setState({
  //       myMemberData: jsonObject,
  //       m_photo: jsonObject[0].m_photo,
  //       m_name: jsonObject[0].m_name,
  //       old_password: jsonObject[0].m_password,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //   }
  // }

  // handleFormInputChange = event => {
  //   let value = event.target.value;
  //   const name = event.target.name;

  //   this.setState({ myMemberData: [{ [name]: value }] }, () =>
  //     console.log(this.state)
  //   );

  //   this.setState({ [name]: value });
  //   // this.newMyemberData[name] = value;
  //   // console.log('newMyemberData');
  //   // console.log(this.newMyemberData);
  // };

  render() {
    console.log(this.props)
    return (
      <>
        <Col md={3} className="member-sidebar">
          <div className="myPhoto">
            <img src={this.props.src} className="originPhoto" />
          </div>

          <div className="userName">{this.props.name}</div>

          <ul className="list-unstyled">
          <span className="redBoxlg d-lg-inline-block"></span>
            <li className="d-lg-inline-block">
             
              <Link to={`/member/edit/${this.props.myId}`}>編輯會員資料</Link>
              <ul className="list-unstyled">
                <li>
                  <Link to={`/member/edit/${this.props.myId}`}>個人檔案</Link>
                </li>
                <li>
                  <Link to={`/member/password/${this.props.myId}`}>密碼</Link>
                </li>
              </ul>
            </li>

            <div></div>
            <span className="redBoxsm d-lg-inline-block"></span>
            <li className="d-lg-inline-block">
              <Link to={`/member/road/${this.props.myId}`}>路線列表</Link>
            </li>

            <div></div>
            <span className="redBoxsm d-lg-inline-block"></span>
            <li className="d-lg-inline-block">
              <Link to={`/member/news/${this.props.myId}`}>收藏文章</Link>
            </li>

            <div></div>
            <span className="redBoxsm d-lg-inline-block"></span>
            <li className="d-lg-inline-block">
              <Link to={`/member/course/${this.props.myId}`}>我的課程</Link>
            </li>


            <div></div>
            <span className="redBoxsm d-lg-inline-block"></span>
            <li className="d-lg-inline-block">
              <Link to={`/member/product/${this.props.myId}`}>商品管理</Link>
            </li>
          </ul>
        </Col>
      </>
    );
  }
}

export default Sidebar;
