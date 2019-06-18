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
import './edit.scss';
import TWzipcode from 'react-twzipcode';
import checkUserState from '../util/check';

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMemberData: [],
      memberData: [],
      m_name: '',
      m_oldname: '',
      m_mobile: '',
      m_email: '',
      m_birthday: '',
      m_city: '',
      m_town: '',
      m_address: '',
      m_photo: '',
      new_photo: '',
      installdb: 'none',
      installtext: '修改失敗',
      installstate: 'alert alert-danger',
      id: '',
      loginUser: '',
      isLogined: '',
      user_id: '',
      session_name: '',
      session_photo: '',
    };
    this.newMyemberData = {};
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
      console.log(id);
      console.log(user_id);
      this.setState({ id: id });
      console.log(this.state.id);

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
      await this.setState({
        myMemberData: jsonObject,
        m_name: jsonObject[0].m_name,
        m_oldname: jsonObject[0].m_name,
        m_mobile: jsonObject[0].m_mobile,
        m_email: jsonObject[0].m_email,
        m_birthday: jsonObject[0].m_birthday2,
        m_city: jsonObject[0].m_city,
        m_town: jsonObject[0].m_town,
        m_address: jsonObject[0].m_address,
        m_photo: jsonObject[0].m_photo,
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  upload = () => {
    document.getElementById('selectImage2').click();
  };

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

  handlepicChange2 = e => {
    // console.log(e.target.files[0]);
    console.log(e.target.files[0]);
    this.fileInfo2(e.target.files[0]);
    this.setState({ new_photo: e.target.files[0] });
  };

  fileInfo2(theFile) {
    var reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.addEventListener('loadend', function(event) {
      //console.log(event.target.result);
      //<img src="" class="" />
      var photo2 = document.querySelector('.thumb2');
      photo2.setAttribute('src', event.target.result);
      // console.log(event.target.result);
    });
  }

  handleChange = data => {
    this.setState({ m_city: data.county });
    this.setState({ m_town: data.district });
    console.log(this.state);
  };

  handleModalFormInputeditChecked = async () => {
    const item = {
      m_name: this.state.m_name,
      m_mobile: this.state.m_mobile,
      m_birthday: this.state.m_birthday,
      m_email: this.state.m_email,
      m_city: this.state.m_city,
      m_town: this.state.m_town,
      m_address: this.state.m_address,
      m_photo: this.state.m_photo,
    };
    console.log(item);
    const none = [];
    const newData = [item, ...this.state.memberData];

    var formData = new FormData();
    formData.append('m_name', this.state.m_name);
    formData.append('m_mobile', this.state.m_mobile);
    formData.append('m_birthday', this.state.m_birthday);
    formData.append('m_email', this.state.m_email);
    formData.append('m_city', this.state.m_city);
    formData.append('m_town', this.state.m_town);
    formData.append('m_address', this.state.m_address);
    // formData.append('avatar', this.state.new_photo);
    this.state.new_photo == ''
      ? formData.append('m_photo', this.state.m_photo)
      : formData.append('avatar', this.state.new_photo);

    try {
      // const data = item;
      let id = this.props.match.params.id;
      console.log(id);
      const response = await fetch(`http://18.139.60.49:5000/member/${id}`, {
        credentials: 'include',
        method: 'PUT',
        body: formData,
        // headers: new Headers({
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // }),
      });

      const jsonObject = await response.json();

      console.log('PUT', jsonObject);

      await this.setState(
        {
          memberData: [jsonObject.body],
       
        },
        () => {
          // alert('資料已成功新增!');
          // this.handleModalClose();

          if (jsonObject.message.info == '檔案格式不符') {
            this.setState({ installdb: 'block' });
            this.setState({ installstate: 'alert alert-warning' });
            this.setState({ installtext: jsonObject.message.text });
            alert('檔案格式不符資料沒有修改');

            return;
          }

          if (jsonObject.message.text == '資料沒有修改') {
            this.setState({ installdb: 'block' });
            this.setState({ installstate: 'alert alert-warning' });
            this.setState({ installtext: '資料沒有修改' });
            alert('資料沒有修改');

            return;
          }

          if (jsonObject.success) {
           


           fetch('http://18.139.60.49:5000/is_logined', {
            credentials: 'include',
            headers: new Headers({
              Accept: 'application/json',
            'Content-Type': 'application/json',
            }),
          }).then(res => res.json())
          .then(obj => {
            console.log(obj);})
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
            
            alert('修改成功!');
            window.location.reload();
            this.setState({ installdb: 'block' });
            this.setState({ installtext: jsonObject.message.text });
            this.setState({ installstate: `alert alert-success` });
            this.setState({  m_oldname: jsonObject.body.m_name });
            this.setState({ m_photo: jsonObject.body.m_photo });
            this.setState({  session_name: jsonObject.body.m_name });
            this.setState({ session_photo: jsonObject.body.m_photo });

            
          
            return;
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log('state', this.state);
    console.log(this.state.user_id);
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
          <Container className="member_edit">
            <Row>
              {console.log(this.state.id)}
              <Sidebar
                src={this.state.m_photo}
                name={this.state.m_oldname}
                myId={this.state.id}
              />

              <Col>
                <div className="myProfile">
                  <div className="member-title">
                    <h4 className="p-1">我的個人檔案</h4>
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
                  <div className="d-lg-flex">
                    <ul className="list-unstyled textpart flex-grow-1">
                      <li>
                        姓名
                        <input
                          type="text"
                          value={this.state.m_name}
                          name="m_name"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li>
                      <li>
                        手機號碼
                        <input
                          type="text"
                          value={this.state.m_mobile}
                          name="m_mobile"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li>

                      <li>
                        帳號(電子郵件){' '}
                        <input
                          type="text"
                          value={this.state.m_email}
                          name="m_email"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li>
                      <li>
                        生日{' '}
                        <input
                          type="date"
                          value={this.state.m_birthday}
                          name="m_birthday"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li>
                      {/* <li>
                        城市{' '}
                        <input
                          type="text"
                          value={this.state.m_city}
                          name="m_city"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li>
                      <li className="form-row">
                        地區{' '}
                        <input
                          type="text"
                          value={this.state.m_town}
                          name="m_town"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li> */}
                      <li>
                        <div>請選擇地區</div>
                        <TWzipcode
                          css={[
                            'form-control county-sel  city d-lg-inline-block TWZ w-lg-auto',
                            'form-control district-sel  d-lg-inline-block TWZ ml-lg-5 w-lg-auto',
                            'form-control zipcode  d-lg-inline-block TWZ  ml-lg-5 w-lg-auto',
                          ]}
                          handleChangeCounty={this.handleChange}
                          handleChangeDistrict={this.handleChange}
                          handleChangeZipcode={this.handleChange}
                          countyValue={this.state.m_city}
                          districtValue={this.state.m_town}
                        />
                      </li>

                      <li>
                        路段
                        <input
                          name=""
                          id=""
                          value={this.state.m_address}
                          name="m_address"
                          onChange={this.handleFormInputChange}
                          className="form-control"
                        />
                      </li>
                    </ul>

                    <div className="flex-grow-1 text-center">
                      <div className="myPhoto mx-auto">
                        <img
                          src={
                            this.state.new_photo
                              ? this.state.new_photo
                              : this.state.m_photo
                          }
                          className="thumb2"
                        />
                      </div>

                      <Button variant="secondary mt-5" onClick={this.upload}>
                        上傳圖片
                      </Button>

                      <div className="mt-3">檔案限制: .JPEG, .PNG</div>
                      <div>
                        <input
                          type="file"
                          onChange={this.handlepicChange2}
                          name="avatar"
                          className="m-auto d-none"
                          id="selectImage2"
                          ref={el => (this.input = el)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="secondary mx-auto"
                      onClick={this.handleModalFormInputeditChecked}
                      className="checkBtn"
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

export default withRouter(edit);
