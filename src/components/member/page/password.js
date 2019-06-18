import React from 'react';
// import { data } from '../data/data';
import { Link, Redirect,withRouter } from 'react-router-dom';
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
import Sidebar from '../component/Sidebar';
import './password.scss';
import checkUserState from '../util/check';

class password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMemberData: [{}],
      memberData: [],
      m_name: '',
      m_photo: '',
      old_password: '',
      checkOld_password: '',
      new_password: '',
      new_password2: '',
      installdb: 'none',
      installtext: '更改失敗',
      installstate: 'alert alert-danger',
      id: '',
      loginUser: '',
      isLogined: '',
      user_id: '',
    };
  }

  async componentDidMount() {
    const jsonObject = await checkUserState();
    // console.log('jsonObject', jsonObject);
    // p.then(jsonObject => {
    //   console.log('2', jsonObject);
    await this.setState({
      loginUser: jsonObject.loginUser,
      isLogined: jsonObject.isLogined,
      user_id: jsonObject.user_id,
    });

    try {
      let id = this.props.match.params.id;
      let user_id = this.state.user_id;
      // console.log(id);
      // console.log(user_id);
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

      // console.log(jsonObject);
      await this.setState({
        myMemberData: jsonObject,
        m_photo: jsonObject[0].m_photo,
        m_name: jsonObject[0].m_name,
        old_password: jsonObject[0].m_password,
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  handleFormInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ myMemberData: [{ [name]: value }] }, () =>
      console.log(this.state)
    );

    this.setState({ [name]: value });
    // this.newMyemberData[name] = value;
    // console.log('newMyemberData');
    // console.log(this.newMyemberData);
  };

  handleModalFormInputeditChecked = async () => {
    const item = {
      m_password: this.state.new_password,
    };
    // console.log(item);
    const newData = [item, ...this.state.memberData];

    if (this.state.old_password !== this.state.checkOld_password) {
      this.setState({ installdb: 'block' });
      this.setState({ installstate: 'alert alert-danger' });
      this.setState({ installtext: '舊密碼不符合' });

      return;
    }

    if (this.state.new_password !== this.state.new_password2) {
      this.setState({ installdb: 'block' });
      this.setState({ installstate: 'alert alert-danger' });
      this.setState({ installtext: '兩次密碼輸入不一致' });

      return;
    }

    if (
      this.state.new_password.trim() == "" ||
      this.state.new_password2.trim() == ""
    ) {
      this.setState({ installdb: 'block' });
      this.setState({ installstate: 'alert alert-danger' });
      this.setState({ installtext: '密碼不可為空值' });
      return;
    }

    var formData = new FormData();
    formData.append('m_password', this.state.new_password);
    // formData.append('m_mobile', this.state.m_mobile);

    // console.log(formData);

    try {
      // const data = item;
      let id = this.props.match.params.id;
      // console.log(id);
      const response = await fetch(`http://18.139.60.49:5000/member/${id}`, {
        method: 'PUT',
        body: formData,
        // headers: new Headers({
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // }),
      });

      const jsonObject = await response.json();

      // console.log(this.state.new_password.length);

      // console.log(jsonObject);

      await this.setState({ memberData: newData }, () => {
        // alert('資料已成功新增!');
        // this.handleModalClose();

        if (jsonObject.message.text == '資料沒有修改') {
          this.setState({ installdb: 'block' });
          this.setState({ installstate: 'alert alert-warning' });
          this.setState({ installtext: '資料沒有修改' });
          alert('資料沒有修改');

          return;
        }

        if (jsonObject.success) {
          alert('修改成功!');
          this.setState({ old_password: jsonObject.body.m_password });
          this.setState({ installdb: 'block' });
          this.setState({ installtext: jsonObject.message.text });
          this.setState({ installstate: `alert alert-success` });
          return;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
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
          <Container className="member_password">
            <Row>
              <Sidebar
                src={this.state.m_photo}
                name={this.state.m_name}
                myId={this.state.id}
              />

              <Col>
                <div className="myProfile">
                  <div className="member-title mx-auto">
                    <h4 className="p-2 passTitle">更改密碼</h4>
                  </div>

                  <div
                    id="info_bar"
                    className={this.state.installstate}
                    
                    style={{ display: `${this.state.installdb}` }}
                    role="alert"
                    // style={{"display:"}}
                  >
                    {this.state.installtext}
                  </div>
                  <div className="passwordArea">
                    <ul className="list-unstyled textpart mx-auto">
                      <li>
                        目前密碼
                        <input
                          type="text"
                          value={this.state.checkOld_password}
                          className="form-control mt-2"
                          name="checkOld_password"
                          onChange={this.handleFormInputChange}
                        />
                      </li>
                      <li>
                        新密碼
                        <input
                          type="text"
                          value={this.state.new_password}
                          className="form-control mt-2"
                          name="new_password"
                          onChange={this.handleFormInputChange}
                        />
                      </li>

                      <li>
                        確認密碼
                        <input
                          type="text"
                          value={this.state.new_password2}
                          className="form-control mt-2"
                          name="new_password2"
                          onChange={this.handleFormInputChange}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="secondary m-auto"
                      onClick={this.handleModalFormInputeditChecked}
                    >
                      修改資料
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default withRouter(password);
