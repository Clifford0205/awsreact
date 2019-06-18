import React from 'react'
// React Bootstrap Components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from 'react-bootstrap/Card'
// Button Components
import { BackItButton, LikeItButton, SNSButtons } from './../components/Buttons'

class CourseBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.course[0],
    }
  }

  render() {
    // Transfer Portal For Props
    let cover = this.state.course.c_cover
    let backers = this.state.course.c_backers
    let fundNow = this.state.course.c_fundNow
    let fundGoal = this.state.course.c_fundGoal
    let endDate = this.state.course.c_endDate
    let status = this.props.status

    let percentage = parseInt((fundNow / fundGoal) * 100)

    let now = new Date().getTime()
    let countDownDate = new Date(endDate).getTime()
    let distance = countDownDate - now
    let days = 0
    if (distance > 0) days = Math.floor(distance / (1000 * 60 * 60 * 24))
    else days = '-'

    return (
      <>
        <div className="mb-3 d-flex" style={{ background: '#FCFCFC' }}>
          <div className="bannerLabel" />
          <Row>
            <Col sm={4}>
              <Card.Img src={cover} />
            </Col>
            <Col sm={8}>
              <Card.Body className="pt-lg-5">
                <Row>
                  <Col>
                    <b>{status}</b>
                  </Col>
                  <Col>
                    目前贊助人數 <b>{backers}</b>人
                  </Col>
                </Row>
                <p>截止日期　{endDate}</p>
                <Row>
                  <Col sm={8}>
                    <ProgressBar
                      variant="danger"
                      now={percentage}
                      label={`${percentage}%`}
                    />
                  </Col>
                  <Col sm={4}>
                    <p>
                      剩餘時間 <b>{days}</b> 天
                    </p>
                  </Col>
                </Row>
                <p>
                  集資金額 NT$ <b>{fundNow}</b> / NT$ {fundGoal}
                </p>
                <Row>
                  <Col sm={6}>
                    <SNSButtons buttonDisplay={this.props.buttonDisplay} />
                  </Col>
                  <Col sm={6} className="d-flex">
                    <div className="m-2">
                      <BackItButton
                        sid={this.state.course.c_sid}
                        buttonDisplay={this.props.buttonDisplay}
                      />
                    </div>
                    <div className="m-2">
                      <LikeItButton
                        buttonDisplay={this.props.buttonDisplay}
                        collectHandler={this.props.collectHandler}
                        isLiked={this.props.isLiked}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default CourseBanner
