import React from "react";

class Verification extends React.Component{
  constructor(props){
    super(props);
    this.canvas = null;
  }
  
  componentDidUpdate(){
   
  }

  render(){
      if(this.props.code && this.canvas){
      let ctx = this.canvas.getContext("2d");
      ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
      ctx.font = "30px April";
      ctx.strokeText(this.props.code, 10, 50);
      }
    return(
    <div>
      <canvas width="130px" height="110px" ref={el => this.canvas = el}></canvas>
    </div>
    );
  }
}


export default Verification;