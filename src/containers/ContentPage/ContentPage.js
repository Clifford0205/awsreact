import React from "react";
import classes from "./ContentPage.module.css";
import { TweenMax, Power1 } from "gsap/all";
import Container from "react-bootstrap/Container";


class ContentPage extends React.Component {
  constructor(props){
    super(props);
    this.content = null;

  }
  
  componentDidMount(){
    TweenMax.to(this.content, 1.5, {
      
      opacity: 1,
      ease: Power1.easeOut
    })
  }
  componentDidUpdate(){
   
  }

  render() {
    return <div id="content-page" className={classes.ContentPage} ref={el => this.content = el}>
    <Container fluid={true}>
     
      {this.props.children}
     
    </Container>
     
    </div>
  }
}

export default ContentPage;
