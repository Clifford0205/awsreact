import React from 'react'
import classes from '../Products.module.css'
import { TweenMax } from 'gsap/all'
import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'
import { Container, Col, Row, Table } from 'react-bootstrap'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap'
import { Link } from 'react-router-dom'
const startState = { autoAlpha: 0, y: -50 }

class products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      type: null,
      genre: null,
      filter: null,
      page: 0,
      modal: false,
    }
  }

  //   toggle = () => {
  //     this.setState({
  //       modal: !this.state.modal,
  //     })
  //   }
  //   deleteCartItem = index => {
  //     const cart = JSON.parse(localStorage.getItem('cart'))

  //     cart.splice(index, 1)

  //     this.setState({
  //       cart,
  //     })
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //   }
  render() {
    let totalPrice = 0
    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
      console.log(cart)
      cart.forEach(item => {
        console.log(item.p_price)
        let sum = item.quantity * Number(item.p_price)
        return (totalPrice += sum)
      })

      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
    } else {
      console.log(123)
    }

    return (
      <>
        <Transition
          unmountOnExit
          in={this.props.show}
          timeout={1000}
          onEnter={node => TweenMax.set(node, startState)}
          addEndListener={(node, done) => {
            TweenMax.to(node, 0.5, {
              autoAlpha: this.props.show ? 1 : 0,
              y: this.props.show ? 0 : 50,
              onComplete: done,
            })
          }}
        />
        {/* <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>商品名</th>
                  <th>價格</th>
                  <th>數量</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.p_name}</td>
                    <td>{item.p_price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => this.deleteCartItem(index)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tr>
                <td>總價</td>
                <td />
                <td>NT:{totalPrice}</td>
              </tr>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Link to="/checkout">
              <Button color="primary">結帳</Button>
            </Link>
            <Button color="secondary" onClick={this.toggle}>
              取消
            </Button>
          </ModalFooter>
        </Modal> */}
      </>
    )
  }
}

export default products
