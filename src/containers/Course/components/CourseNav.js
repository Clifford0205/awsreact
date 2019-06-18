import React from 'react'
import { Nav, Row, Col } from 'react-bootstrap'
import { ReturnButton } from './Buttons'
import Container from 'react-bootstrap/Container'

const CourseNav = props => {
  return (
    <>
      <Container className="px-0 pt-lg-5 pb-lg-3">
        <Row>
          <ReturnButton />
          {/*<Col>*/}
          {/*  <Nav className="justify-content-end">*/}
          {/*    <Nav.Item>*/}
          {/*      <Nav.Link href="/course/hot">熱門課程</Nav.Link>*/}
          {/*    </Nav.Item>*/}
          {/*    <Nav.Item>*/}
          {/*      <Nav.Link href="/course/latest">最新課程</Nav.Link>*/}
          {/*    </Nav.Item>*/}
          {/*    <Nav.Item>*/}
          {/*      <Nav.Link href="/course">更多課程</Nav.Link>*/}
          {/*    </Nav.Item>*/}
          {/*  </Nav>*/}
          {/*</Col>*/}
        </Row>
      </Container>
    </>
  )
}

export default CourseNav
