import React from 'react'
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Container,
  Form,
  Col,
} from 'react-bootstrap'
// import './member.css';
import './Login.scss'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
// import R Alert made by Ivy
import RAlert from '../../../containers/Route/components/R_Alert/R_Alert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alertAppear } from '../../../containers/Route/actions'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      memberData: [],
      login_email: '',
      login_password: '',
      loginUser: '',
      isLogined: false,
      user_id: '',
      Logindb: 'none',
      Logintext: '登入失敗',
      Loginstate: 'alert alert-danger',
    }
  }

  handleModalFormInputChange = event => {
    let value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })

    // console.log({ [name]: value })
  }

  handleModalFormInputSave = async () => {
    const item = {
      m_email: this.state.login_email,
      m_password: this.state.login_password,
    }
    // console.log(item)
    const newData = [item, ...this.state.memberData]

    // var formData = new FormData();

    // formData.append('m_email', this.state.m_email);
    // formData.append('m_password', this.state.m_password);

    // console.log(formData);

    var sendObj = {
      m_email: this.state.login_email,
      m_password: this.state.login_password,
    }

    if (
      document.querySelector('#login_email').value == '' ||
      document.querySelector('#login_password').value == ''
    ) {
      // Swal.fire({
      //   type: 'error',
      //   title: '不可空白',
      //   text: '',
      //   // footer: '<a href>Why do I have this issue?</a>'
      // })
      this.props.alertAppear(false, '不可空白')
      return
    }

    try {
      // const data = item;

      const response = await fetch('http://18.139.60.49:5000/login', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(sendObj),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const jsonObject = await response.json()

      // console.log(jsonObject)

      await this.setState({ memberData: [newData] }, () => {
        // this.handleModalClose();
        if (jsonObject.WARNING) {
          // alert("您的帳號已經被停權")
          // Swal.fire({
          //   type: 'error',
          //   title: '您的帳號已被停權',
          //   text: '若有疑問，請聯繫客服人員',
          //   // footer: '<a href>Why do I have this issue?</a>'
          // })
          this.props.alertAppear(
            false,
            '您的帳號已被停權，若有疑問，請聯繫客服人員'
          )
          // document.location.href = '/';
          setTimeout(() => this.props.history.push('/'), 2000)
          return
        }

        if (jsonObject.success) {
          // alert('登入成功!');
          // Swal.fire('登入成功!', '', 'success')
          this.props.alertAppear(true, '登入成功!')
          // this.setState({ Logindb: 'block' })
          // this.setState({ Logintext: '登入成功' })
          // this.setState({ Loginstate: 'alert alert-success' })
          this.setState({
            loginUser: jsonObject.body.m_email,
            isLogined: true,
            user_id: jsonObject.message.user_id,
          })
          localStorage.setItem('meber', jsonObject.message.user_id)
          // setTimeout(document.location.href = '/',5000)
          setTimeout(() => this.props.history.push('/'), 2000)
        } else {
          // this.setState({ Logindb: 'block' })
          // this.setState({ Logintext: '登入失敗' })
          // this.setState({ Loginstate: 'alert alert-danger' })
          // Swal.fire({
          //   type: 'error',
          //   title: '帳號或密碼錯誤',
          //   text: '若有疑問，請聯繫客服人員',
          //   // footer: '<a href>Why do I have this issue?</a>'
          // })
          this.props.alertAppear(
            false,
            '帳號或密碼錯誤,若有疑問，請聯繫客服人員'
          )
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <RAlert />
        <div className="member_login">
          <Container>
            <Row>
              <Col>
                <Form>
                  <h2 className="text-center">登入</h2>
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
                    <Col md={3} />
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>帳號(電子郵件)</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          id="login_email"
                          name="login_email"
                          value={this.state.email}
                          onChange={this.handleModalFormInputChange}
                        />
                        <Form.Text className="text-muted">
                          請輸入你的電子郵件
                        </Form.Text>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>密碼</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="login_password"
                          id="login_password"
                          value={this.state.password}
                          onChange={this.handleModalFormInputChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <div className="m-auto">
                          <span>
                            <a href="">忘記密碼</a>
                          </span>
                        </div>
                      </Form.Group>
                      <Button
                        variant="secondary m-auto d-block"
                        onClick={this.handleModalFormInputSave}
                      >
                        送出
                      </Button>
                    </Col>
                    <Col md={3} />
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

// For R Alert
const mapStateToProps = state => ({
  a: state.alertReducer,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ alertAppear }, dispatch)

// export default withRouter(Login)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
