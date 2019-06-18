import React from "react"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import classes from "./FastLink.module.css";
import image1 from "../../../image/1.png";
import image2 from "../../../image/2.png";
import image3 from "../../../image/3.png";
import { TweenMax, Power4 } from "gsap/all";
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;

class FastLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isAnimated: false,
    }
    this.observer = null;
    this.fast = null;
  }

  componentDidMount(){
    console.log(this.state);
    const callback = entries => {
      console.log(entries);
      if(!this.state.isAnimated && entries[0].isIntersecting){
        TweenMax.fromTo(entries[0].target, 2,{
          y: 400,
          opacity: 0,
          ease: Power4.easeOut
        },{
          y: 0,
          opacity: 1,
          onComplete: this.setState({isAnimated: true}),
        });
      }
    }
    this.observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.3,
    });
    let fast = document.querySelector("article");
    this.observer.observe(fast);
   

  }

  componentWillMount(){
    this.setState({isAnimated: false});
  }


    render(){
      return (
      <article className={classes.FastLink} ref={el => this.fast =el}>
        <Container fluid>
          <Row noGutters>
            <Col lg={4}>
              <div className={classes.Links}>
                <div>BMX</div>
                <figure>
                  <img alt="img" src={image1}/>
                </figure>
                <a href="#">揪團</a>
              </div>
            </Col>
            <Col lg={4}>
              <div className={classes.Links}>
                <div>單速車</div>
                <figure>
                  <img alt="img" src={image2}/>
                </figure>
                <a href="#">揪團</a>
              </div>
            </Col>
            <Col lg={4}>
              <div className={classes.Links}>
                <div>公路車</div>
                <figure>
                  <img alt="img" src={image3}/>
                </figure>
                <a href="#">揪團</a>
              </div>  
            </Col>
          </Row>
        </Container>
      </article> 
      );
  }
}

export default FastLink;