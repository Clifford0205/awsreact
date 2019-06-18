import React from 'react'
import { Badge, Container, Row } from 'react-bootstrap'

class CourseMainTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.course[0],
    }
  }

  // componentDidMount = () => {
  //   console.log(this.props.course)
  //   //繼承每個商品的資料
  // }

  render() {
    return (
      <>
        <Container>
          <Row className="d-flex">
            <h2>{this.state.course.c_title}</h2>
            <h3 className="ml-2">
              <Badge variant="secondary" className="rankBadge">
              {this.state.course.c_level}
            </Badge>
            </h3>
          </Row>
          <Row className="my-lg-2">
            <p>{this.state.course.c_subtitle}</p>
          </Row>
        </Container>
      </>
    )
  }
}

export default CourseMainTitle
