import React from "react";
import classes from "./Group.module.css";
import { TweenMax } from "gsap/all";
import { Transition } from "react-transition-group";

const startState = { autoAlpha: 0, y: -50 };

const group = props => {
  return (
  <Transition
    unmountOnExit
    in={props.show}
    timeout={1000}
    onEnter={node => TweenMax.set(node, startState)}
    addEndListener={ (node, done) => {
      TweenMax.to(node, 0.5, {
        autoAlpha: props.show ? 1 : 0,
        y: props.show ? 0 : 50,
        onComplete: done
      });
    }}
  >    
  <div className={classes.Group}>
  {props.children}
  </div>
  </Transition>
  )
};

export default group;
