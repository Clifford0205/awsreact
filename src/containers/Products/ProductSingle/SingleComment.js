import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from '../Products.module.css'
import './SingleComment.css'
import { Link, withRouter } from 'react-router-dom'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import SingleCommentProps from './SingleCommentProps'
// import R Alert made by Ivy
import RAlert from '../../Route/components/R_Alert/R_Alert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alertAppear } from '../../Route/actions'

class ProductsCard extends React.Component {
  constructor(props) {
    super(props)
    const p_sid = this.props.p_sid
    this.state = {
      isLogined: false,
      user_id: null,
      p_sid: null,
      user: null,
      comment: [],
      m_name: '',
      commentinput: null,
    }
  }

  componentDidMount = () => {
    // let p_sid = this.props.p_sid

    // fetch("http://18.139.60.49:5000/is_logined", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {

    // if (this.props.p_sid) {
    // this.setState({ user: data });

    axios
      .get('http://18.139.60.49:5000/comment', {
        params: {
          sid: this.props.p_sid,
        },
      })
      .then(res => {
        console.log(res.data)

        this.setState({ comment: res.data })
      })
      .then(res => {
        console.log('123')
      })
    // }
    //   })
  }
  handleSubmitComment = () => {
    let comment = this.state.comment
    var obj = {
      p_sid: this.props.p_sid,
      m_sid: localStorage.getItem('meber'),
      p_comment: this.state.commentinput,
    }
    if (localStorage.getItem('meber')) {
      fetch('http://18.139.60.49:5000/NEWcomment', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then(res => res.json())
        .then(res => {
          //  console.log(res)
          axios
            .get('http://18.139.60.49:5000/comment', {
              params: {
                sid: this.props.p_sid,
              },
            })

            .then(res => {
              this.setState({ comment: res.data })
              document.querySelector('#text').value = ''
              // localStorage.removeItem("meber");
            })
        })
    } else {
      // alert('請登入會員')
      this.props.alertAppear(false, '請登入會員')
    }
  }

  handleInput = event => {
    this.setState({
      commentinput: event.target.value,
    })
  }

  render() {
    // console.log(localStorage.getItem('meber'))
    let list = null
    list = this.state.comment.map(item => {
      return (
        <SingleCommentProps
          p_comment={item.p_comment}
          m_name={item.m_name}
          m_photo={item.m_photo}
        />
      )
    })

    return (
      <>
        <RAlert />
        <Row className="d-flex justify-content-center m-0">
          <Col xs={11} xl={9} className="mb-5 px-0">
            <Col className="r_fw_bold r_fs_18 py-3 py-sm-5 mb-3">留言</Col>
            {list}
            <Col className="d-flex justify-content-end">
              <Col sm={9} className="p-3 w-100 my-sm-4 ">
                <form name="form_comment">
                  <input name="m_sid" readOnly className="d-none" />
                  <input name="r_sid" className="d-none" readOnly />
                  <div className="w-100">
                    <textarea
                      id="text"
                      name="r_c"
                      className="r_leave_comment w-100 p-3"
                      onChange={this.handleInput}
                    />
                  </div>
                  <button
                    className="r_comment_btn py-1 px-4 my-2 r_fw_bold"
                    type="button"
                    onClick={this.handleSubmitComment}
                  >
                    留言
                  </button>
                </form>
              </Col>
            </Col>
          </Col>
        </Row>
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

// export default ProductsCard
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductsCard))
