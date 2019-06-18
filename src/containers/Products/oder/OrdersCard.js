import React from 'react'
import classes from './oder.module.css'
import { TweenMax } from 'gsap/all'
import { Transition } from 'react-transition-group'
import Card from 'react-bootstrap/Card'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Container, Col, Row } from 'react-bootstrap'

const startState = { autoAlpha: 0, y: -50 }

class OrdersCard extends React.Component {
  constructor(props) {
    super(props)
    const orders = this.props.orders
    this.state = {
      orders: this.props.orders,
    }
  }

  render() {
    //  console.logJSON.parse(this.props.cart.p_sid)[0])
    // console.log(JSON.parse(this.props.cart))
    let a = JSON.parse(this.props.cart)

    console.log(a)
    return (
      <>
        <Card className={classes.OderCardTop}>
          <div className="row">
            {a.map(item => (
              <Row>
                <Col style={{ textAlign: 'center', marginTop: '4rem' }} md={5}>
                  <Card.Img
                    variant="top"
                    src={item.p_photo}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Title style={{ marginTop: '4rem' }}>
                    商品名:{item.p_name}
                  </Card.Title>
                  <Card.Text>商品車種:{item.p_genre}</Card.Text>
                  <Card.Text>商品品牌:{item.p_brand}</Card.Text>
                  <Card.Text>商品說明:{item.p_description}</Card.Text>
                  <Card.Text>數量:{item.quantity}</Card.Text>
                  <Card.Text>付款方式:{this.props.pay}</Card.Text>
                  <Card.Text>配送方式:{this.props.delivery}</Card.Text>

                  <Card.Body>
                    <Card.Text className={classes.Space}>
                      NT:{this.props.totalprice}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            ))}

            {/* {a.map(item=>(
                  <Col md={5}>
                  <Card.Title style={{ marginTop: '4rem' }}>
                    商品名:{item.p_name}
                  </Card.Title>
                  <Card.Text>商品車種:{item.p_genre}</Card.Text>
                  <Card.Text>商品品牌:{item.p_brand}</Card.Text>
                  <Card.Text>商品說明:{item.p_description}</Card.Text>
                  <Card.Text>數量:{item.quantity}</Card.Text>
                  <Card.Text>付款方式:{this.props.pay}</Card.Text>
                  <Card.Text>配送方式:{this.props.delivery}</Card.Text>

                  <Card.Body>
                    <Card.Text className={classes.Space}>NT:{this.props.totalprice}</Card.Text>
                  </Card.Body>
                </Col>
                ))} */}
          </div>
        </Card>
      </>
    )
  }
}

export default OrdersCard
