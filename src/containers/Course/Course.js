import React from "react";
import {TweenMax,} from "gsap/all";
import {Transition} from "react-transition-group";
import CourseList from "./containers/CourseList";


const startState = {autoAlpha: 0, y: -50};

class Course extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      course: [],
    }
  }

  render () {
    return (
      <Transition
        unmountOnExit
        in={this.props.show}
        timeout={1000}
        onEnter={node => TweenMax.set(node, startState)}
        addEndListener={(node, done) => {
          TweenMax.to(node, 0.5, {
            autoAlpha: this.props.show ? 1 : 0,
            y: this.props.show ? 0 : 50,
            onComplete: done,
          })
        }}
      >
          <CourseList/>
      </Transition>

    )
  };
};

export default Course;
