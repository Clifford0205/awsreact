import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Nav, Alert } from 'react-bootstrap'
import CourseList from '../containers/CourseList'
import CourseInfo from '../containers/CourseInfo'
import CourseQandA from '../containers/CourseQandA'
import CourseUpdate from '../containers/CourseUpdate'
import CourseComment from '../containers/CourseComment'
import CourseBackItForm from '../containers/CourseBackItForm'
import CoachInfo from '../containers/CoachInfo'
import Container from 'react-bootstrap/Container'

function SortTab() {
  return (
    <>
      <Container>
        <Router>
          <Nav variant="tabs" defaultActiveKey="/CourseInfo">
            <Nav.Item>
              <Nav.Link href="/CourseInfo" eventKey="CourseInfo">
                熱門課程
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/CoachInfo" eventKey="CoachInfo">
                最新課程
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/CourseQandA" eventKey="CourseQandA">
                更多課程
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Switch>
            <Route path="/CourseInfo" component={CourseInfo} />
            <Route path="/CoachInfo" component={CoachInfo} />
            <Route path="/CourseQandA" component={CourseQandA} />
          </Switch>
        </Router>
      </Container>
    </>
  )
}

export default SortTab
