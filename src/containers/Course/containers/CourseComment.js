import React from 'react'
import Container from 'react-bootstrap/Container'
// Import Components
import BackerCommentCard from '../components/BackerCommentCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'reactstrap/es/Col'
// import Swal from 'sweetalert2'
import RAlert from '../../Route/components/R_Alert/R_Alert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alertAppear } from '../../Route/actions'
import { withRouter } from 'react-router-dom'

class CourseComment extends React.Component {
  constructor(props) {
    super(props)
    const c_sid = this.props.c_sid
    this.state = {
      isLogined: false,
      user_id: null,
      c_sid: c_sid,
      user: null,
      comment: [],
      m_name: '',
      commentInput: null,
    }
  }

  componentDidMount = () => {
    axios
      .get('http://18.139.60.49:5000/courseComment', {
        params: {
          sid: this.props.c_sid,
        },
      })
      .then(res => {
        // console.log(res.data)
        this.setState({ comment: res.data })
      })
  }

  handleSubmitComment = () => {
    if (localStorage.getItem('meber')) {
      let obj = {
        c_sid: this.props.c_sid,
        m_sid: localStorage.getItem('meber'),
        c_comment: this.state.commentInput,
      }

      fetch('http://18.139.60.49:5000/NewCourseComment', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then(res => res.json())
        .then(res => {
          console.log(res)
          axios
            .get('http://18.139.60.49:5000/courseComment', {
              params: {
                sid: this.props.c_sid,
              },
            })

            .then(res => {
              this.setState({ comment: res.data })
              document.querySelector('#text').value = ''
            })
        })
      // .then(() => localStorage.clear('meber'))
    } else {
      this.props.alertAppear(false, '您需要登入後才能進行贊助')
    }
  }

  handleInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  render() {
    console.log(this.state.user)
    console.log(this.state.comment)
    let list = this.state.comment.map(item => {
      return (
        <>
          <RAlert />
          <BackerCommentCard
            key={item.c_c_sid}
            c_comment={item.c_comment}
            m_name={item.m_name}
            m_photo={item.m_photo}
          />
        </>
      )
    })

    return (
      <>
        <Container fluid style={{ fontSize: '1.2rem' }}>
          <Row className="d-flex justify-content-center">
            <Col lg={10}>
              {list}
            </Col>
          </Row>
          <Container className="my-lg-5">
            <Row className="d-flex justify-content-center">
              <Col lg={8}>
                <Form>
                  <Form.Group>
                    <Form.Label className="text-center">
                      對這個課程有任何問題嗎？先看看<strong>問與答</strong>
                      或是直接在下面留言！
                    </Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder="請輸入留言內容"
                      id="text"
                      onChange={this.handleInput}
                    />
                    <Form.Text className="text-muted text-left">
                      留言區為討論課程內容用。
                      <br />
                      請勿張貼私下交易（含揪團）、廣告、個資、或其他違反使用條款的內容。
                    </Form.Text>
                  </Form.Group>
                  <div className="text-right">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={this.handleSubmitComment}
                    >
                      送出
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
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

// export default CourseComment
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseComment))
