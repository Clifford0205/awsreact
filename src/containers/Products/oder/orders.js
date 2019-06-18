import React from 'react'
import classes from './oder.module.css'

import OrdersCard from './OrdersCard'
import { TweenMax } from 'gsap/all'
import { Transition } from 'react-transition-group'
import Card from 'react-bootstrap/Card'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Container, Col, Row } from 'react-bootstrap'

const startState = { autoAlpha: 0, y: -50 }

class orders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: null,
      id: null,
    }
  }

  componentDidMount() {
    let id = JSON.parse(localStorage.getItem('meber'))
    console.log(id)

    fetch(`http://18.139.60.49:5000/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ orders: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
   
    console.log(this.state.orders)
    let list3 = null
    if (this.state.orders) {
      list3 = this.state.orders.map((item, index) => {
        return (
          <OrdersCard
            id={item.id}
            cart={item.cart}
            delivery={item.delivery}
            pay={item.pay}
            price={item.p_price}
            totalprice={item.totalprice}
            style={{ border: '1px solid black' }}
          />
        )
      })
    }
    return (
      <>
        <Container className={classes.OderCard}>
          {list3}
          {/* <OrdersCard /> */}
        </Container>
      </>
    )
  }
}

export default orders
