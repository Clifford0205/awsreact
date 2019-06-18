import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from '../FormControl/FormControl';
import './AddNewForm_style.css';
import CountryData from '../../data/countryData.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCountryChange, handleChangeDepartArrive } from '../../actions';

class AddNewMainForm extends Component {
  state = {};
  countryChange = event => {
    this.props.handleCountryChange(event.target.value);
  };
  changeDepartArrive = () => {
    this.props.handleChangeDepartArrive(
      document.form1.r_depart.value,
      document.form1.r_arrive.value
    );
  };
  upload = () => {
    document.getElementById('selectImage').click();
  };

  handlepicChange = e => {
    // console.log(e.target.files[0]);
    console.log(e.target.files[0]);
    this.fileInfo(e.target.files[0]);
    this.setState({ m_photo: e.target.files[0] });
    console.log(this.state.m_photo);
    document.querySelector('.thumb1').style.display = 'block';
  };

  fileInfo(theFile) {
    var reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.addEventListener('loadend', function(event) {
      //console.log(event.target.result);

      var photo = document.querySelector('.thumb1');
      photo.setAttribute('src', event.target.result);
      // console.log(event.target.result);
    });
  }

  render() {
    return (
      <Container fluid className="p-0">
        <Row className="d-flex flex-column w-100 m-0">
          <datalist id="countryData">
            {Object.keys(CountryData).map(i => (
              <option key={i} value={i} />
            ))}
          </datalist>
          <datalist id="areaData">
            {Object.keys(this.props.r.areas).map(i => (
              <option key={i} value={this.props.r.areas[i]} />
            ))}
          </datalist>

          <form
            name="form1"
            method="post"
            encType="multipart/form-data"
            className="w-100"
            id="form1"
          >
            {this.props.f.r_name ? (
              <FormControl
                num="1"
                label="路線名稱"
                name="r_name"
                type="text"
                small=""
                passed="true"
              />
            ) : (
              <FormControl
                num="1"
                label="路線名稱"
                name="r_name"
                type="text"
                small="請為本路線命名"
                passed="false"
              />
            )}
            {this.props.f.r_time ? (
              <FormControl
                num="1"
                label="預計時間"
                name="r_time"
                type="text"
                small="請按照格式 *天 *時 *分 可省略任意部分 *須為半形數字"
                passed="true"
              />
            ) : (
              <FormControl
                num="1"
                label="預計時間"
                name="r_time"
                type="text"
                small="請按照格式 *天 *時 *分 可省略任意部分 *須為半形數字"
                passed="false"
              />
            )}

            <FormControl label="路線類型" num="4" />

            {this.props.f.r_country ? (
              <FormControl
                num="2"
                passed="true"
                list="countryData"
                list2="areaData"
                info="路線詳情"
                onChange={this.countryChange}
                label="國家"
                name="r_country"
                small=""
                label2="地區"
                name2="r_area"
                small2=""
              />
            ) : (
              <FormControl
                num="2"
                passed="false"
                list="countryData"
                list2="areaData"
                info="路線詳情"
                onChange={this.countryChange}
                label="國家"
                name="r_country"
                small="請選擇路線所屬國家"
                label2="地區"
                name2="r_area"
                small2=""
              />
            )}

            {this.props.f.r_depart && this.props.f.r_arrive ? (
              <FormControl
                onChange={this.changeDepartArrive}
                num="2"
                passed="true"
                label="出發地"
                name="r_depart"
                type="text"
                small=""
                label2="目的地"
                name2="r_arrive"
                type2="text"
                small2=""
                //onBlur1={this.props.handlegeolocation1}
                //onBlur2={this.props.handlegeolocation2}
              />
            ) : (
              <FormControl
                onChange={this.changeDepartArrive}
                num="2"
                passed="false"
                label="出發地"
                name="r_depart"
                type="text"
                small="請輸入出發地及目的地"
                label2="目的地"
                name2="r_arrive"
                type2="text"
                small2=""
                onBlur1={this.handlegeolocation1}
                onBlur2={this.handlegeolocation2}
              />
            )}
            <input type="hidden" name="r_map_info" id="r_map_info" />
            {/* <input type="hidden" name="arrive_info" id="arrive_info" /> */}

            <FormControl
              num="textarea"
              label="簡介"
              name="r_intro"
              type="text"
              small=""
            />

            <Row className="r_form_group m-0 my-5">
              <Col sm={2} className="d-flex justify-content-end mr-3 mr-md-5">
                <label>路線封面</label>
              </Col>
              <Col className="ml-md-5 d-flex">
                <Col className="p-0">
                  <input
                    type="file"
                    onChange={this.handlepicChange}
                    name="r_img"
                    className="m-auto d-none"
                    id="selectImage"
                    ref={el => (this.input = el)}
                  />
                  <button
                    className="location_btn px-2 py-1"
                    variant="secondary mt-3"
                    onClick={this.upload}
                    type="button"
                  >
                    上傳圖片
                  </button>
                </Col>
                <Col sm={9} className="p-0">
                  <div
                    className="imgarea w-100 h-100 overflow-hidden"
                    style={{ maxHeight: '280px' }}
                  >
                    <img
                      className="thumb1"
                      src=""
                      style={{
                        width: '500px',
                        objectFit: 'cover',
                        display: 'none',
                      }}
                      alt="your pic"
                    />
                  </div>
                </Col>

                <small className="form-text text-muted" />
              </Col>
            </Row>

            <input
              type="number"
              min="0"
              name="r_l_num"
              id="r_l_num"
              value={
                this.props.l.locationList[0]
                  ? this.props.l.locationList.length
                  : 0
              }
              readOnly
              className="d-none"
            />
          </form>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  r: state.routeCountryChange,
  l: state.routeAddNewLocation,
  f: state.routeFormCheck,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { handleCountryChange, handleChangeDepartArrive },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewMainForm);
