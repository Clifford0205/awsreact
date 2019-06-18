import React from 'react';
import classes from './LogoDisplay.module.css';
import logoImage from '../../../../image/wheel-logo.png';
import smallLogo from '../../../../image/logo.svg';
import { TweenMax, TimelineMax, Power4, Bounce } from 'gsap/all';

class LogoDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.bigLogo = null;
    this.smallLogo = null;
    this.p1 = null;
    this.p2 = null;
    this.p3 = null;
    this.p4 = null;
  }

  componentDidMount() {
    // let tl = new TimelineMax();
    // tl.from(this.p1, 3, {
    //   x: -300,
    //   opacity: 0,
    //   ease: Bounce.easeOut
    // })
    //   .from(
    //     this.p2,
    //     3,
    //     {
    //       x: 300,
    //       opacity: 0,
    //       ease: Bounce.easeOut
    //     },
    //     "-=2"
    //   )
    //   .from(
    //     this.p3,
    //     3,
    //     {
    //       x: -300,
    //       opacity: 0,
    //       ease: Power4.easeOut
    //     },
    //     "-=3"
    //   )
    //   .from(
    //     this.p4,
    //     3,
    //     {
    //       x: -300,
    //       opacity: 0,
    //       ease: Power4.easeOut
    //     },
    //     "-=4"
    //   );
    // let tl2 = new TimelineMax();
    // TweenMax.from(this.smallLogo, 2, {
    //   x: 300,
    //   opacity: 0
    // });
    // tl2
    //   .to(this.smallLogo, 1, {
    //     rotation: "+=50",
    //     ease: Bounce.easeOut,
    //     onComplete: () => onRepeat(tl2)
    //   })
    //   .to(
    //     this.bigLogo,
    //     1,
    //     {
    //       rotation: "-=50",
    //       ease: Bounce.easeOut,
    //       onComplete: () => onRepeat(tl2)
    //     },
    //     "-=1"
    //   );
    // function onRepeat(tl) {
    //   tl.invalidate().restart();
    // }
    // tl
    // .to(this.bigLogo, 4, {
    //   x: 0
    // })
    // .to(this.bigLogo, 5, {
    //   // rotation: 720,
    //   ease: Power4.easeOut
    // }, "-=4")
  }

  render() {
    return (
      <>
        <div className={classes.DisplayLogo}>
          <div className={classes.DisplayLogoInner}>
            {/* <figure
            className={classes.DisplaySmallLogo}
            ref={el => (this.smallLogo = el)}
          >
            <img alt="small-logo" src={smallLogo} />
          </figure>
          <figure
            className={classes.DisplayBigLogo}
            ref={el => (this.bigLogo = el)}
          >
            <img alt="logo" src={logoImage} />
          </figure> */}
            <div className={classes.DisplayLogoText}>
              <p ref={el => (this.p1 = el)}>THE</p>
              <p ref={el => (this.p2 = el)}>WHEEL</p>
              <div className={classes.DisplayLogoTextSmall}>
                <p ref={el => (this.p3 = el)}>JOIN THE WORLD</p>
                <p ref={el => (this.p4 = el)}>OF CYCLING</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LogoDisplay;
