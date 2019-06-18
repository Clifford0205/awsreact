import React from 'react'
// React Bootstrap
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
// React Router Dom
import { Link } from 'react-router-dom'
// StyleSheet
import './components.css'
// Import Images
import wheelIcon from '../images/wheel_icon.svg'

class CourseListCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // Methods
  handleClick = () => {
    // console.log (this.props.sid)
    this.setState({
      sid: this.props.sid,
    })
  }

  render() {
    // Transfer Portal For Props
    const sid = this.props.sid
    const title = this.props.title
    const coachName = this.props.coachName
    const coachAvatar = this.props.coachAvatar
    const coachNationality = this.props.coachNationality
    const courseDate = this.props.courseDate
    const fundNow = this.props.fundNow
    const fundGoal = this.props.fundGoal
    const endDate = this.props.endDate
    const intro = this.props.intro
    const cover = this.props.cover
    const level = this.props.level
    const location = this.props.location
    let percentage = parseInt((fundNow / fundGoal) * 100)

    let status = ''
    if (fundNow >= fundGoal) status = '集資成功'
    else status = '集資中'

    let now = new Date().getTime()
    let countDownDate = new Date(endDate).getTime()
    let distance = countDownDate - now
    let days = 0
    if (distance > 0) days = Math.floor(distance / (1000 * 60 * 60 * 24))
    else days = '-'

    return (
      <>
        <Container fluid className="py-lg-3 mg-lg-0">
          <Row className="justify-content-center">
            <Col md={10}>
              <Row className="py-lg-0 px-0 course-list-card">
                <Col
                  md={3}
                  className="course-list-card-cover m-0 p-0"
                  style={{ background: '#ffffff' }}
                >
                  <img
                    src={cover}
                    alt="coverImg"
                    className="course-list-card-cover-img"
                  />
                </Col>
                <Col
                  md={3}
                  style={{ background: '#ffffff', position: 'relative' }}
                  className="py-lg-3 pl-lg-5"
                >
                  <h5>{title}</h5>
                  <p className="truncate">{intro}</p>
                  <Badge
                    className="rankBadge mr-lg-3 my-lg-2 p-lg-2 mb-lg-4"
                    style={{ background: '#000000', color: '#ffffff' }}
                  >
                    {level}
                  </Badge>
                  <p className="mt-lg-3">
                    上課地點：<b>{location}</b>
                  </p>
                  <br />
                  <br />
                  <Link to={`/course/${sid}`}>
                    <Button
                      variant="link"
                      className="courseMoreInfo"
                      onClick={this.handleClick}
                      style={{
                        color: '#f52a2a',
                        fontWeight: '700',
                        padding: '0',
                        position: 'absolute',
                        bottom: '1rem',
                      }}
                    >
                      查看課程資訊
                    </Button>
                  </Link>
                </Col>
                <Col
                  md={2}
                  style={{ background: '#ffffff' }}
                  className="py-lg-3"
                >
                  <p style={{ marginBottom: '0' }}>
                    <b>教練</b>
                  </p>
                  <img
                    src={coachAvatar}
                    alt={' '}
                    style={{
                      height: '80px',
                      width: 'auto',
                      borderRadius: '50%',
                      margin: '0.5rem',
                    }}
                  />
                  <p>
                    <b>{coachName}</b>
                    <br />
                    <div className="mt-lg-3">
                      國籍：
                      <br />
                      <b>{coachNationality}</b>
                    </div>
                  </p>
                </Col>
                <Col
                  md={4}
                  style={{ background: '#ffffff' }}
                  className="py-lg-3"
                >
                  <Row>
                    <Col md={6}>
                      <p>
                        <b>{status}</b>
                      </p>
                    </Col>
                    <Col md={6}>
                      <p>
                        剩餘時間 <b>{days}</b> 天
                      </p>
                    </Col>
                  </Row>
                  <div className="pt-lg-2 pb-lg-4 pr-lg-5">
                    <ProgressBar
                      // variant="danger"
                      className="progress progressbar"
                      now={percentage}
                      label={`${percentage}%`}
                      style={{ fontWeight: '700' }}
                    />
                  </div>
                  <p>
                    集資金額{' '}
                    <span className="fundNow r_color_red">NT$ {fundNow}</span> /
                    NT$ {fundGoal}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      position: 'absolute',
                      bottom: '1rem',
                      right: '4rem',
                    }}
                  >
                    集資結束時間：{endDate}
                  </p>
                </Col>
                <img src={wheelIcon} className="wheelIcon wheelIconRotate" />
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default CourseListCard
