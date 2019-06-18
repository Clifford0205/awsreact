import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from '../Products.module.css'
import './SingleComment.css'
import { Link } from 'react-router-dom'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Col,Row } from 'react-bootstrap'
import axios from "axios";

class ProductsCard extends React.Component {
  constructor(props) {
    super(props)
    const p_sid = this.props.p_sid
    this.state = {
      isLogined:false,
      user_id:null,
      p_sid:p_sid,
      user:null,
      comment:[],
      m_name:''
    }

  }
  
 
 


  render() {
   
    return (
      <>
                    <Col>
                                <Row
                                   
                                    className="r_single_comment p-1 p-sm-3 w-100 my-2 my-sm-4 mx-0"
                                >
                                    <Col xs={5} sm={3} className="d-flex">
                                        <div className="d-flex flex-column align-items-center">
                                            <div
                                                className="r_comment_avstar"
                                                style={{
                                                    backgroundImage: `url(${
                                                        this.props.m_photo
                                                    })`,
                                                }}
                                            />
                                            <p className="r_fw_bold m-0 mt-1 mt-sm-2">
                                            {this.props.m_name}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={7}
                                        sm={9}
                                        className="p0 p-sm-3 d-flex flex-column justify-content-between"
                                    >
                                        <div className="d-flex align-items-center flex-grow-1">
                                        {this.props.p_comment}
                                        </div>
                                        <div className="text-right">
                                         
                                        </div>
                                    </Col>
                                </Row>
                          
                      
                    </Col>
         
      </>
    )
  }
}

export default ProductsCard
