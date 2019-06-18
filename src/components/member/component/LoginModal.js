import React from 'react';
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
// import './member.css';
import './LoginModal.scss';

class LoginModal extends React.Component {
  constructor() {
    super();
    this.state = {
      memberData: [],
      m_email: '',
      m_password: '',
      Logindb: 'none',
      Logintext: '註冊失敗',
      Loginstate: 'alert alert-danger',
    };
  }

  handleModalFormInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });

    console.log({ [name]: value });
  };

  handleModalFormInputSave = async () => {
    const item = {
      m_email: this.state.m_email,
      m_password: this.state.m_password,
    };
    console.log(item);
    const newData = [item, ...this.state.memberData];

    var formData = new FormData();

    formData.append('m_email', this.state.m_email);
    formData.append('m_password', this.state.m_password);

    console.log(formData);

    var sendObj = {
      m_email: this.state.m_email,
      m_password: this.state.m_password,
    };

    try {
      // const data = item;

      const response = await fetch('http://localhost:5555/login', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(sendObj),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });

      const jsonObject = await response.json();

      console.log(jsonObject);

      await this.setState({ memberData: [newData] }, () => {
        // this.handleModalClose();
        if (jsonObject.success) {
          alert('登入成功!');
          this.setState({ Logindb: 'block' });
          this.setState({ Logintext: '登入成功' });
          this.setState({ Loginstate: 'alert alert-success' });
          this.props.saveLoginData({
            loginUser: jsonObject.body.m_email,
            isLogined: true,
            user_id: jsonObject.message.user_id,
          });
        } else {
          this.setState({ Logindb: 'block' });
          this.setState({ Logintext: '登入失敗' });
          this.setState({ Loginstate: 'alert alert-danger' });
          alert('帳號或密碼錯誤');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          className="member_Login"
        >
          <Modal.Header closeButton>
            <Modal.Title className="mx-auto">會員登入</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              id="info_bar"
              className={this.state.Loginstate}
              style={{ display: `${this.state.Logindb}` }}
              role="alert"
              // style={{"display:"}}
            >
              {this.state.Logintext}
            </div>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      E-mail(帳號)
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="m_email"
                    value={this.state.email}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
                <br />

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      密碼
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="m_password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
                <br />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex">
                <div className="m-auto">
                  <span>
                    <a href="">忘記密碼</a>
                  </span>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary m-auto" onClick={this.props.close}>
              取消
            </Button>

            <Button
              variant="secondary m-auto"
              onClick={this.handleModalFormInputSave}
            >
              登入
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default LoginModal;
