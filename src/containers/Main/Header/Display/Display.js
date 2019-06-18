import React from "react";
import image from "../../../../image/display.png";
import logo from "../../../../image/wheel-logo.png";
import classes from "./Display.module.css";
import { TweenMax, Power1 } from "gsap/all";

class display extends React.Component {
  constructor(props) {
    super(props);
    this.display = null;
  }

  componentDidMount() {
    TweenMax.from(this.display, 2, {
      x: -1000,
      opacity: 0,
      scale: 0.1,
      ease: Power1.easeOut
    });
  }

  render() {
    return (
      <div className={classes.Display}>
        <figure>
          <img src={logo} alt="wheel" />
        </figure>
        <img src={image} alt="..." ref={el => (this.display = el)} />
      </div>
    );
  }
}

export default display;
