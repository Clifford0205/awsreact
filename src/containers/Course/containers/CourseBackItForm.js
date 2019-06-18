import React from 'react'
// React Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
// Import Components
import CourseBanner from '../components/CourseBanner'
import CourseMainTitle from '../components/CourseMainTitle'
// React Router
import { withRouter } from 'react-router-dom'
// import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alertAppear } from '../../Route/actions'
import RAlert from '../../Route/components/R_Alert/R_Alert'

class CourseBackItForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Form validation
      validated: false,
      // Data from DB
      course: null,
      creditDisplay: 'none',
      // Get member ID from localStorage
      m_sid: localStorage.meber,
      c_sid: 0,
      payment_method: null,
      // Insert value into DB 'funding'
      fund_price: 0,
      backer_name: null,
      comment: null,
      // Update value into DB 'course'
      c_backers: 0,
      c_fundNow: 0,
      c_status: 0,
      // Show buttons or not
      buttonDisplay: 'none',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate c_fundNow: ' + this.state.c_fundNow)
    if (!this.state.course) {
      // console.log('componentDidUpdate c_sid: ' + this.state.c_sid)
      let c_sid = this.state.c_sid
      // console.log('c_sid: ' + c_sid)
      fetch(`http://18.139.60.49:5000/course/${c_sid}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ course: data })
          // set data into states
          // console.log(data[0].c_status)
          console.log(data[0].c_fundNow)
          console.log(data[0].c_fundGoal)
          if (data[0].c_fundNow >= data[0].c_fundGoal)
            this.setState({ c_status: '集資成功' })
          else this.setState({ c_status: '集資中' })
          console.log(this.state.c_status)
          this.setState({ c_fundNow: data[0].c_fundNow })
          this.setState({ c_backers: data[0].c_backers })
        })
        .catch(err => {
          console.log(err) // c_fundNow of undefined
        })
    }
    // console.log(this.state.c_backers)
    // console.log(this.state.c_fundNow)
    if (this.state.c_fundNow) {
      let obj = {
        c_sid: this.state.c_sid,
        c_backers: this.state.c_backers,
        c_fundNow: this.state.c_fundNow,
        // c_status: this.state.c_status,
      }
      // console.log(this.state.c_status)
      // 更新課程欄位資訊（c_sid: 課程ID ,c_backers: 贊助人數; c_fundNow: 目前集資金額）
      fetch(`http://18.139.60.49:5000/course/dataUpdate`, {
        body: JSON.stringify(obj),
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }).catch(err => {
        console.log(err)
      })
    }
  }

  componentDidMount() {
    // 15 spaces of strings - "/course/backIt/"
    let c_sid = this.props.history.location.pathname.slice(15)
    this.setState({
      c_sid: c_sid,
    })
  }

  handleSubmit = () => {
    // console.log('enter handleSubmit!')
    let obj = {
      // set form input data to state
      m_sid: this.state.m_sid,
      c_sid: this.state.c_sid,
      payment_method: this.state.payment_method,
      fund_price: this.state.fund_price,
      backer_name: this.state.backer_name,
      comment: this.state.comment,
      // c_status: this.state.c_status,
    }
    console.log(obj)
    if (!localStorage.getItem('meber')) {
      // alert('請登入會員')
      // Swal.fire('請先登入', '您需要登入後才能進行贊助', 'warning')
      this.props.alertAppear(false, '請先登入會員才能進行贊助')
    } else {
      fetch(`http://18.139.60.49:5000/course/backIt/${this.state.c_sid}`, {
        body: JSON.stringify(obj),
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(
          // Update fundNow data
          this.setState({ c_backers: Number(this.state.c_backers) + 1 }),
          this.setState({
            c_fundNow:
              Number(this.state.c_fundNow) + Number(this.state.fund_price),
          })
        )
        .then(
          // () => alert('集資成功')
          () => {
            // Swal.fire('集資成功', '感謝您的支持！', 'success')
            this.props.alertAppear(true, '集資成功！謝您的支持！')
          }
        )
        .then(() =>
          setTimeout(
            () => this.props.history.push(`/course/${this.state.c_sid}`),
            3000
          )
        )
    }
  }

  handlePayment = event => {
    if (event.target.value === '信用卡') {
      this.setState({ creditDisplay: 'block' })
    } else {
      this.setState({ creditDisplay: 'none' })
    }
    // console.log(event.target.value )
    this.setState({ payment_method: event.target.value }, () => {
      // console.log(this.state.payment_method)
    })
    // console.log(this.state.payment_method)
  }

  handlePrice = event => {
    this.setState({ fund_price: event.target.value })
  }

  handleBacker = event => {
    this.setState({ backer_name: event.target.value })
  }

  handleComment = event => {
    this.setState({ comment: event.target.value })
  }

  render() {
    // console.log('updated: ' + this.state.c_backers)
    // console.log('updated c_fundNow: ' + this.state.c_fundNow)
    // console.log('render c_sid: ' + this.state.c_sid)
    // console.log(this.state)
    // console.log('render c_fundNow: ' + this.state.c_fundNow)
    // this.state = { validated: false }
    // console.log(this.state)
    // Render <CourseMainTitle />
    let list1 = null
    // Render <CourseBanner />
    let list2 = null
    if (this.state.course) {
      list1 = <CourseMainTitle course={this.state.course} />
      list2 = (
        <CourseBanner
          course={this.state.course}
          buttonDisplay={this.state.buttonDisplay}
          status={this.state.c_status}
        />
      )
    }
    return (
      <>
        <RAlert />
        <div style={{ height: '10vh' }} />
        <Container fluid className="p-0">
          {list1}
          {list2}
        </Container>
        <Container className="mb-3 mt-3 pb-3 pt-3">
          <Row className="justify-content-center">
            <Col
              md={8}
              className="p-5 course-back-it-form"
              style={{ border: '1px solid #ccc', borderRadius: '5px' }}
            >
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>付款方式</Form.Label>
                  <Form.Control as="select" onChange={this.handlePayment}>
                    <option value="default">請選擇</option>
                    <option value="信用卡" onChange={this.handlePayment}>
                      信用卡
                    </option>
                    <option value="便利商店繳費" onChange={this.handlePayment}>
                      便利商店繳費
                    </option>
                  </Form.Control>
                  <div style={{ display: `${this.state.creditDisplay}` }}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Container>
                        <Form.Label>卡號</Form.Label>
                        <Form.Control />
                        <Form.Label>安全碼</Form.Label>
                        <Form.Control />
                        <Form.Label>有效日期</Form.Label>
                        <Form.Control />
                      </Container>
                    </Form.Group>
                  </div>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>贊助金額</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handlePrice}
                    required
                  >
                    <option value="default">請選擇</option>
                    <option value="1000" onChange={this.handlePrice}>
                      1000
                    </option>
                    <option value="2000" onChange={this.handlePrice}>
                      2000
                    </option>
                    <option value="3000" onChange={this.handlePrice}>
                      3000
                    </option>
                    <option value="" onChange={this.handlePrice}>
                      ----
                    </option>
                    <option value="10000" onChange={this.handlePrice}>
                      10000
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>姓名</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="王小明"
                    onChange={this.handleBacker}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>備註</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="請填寫備註"
                    onChange={this.handleComment}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    required
                    label="同意接受服務條款 及隱私權保護政策"
                    feedback="請點選同意接受服務條款 及隱私權保護政策"
                  />
                </Form.Group>
                <Button
                  className="buttons"
                  variant="secondary"
                  type="button"
                  style={{
                    background: 'black',
                  }}
                  onClick={this.handleSubmit}
                >
                  送出
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  a: state.alertReducer,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ alertAppear }, dispatch)

// export default withRouter(CourseBackItForm)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseBackItForm))
