import React from 'react';
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';

import './member.scss';
import './member.css';

class InstallModal2 extends React.Component {
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
      m_photo: '',
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

    // 注意：id(學號)與生日，需先轉為數字類型再進入state中
    // if (name === 'phone' || name === 'birthday') value = +value;

    this.setState({ [name]: value });

    console.log({ [name]: value });
  };

  handlepicChange = e => {
    // console.log(e.target.files[0]);
    console.log(this.input.files[0]);
    this.fileInfo(e.target.files[0]);
    this.setState({ m_photo: e.target.files[0] });
  };

  fileInfo(theFile) {
    var reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.addEventListener('loadend', function(event) {
      //console.log(event.target.result);
      //<img src="" class="" />
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
    };
    console.log(item);
    const newData = [item, ...this.state.memberData];

    var formData = new FormData();
    formData.append('m_name', this.state.m_name);
    formData.append('m_mobile', this.state.m_mobile);
    formData.append('m_birthday', this.state.m_birthday);
    formData.append('m_email', this.state.m_email);
    formData.append('m_password', this.state.m_password);
    formData.append('avatar', this.state.m_photo);
    console.log(formData);
    try {
      // const data = item;

      const response = await fetch('http://localhost:5555/member', {
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
          alert('註冊成功!');
          this.setState({ installdb: 'block' });
          this.setState({ installtext: '註冊成功' });
          this.setState({ installstate: 'alert alert-success' });
          return;
        }

        if (!jsonObject.success) {
          this.setState({ installdb: 'block' });
          alert('e-mail重複使用');

          return;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          className="member_ins"
        >
          <Modal.Header closeButton>
            <Modal.Title className="mx-auto">會員註冊</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              id="info_bar"
              className={this.state.installstate}
              style={{ display: `${this.state.installdb}` }}
              role="alert"
              // style={{"display:"}}
            >
              {this.state.installtext}
            </div>
            <Row>
              <Col />
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      姓名
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="m_name"
                    value={this.state.name}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
                <br />

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      手機號碼
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="m_mobile"
                    type="number"
                    value={this.state.phone}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
                <br />

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      生日
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="m_birthday"
                    type="date"
                    value={this.state.birthday}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
                <br />

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
              </Col>
              <Col>
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

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      確認密碼
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="re_password"
                    type="password"
                    value={this.state.re_password}
                    onChange={this.handleModalFormInputChange}
                  />
                </InputGroup>
                <br />

                <InputGroup className="mb-3 d-block text-center">
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
                <br />
              </Col>
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
            >
              立即註冊
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InstallModal2;
