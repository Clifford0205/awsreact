import React from 'react'
// Import Components
import AdvanceSearch from '../components/AdvanceSearch'
import CourseListCard from '../components/CourseListCard'
// Import React Bootstrap
import { Container } from 'react-bootstrap'
import Col from 'reactstrap/es/Col'

class CourseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: [],
      // 搜尋課程難度（c_level課程難度）
      search_level: null,
      // 搜尋開課地區（c_courseLocation開課地區）
      search_region: null,
      // 搜尋集資結束日期（c_endDate集資截止日期）
      search_date: null,
      // 搜尋關鍵字（c_title標題、c_intro課程內容）
      search_input: null,
      // course status
      c_status: '',
    }
  }

  // For search bar
  // 改變Search 課程難度 的值
  handleLevel = event => {
    this.setState(
      {
        search_level: event.target.value,
      },
      () => console.log(this.state.search_level)
    )
  }
  // 改變Search 地區 的值
  handleRegion = event => {
    this.setState(
      {
        search_region: event.target.value,
      },
      () => console.log(this.state.search_region)
    )
  }
  // 改變Search 日期 的值
  handleDate = event => {
    this.setState(
      {
        search_date: event.target.value,
      },
      () => console.log(this.state.search_date)
    )
  }
  // 改變Search 搜尋列 的值
  handleInput = event => {
    this.setState(
      {
        search_input: event.target.value,
      },
      () => console.log(this.state.search_input)
    )
  }

  handleSearch = props => {
    //  console.log(this.state.type)
    let obj = {
      search_level: this.state.search_level,
      search_region: this.state.search_region,
      search_date: this.state.search_date,
      search_input: this.state.search_input,
    }
    // console.log(obj)
    fetch('http://18.139.60.49:5000/course/search', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({ course: data }, () => {
          this.setState({
            search_level: null,
            search_region: null,
            search_date: null,
            search_input: null,
          })
        })
      })
      .then(console.log('handleSearch done'))
      .catch(err => {
        console.log(err)
      })
  }

  // Get data from database
  componentDidMount() {
    fetch('http://18.139.60.49:5000/course')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({ course: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    let list = null
    if (this.state.course) {
      list = this.state.course.map(item => {
        return (
          <CourseListCard
            key={item.c_sid}
            sid={item.c_sid}
            title={item.c_title}
            coachName={item.c_coachName}
            coachAvatar={item.c_coachAvatar}
            coachNationality={item.c_coachNationality}
            courseDate={item.c_courseDate}
            fundNow={item.c_fundNow}
            fundGoal={item.c_fundGoal}
            endDate={item.c_endDate}
            intro={item.c_intro}
            cover={item.c_cover}
            level={item.c_level}
            location={item.c_courseLocation}
          />
        )
      })
    }
    return (
      <>
        <div style={{ height: '35px'}} />
        <div style={{ height: '48px'}} />
        <Container fluid className="d-flex justify-content-center p-0">
          <Col lg={10} className="p-0 m-0">
            <p className="r_fs_20 m-0 r_color_red r_fw_extra_bold">集資課程</p>
            <p className="m-0 r_fw_medium mt-1">
              專業教練帶你入門競技單車的世界
            </p>
          </Col>
          <div style={{ height: '88px' }} />
        </Container>
        <Container fluid className="course-list" style={{background: '#ffffff'}}>
          <AdvanceSearch
            handleLevel={this.handleLevel}
            handleRegion={this.handleRegion}
            handleDate={this.handleDate}
            handleInput={this.handleInput}
            handleSearch={this.handleSearch}
          />
        </Container>
        <Container fluid className="pl-0 pr-0 pb-5 pt-5 mt-3" style={{background: '#fafafa'}}>
          {list}
        </Container>
      </>
    )
  }
}

export default CourseList
