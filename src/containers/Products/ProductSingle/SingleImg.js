// import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from '../Products.module.css'
import { Container, Col, Row } from 'react-bootstrap'
// var React = require('react');
import { Component } from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'


class SingleImg extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    console.log(this.props.p_photo)
    return (
      <>
        <Carousel
          autoPlay
          showIndicators={false}
          showStatus={false}
          width="40rem"
          interval="4000"
          style={{ backgroundColor: 'white'}}
        >
          <div style={{ backgroundColor: 'white' , width:'100%' ,height:'40rem'}}>
            <img src={this.props.product.p_photo} style={{ backgroundColor: 'white'}} />
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div style={{ backgroundColor: 'white' , width:'100%' ,height:'40rem'}}>
            <img src={this.props.product.p_photo2} style={{ backgroundColor: 'white'}}/>
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div style={{ backgroundColor: 'white', width:'100%' ,height:'40rem' }}>
            <img src={this.props.product.p_photo3} />
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>
      </>
    )
  }
}

export default SingleImg
