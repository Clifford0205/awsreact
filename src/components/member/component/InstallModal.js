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
import './InstallModal.scss';
import Swal from 'sweetalert2'
import { Link, Redirect, withRouter } from 'react-router-dom';

class InstallModal extends React.Component {
  constructor() {
    super();
    this.state = {
      memberData: [],
      m_name: '',
      m_mobile: '',
      m_birthday: '',
      m_email: '',
      m_password: '',
      re_password: '',
      m_photo: 'https://images2.imgbox.com/b0/c3/sQxunS2i_o.png',
      installdb: 'none',
      installtext: '註冊失敗',
      installstate: 'alert alert-danger',
    };
  }

  upload = () => {
    document.getElementById('selectImage').click();
  };

  handleModalFormInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });

    console.log({ [name]: value });
  };

  handlepicChange = e => {
    // console.log(e.target.files[0]);
    console.log(e.target.files[0]);
    this.fileInfo(e.target.files[0]);
    this.setState({ m_photo: e.target.files[0] });
    console.log(this.state.m_photo);
  };

  fileInfo(theFile) {
    var reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.addEventListener('loadend', function(event) {
      //console.log(event.target.result);
     
      var photo = document.querySelector('.thumb');
      photo.setAttribute('src', event.target.result);
      // console.log(event.target.result);
    });
  }

  handleModalFormInputSave = async () => {
    const item = {
      m_name: this.state.m_name,
      m_mobile: this.state.m_mobile,
      m_birthday: this.state.m_birthday,
      m_email: this.state.m_email,
      m_password: this.state.m_password,
      m_photo: this.state.m_photo,
    };
    console.log(item);
    const newData = [item, ...this.state.memberData];

    let isPassed = true;

    //手機號碼驗證
    let mobile_pattern = /^09\d{2}\-?\d{3}\-?\d{3}$/;
    console.log(document.querySelector('#m_mobile').value);
    if (!mobile_pattern.test(document.querySelector('#m_mobile').value)) {
      document.querySelector('#m_mobile').style.borderColor = 'red';
      document.querySelector('#m_mobileHelp').innerHTML =
        '請填寫正確的手機號碼!';
      isPassed = false;
    }

    //Email驗證
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!email_pattern.test(document.querySelector('#m_email').value)) {
      document.querySelector('#m_email').style.borderColor = 'red';
      document.querySelector('#m_emailHelp').innerHTML = '請填寫正確的E-mail!';
      isPassed = false;
    }

    //密碼驗證
    if (
      document.querySelector('#m_password').value !==
      document.querySelector('#re_password').value
    ) {
      document.querySelector('#m_password').style.borderColor = 'red';
      document.querySelector('#m_passwordHelp').innerHTML =
        '兩次密碼輸入不一致!';
      document.querySelector('#re_password').style.borderColor = 'red';
      document.querySelector('#re_passwordHelp').innerHTML =
        '兩次密碼輸入不一致!';
      isPassed = false;
    }
    console.log(isPassed);

    if (isPassed) {
      var formData = new FormData();
      formData.append('m_name', this.state.m_name);
      formData.append('m_mobile', this.state.m_mobile);
      formData.append('m_birthday', this.state.m_birthday);
      formData.append('m_email', this.state.m_email);
      formData.append('m_password', this.state.m_password);
      // formData.append('avatar', this.state.m_photo);
      this.state.m_photo == 'https://images2.imgbox.com/b0/c3/sQxunS2i_o.png'
        ? formData.append('m_photo', this.state.m_photo)
        : formData.append('avatar', this.state.m_photo);
      console.log(formData);
      try {
        // const data = item;

        const response = await fetch('http://18.139.60.49:5000/member', {
          method: 'POST',
          body: formData,
          // headers: new Headers({
          //   Accept: 'application/json',
          //   'Content-Type': 'application/json',
          // }),
        });

        const jsonObject = await response.json();

        console.log(jsonObject);

        await this.setState({ memberData: newData }, () => {
          // alert('資料已成功新增!');
          // this.handleModalClose();
          if (jsonObject.success) {
            Swal.fire(
              '註冊成功!',
              '',
              'success',
            )
            this.setState({ installdb: 'block' });
            this.setState({ installtext: '註冊成功' });
            this.setState({ installstate: 'alert alert-success' });
            // setTimeout(()=>this.props.history.push("/"),2000);
          //  this.props.history.push('/');
          //  document.location.href="/";
          // window.location.reload(true);
            // window. location.replace('/')

          //  window.location='/';
            return;
          }

          if (!jsonObject.success) {
            this.setState({ installdb: 'block' });
            Swal.fire({
              type: 'error',
              title: 'E-mail重複使用',
              text: '',
              // footer: '<a href>Why do I have this issue?</a>'
            })

            return;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          className="member_ins"
        >
          <Modal.Header closeButton>
            <Modal.Title className="mx-auto">註冊會員</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              id="info_bar"
              className={this.state.installstate}
              style={{ display: `${this.state.installdb}` }}
              role="alert"
            >
              {this.state.installtext}
            </div>
            <Row className="formarea">
              <Col md={2} />
              <Col md={4}>
                <InputGroup className="mb-md-3">
                  <InputGroup.Prepend>姓名:</InputGroup.Prepend>
                  <div>&nbsp;&nbsp;&nbsp;</div>
                  <FormControl
                    name="m_name"
                    value={this.state.name}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>

                <InputGroup className="mb-md-3">
                  <InputGroup.Prepend>手機號碼:</InputGroup.Prepend>
                  <small id="m_mobileHelp" className="form-text text-muted" />
                  <div>&nbsp;&nbsp;&nbsp;</div>
                  <FormControl
                    name="m_mobile"
                    id="m_mobile"
                    type="number"
                    value={this.state.phone}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>

                <InputGroup className="mb-md-3">
                  <InputGroup.Prepend>生日:</InputGroup.Prepend>
                  <div>&nbsp;&nbsp;&nbsp;</div>
                  <FormControl
                    name="m_birthday"
                    type="date"
                    value={this.state.birthday}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>

                <InputGroup className="mb-md-3">
                  <InputGroup.Prepend>E-mail(帳號):</InputGroup.Prepend>
                  <small id="m_emailHelp" className="form-text text-muted" />
                  <div>&nbsp;&nbsp;&nbsp;</div>
                  <FormControl
                    name="m_email"
                    id="m_email"
                    value={this.state.email}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-md-3">
                  <InputGroup.Prepend>密碼:</InputGroup.Prepend>
                  <small id="m_passwordHelp" className="form-text text-muted" />
                  <div>&nbsp;&nbsp;&nbsp;</div>
                  <FormControl
                    name="m_password"
                    id="m_password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>

                <InputGroup className="mb-md-3">
                  <InputGroup.Prepend>確認密碼:</InputGroup.Prepend>
                  <small id="re_passwordHelp" className="form-text text-muted" />
                  <div>&nbsp;&nbsp;&nbsp;</div>
                  <FormControl
                    name="re_password"
                    id="re_password"
                    type="password"
                    value={this.state.re_password}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>

                <InputGroup className="mb-md-3 d-block text-center">
                  <div className="imgarea mx-auto">
                    <img className="thumb" src="" />
                  </div>
                  <Button variant="secondary mt-3" onClick={this.upload}>
                    上傳圖片
                  </Button>
                  <div>
                    <input
                      type="file"
                      onChange={this.handlepicChange}
                      name="avatar"
                      className="m-auto d-none"
                      id="selectImage"
                      ref={el => (this.input = el)}
                    />
                  </div>
                </InputGroup>
              </Col>
              <Col md={2} />
            </Row>

            <Row>
              <Col className="d-flex">
                <div className="m-auto">
                  <input type="checkbox" />
                  <span>
                    我同意The Wheel<a href="">客戶隱私權政策</a>與
                    <a href="">客戶服務條款</a>
                  </span>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary m-auto"
              onClick={this.handleModalFormInputSave}
              className="btnhover"
            >
              立即註冊
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(InstallModal);
