import React, { Component } from 'react'
// Stylesheet
import { Container, Row, Col, Form } from 'react-bootstrap'
// import '../../Route/components/AdvanceSearch/AdvanceSearch_style.css'
import './AdvanceSearch_style.css'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import CountryData from '../../Route/data/countryData'

class AdvanceSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 將Form的值回歸
  handleButtonClick = () => {
    this.form.reset() // resets "username" field to "admin"
    // console.log('handleButtonClick done');
  }

  // 合併的方法
  clearAndSearch = () => {
    // console.log('enter onClick!');
    this.props.handleSearch()
    this.handleButtonClick()
  }

  render() {
    return (
      <>
        {
          <Container fluid className="d-flex justify-content-center">
            <Col
              lg={10}
              className="pl-0 pr-0"
              style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            >
              <Form ref={form => (this.form = form)}>
                <Row className="d-flex">
                  <Col className="p-0" lg={4}>
                    <Form.Label className="r_fw_bold">課程難度</Form.Label>
                    <Form.Control
                      as="select"
                      className="r_as_select"
                      onChange={this.props.handleLevel}
                      id="input"
                      name="input"
                    >
                      <option selected value="">
                        請選擇
                      </option>
                      <option value="入門">入門</option>
                      <option value="中級">中級</option>
                      <option value="高級">高級</option>
                    </Form.Control>
                  </Col>
                  <Col className="p-0" lg={4}>
                    <Form.Label className="r_fw_bold">地區</Form.Label>
                    <Form.Control
                      as="select"
                      className="r_as_select"
                      onChange={this.props.handleRegion}
                      id="input"
                      name="input"
                    >
                      <option selected value="">
                        請選擇
                      </option>
                      <option value="">-----北部-----</option>
                      <option value="基隆市">基隆市</option>
                      <option value="台北市">台北市</option>
                      <option value="新北市">新北市</option>
                      <option value="桃園市">桃園市</option>
                      <option value="">-----中部-----</option>
                      <option value="台中市">台中市</option>
                      <option value="彰化縣">彰化縣</option>
                      <option value="南投縣">南投縣</option>
                      <option value="">-----南部-----</option>
                      <option value="嘉義市">嘉義市</option>
                      <option value="台南市">台南市</option>
                      <option value="高雄市">高雄市</option>
                    </Form.Control>
                  </Col>
                  <Col className="p-0 position-relative" lg={4}>
                    <Form.Label className="r_fw_bold">集資結束時間</Form.Label>
                    <Form.Control
                      as="select"
                      className="r_as_select"
                      onChange={this.props.handleDate}
                      id="input"
                      name="input"
                    >
                      <option selected value="">
                        請選擇
                      </option>
                      <option value="20190601-20190630">2019年6月</option>
                      <option value="20190701-20190731">2019年7月</option>
                      <option value="20190801-20190831">2019年8月</option>
                      <option value="20190901-20190930">2019年9月</option>
                      <option value="20191001-20191031">2019年10月</option>
                      <option value="20191101-20191130">2019年11月</option>
                      <option value="20191201-20191231">2019年12月</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Container fluid className="d-flex">
                  <Col
                    className="my-0 my-lg-4"
                    lg={12}
                    style={{ textAlign: 'right' }}
                  >
                    <input
                      type="text"
                      className="r_as_search mx-2"
                      name="r_search"
                      onChange={this.props.handleInput}
                    />
                    <button
                      className="r_as_search_btn r_color_white px-3 r_fw_bold"
                      type="button"
                      onClick={this.clearAndSearch}
                    >
                      搜尋
                    </button>
                  </Col>
                </Container>
              </Form>
            </Col>
          </Container>
        }
      </>
    )
  }
}

export default AdvanceSearch
