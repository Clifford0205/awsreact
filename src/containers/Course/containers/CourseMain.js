import React from 'react'
// React Bootstrap
import { Container } from 'react-bootstrap'
// Import Stylesheet
import './course.scss'
// React Router
import { withRouter } from 'react-router-dom'
// Import axios
import axios from 'axios'
// Import Components
import MapDiv from '../components/MapDiv'
import CourseNav from '../components/CourseNav'
import CourseMainTitle from '../components/CourseMainTitle'
import CourseBanner from '../components/CourseBanner'
import CourseTab from '../components/CourseTab'

class CourseMain extends React.Component {
  // Initializing
  constructor(props) {
    super(props)
    this.state = {
      // map_display: true,
      c_sid: null,
      course: null,
      c_status: 0,
      // Show buttons or not
      buttonDisplay: 'block',
      // Check collect or not
      user_id: '',
      collectionCourse: [],
      user: null,
      isLiked: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.course) {
      let c_sid = this.state.c_sid
      fetch(`http://18.139.60.49:5000/course/${c_sid}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ course: data })
          if (data[0].c_fundNow >= data[0].c_fundGoal)
            this.setState({ c_status: '集資成功' })
          else this.setState({ c_status: '集資中' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  componentDidMount() {
    // get id from url
    // 8 spaces of strings - "/course/"
    let c_sid = +this.props.history.location.pathname.slice(8)
    this.setState({ c_sid: c_sid })
    // check login status
    fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        // 若為登入狀態
        if (data.user_id) {
          this.setState({ user: data })
          axios
            .get('http://18.139.60.49:5000/collectionCourse', {
              params: {
                sid: data.user_id,
              },
            })
            .then(res => {
              // 將此會員已收藏的課程ID從c_course欄位拿出來，並指定至collectionCourse狀態
              this.setState({
                collectionCourse: JSON.parse(res.data[0].c_course),
              })
            })
            .then(() => {
              if (this.state.collectionCourse) {
                let collectionCourse = this.state.collectionCourse
                for (let item of collectionCourse) {
                  // 當collectionCourse裡面有此課程的ID：
                  if (item === c_sid) {
                    this.setState({ isLiked: true })
                    break
                  } else {
                    this.setState({ isLiked: false })
                  }
                }
              }
            })
        }
      })
  }

  // Methods
  collectHandler = () => {
    let collectionCourse = []
    console.log(collectionCourse)
    let c_sid = +this.props.history.location.pathname.slice(8)
    if (this.state.collectionCourse) {
      collectionCourse = this.state.collectionCourse
    }
    let isLiked = false

    if (collectionCourse.length > 0) {
      for (let id of collectionCourse) {
        if (id === c_sid) {
          collectionCourse = collectionCourse.filter(item => item !== c_sid)
          isLiked = true
          break
        }
      }
    }

    if (!isLiked) {
      collectionCourse.push(c_sid)
      this.setState({ collectionCourse: collectionCourse })
    }
    axios
      .post('http://18.139.60.49:5000/collectionCourse_update', {
        collectionCourse: JSON.stringify(collectionCourse),
        sid: localStorage.meber,
      })
      .then(() => this.setState({ isLiked: !this.state.isLiked }))
  }

  handleStatusCompleted = () => {

  }

  // Rendering
  render() {
    let list0 = null
    let list1 = null
    let list2 = null
    let list3 = null
    let list4 = null
    if (this.state.course) {
      list0 = <CourseNav />
      list1 = <CourseMainTitle course={this.state.course} />
      list2 = (
        <CourseBanner
          course={this.state.course}
          buttonDisplay={this.state.buttonDisplay}
          collectHandler={this.collectHandler}
          isLiked={this.state.isLiked}
          status={this.state.c_status}
        />
      )
      list3 = <CourseTab course={this.state.course} />
      list4 = <MapDiv course={this.state.course} />
    }

    // check collect status`
    // console.log(this.state)
    // if (this.state.myCollect !== '') {
    //   console.log(JSON.parse(this.state.myCollect))
    // }
    let collected = false
    if (this.state.collection) {
      if (this.state.collection.length > 0) {
        for (let sid of this.state.collection) {
          if (sid === +this.props.selectedSid) {
            collected = true
          }
        }
      }
    }
    return (
      <>
        <Container fluid className="p-0">
          <div style={{ height: '35px' }} />
          {list0}
          {list1}
          {list2}
          {list3}
          {list4}
        </Container>
      </>
    )
  }
}

export default withRouter(CourseMain)
