import React from "react";
import { TweenMax, TimelineMax, Bounce } from "gsap/all";
import classes from "./Loading.module.css";
import { isAnimated } from "../../store/loadingActions";
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadingTop = null;
    this.loadingBtm = null;
    this.loadingText = null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let tl = new TimelineMax({});
    tl.staggerFrom(
      this.loadingText.childNodes,
      1.5,
      {
        y: -300,
        opacity: 0,
        ease: Bounce.easeOut
      },
      0.5
    )
      .to(
        this.loadingTop,
        2,
        {
          x: -2000,
          opacity: 0
        },
        "-=2"
      )
      .to(
        this.loadingBtm,
        2,
        {
          x: 2000,
          opacity: 0
        },
        "-=2"
      )
      .to(this.loadingText, 1, {
        opacity: 0,
        onComplete: () => dispatch(isAnimated())
      });
  }

  render() {
    return (
      <>
        <div
          className={classes.LoadingTop}
          ref={el => (this.loadingTop = el)}
        />
        <div
          className={classes.LoadingText}
          ref={el => (this.loadingText = el)}
        >
          <p>L</p>
          <p>O</p>
          <p>A</p>
          <p>D</p>
          <p>I</p>
          <p>N</p>
          <p>G</p>
        </div>
        <div
          className={classes.LoadingBtm}
          ref={el => (this.loadingBtm = el)}
        />
      </>
    );
  }
}

export default Loading;
