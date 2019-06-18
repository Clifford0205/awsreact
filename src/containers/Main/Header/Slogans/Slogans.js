import React from "react";
import classes from "./Slogans.module.css";
import { TimelineMax, Power4 } from "gsap/all";

class Slogans extends React.Component {
  constructor(props) {
    super(props);
    this.slogan1 = null;
    this.slogan2 = null;
    this.slogan3 = null;
  }

  componentDidMount() {
    let tl = new TimelineMax();

    tl.from(this.slogan1, 1.5, {
      x: -300,
      opacity: 0,
      ease: Power4.easeOut
    })
      .from(
        this.slogan2,
        1,
        {
          x: -300,
          opacity: 0,
          ease: Power4.easeOut
        },
        "-=0.7"
      )
      .from(
        this.slogan3,
        1,
        {
          x: -300,
          opacity: 0,
          ease: Power4.easeOut
        },
        "-=0.7"
      );
  }

  render() {
    return (
      <div className={classes.Slogans}>
        <div ref={el => (this.slogan1 = el)}>
          <h6>MORE</h6>
          <h6>ADVENTURES</h6>
        </div>
        <div ref={el => (this.slogan2 = el)}>
          <h6>MORE</h6>
          <h6>EXCITEMENT</h6>
        </div>
        <div ref={el => (this.slogan3 = el)}>
          <h6>MORE</h6>
          <h6>FUN</h6>
          <h6>WITH</h6>
          <h6>FRIENDS</h6>
        </div>
      </div>
    );
  }
}

export default Slogans;
