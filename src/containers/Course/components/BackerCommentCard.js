import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

class BackerCommentCard extends React.Component {
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
    }
  }
  render() {
    return (
      <>
        <Container className="p-lg-2">
          <Row className="justify-content-md-center">
            <Container style={{ background: '#FAFAFA' }} className="p-lg-3">
              <Row className="justify-content-md-center align-items-center d-flex justify-content-center">
                <Col lg={2} className="align-items-center">
                  <Image
                    src={this.props.m_photo}
                    roundedCircle
                    style={{ height: '50px' }}
                  />
                  <p>
                    {this.props.m_name}
                    {/*<br />*/}
                    {/*2019/05/19*/}
                  </p>
                </Col>
                <Col lg={8}>{this.props.c_comment}</Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </>
    )
  }
}

export default BackerCommentCard
