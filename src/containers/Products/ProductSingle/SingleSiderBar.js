import React from 'react'
import classes from '../Products.module.css'
import { Container, Col, Row, Form } from 'react-bootstrap'
import { IoIosCart } from 'react-icons/io'
import { withRouter } from 'react-router-dom'
import {
  Jumbotron,
  Card,
  CardImg,
  CardBlock,
  CardTitle,
  CardSubtitle,
  CardText,
  Table,
} from 'react-bootstrap'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap'
// import { Link } from 'react-router-dom'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'

// import { IoIosCart } from 'react-icons/io'
// import ControlledCarousel from './ControlledCarousel'
// import { IoIosHand } from 'react-icons/io'
// import R Alert made by Ivy
import RAlert from '../../Route/components/R_Alert/R_Alert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alertAppear } from '../../Route/actions'

class SingleSiderBar extends React.Component {
  constructor(props) {
    super(props)
    const product = this.props.product
    // this.handleShow = this.handleShow.bind(this)
    // this.handleClose = this.handleClose.bind(this)
    // this.toggle = this.toggle.bind(this)
    this.state = {
      modal: this.props.modal,
      product: this.props.product,
      cart: [],
      quantity: 0,
      totalPrice: 0,
    }
  }

  componentDidMount = () => {
    console.log(this.props.product)
    //繼承每個商品的資料
  }

  // toggle() {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal,
  //   }))
  // }
  addToCart = product => {
    let quantity = this.state.quantity
    if (quantity === 0) {
      // alert('請選擇數量')
      this.props.alertAppear(false, '請選擇數量')
    } else {
      if (!localStorage.getItem('cart')) {
        const cart = []
        const item = Object.assign({}, product, { quantity })
        cart.push(item)
        this.setState({
          cart,
        })

        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        const cart = JSON.parse(localStorage.getItem('cart'))
        const item = Object.assign({}, product, { quantity })
        cart.push(item)
        this.setState({
          cart,
        })

        localStorage.setItem('cart', JSON.stringify(cart))
      }
    }
  }

  handleChange = event => {
    const quantity = this.state.quantity

    this.setState(
      {
        quantity: event.target.value,
      },
      () => console.log(this.state)
    )
  }
  // deleteCartItem = index => {
  //   const cart = JSON.parse(localStorage.getItem('cart'))

  //   cart.splice(index, 1)

  //   this.setState({
  //     cart,
  //   })
  //   localStorage.setItem('cart', JSON.stringify(cart))
  // }

  handleBuy = () => {
    let cart = []

    let totalPrice = 0
    // localStorage.setItem('cart', JSON.stringify(cart))
    let quantity = this.state.quantity
    if (quantity === 0) {
      // alert('請選擇數量')
      this.props.alertAppear(false, '請選擇數量')
    } else {
      this.props.history.push('/checkout')
      let product = this.state.product
      // const cart = JSON.parse(localStorage.getItem('cart'))
      const item = Object.assign({}, product, { quantity })
      cart.push(item)
      this.setState({
        cart,
      })

      cart.forEach(item => {
        let sum = item.quantity * Number(item.p_price)
        return (totalPrice += sum)
      })
    }
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  render() {
    let meber = localStorage.getItem('meber')

    const { show, product } = this.state

    let totalPrice = 0
    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(item => {
        let sum = item.quantity * Number(item.p_price)
        return (totalPrice += sum)
      })

      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
    } else {
      console.log(123)
    }
    let cartlength = cart.length
    return (
      <>
        <RAlert />
        <Container
          fluid
          // style={{ width: '90%' }}
          className={classes.SingleSiderBarHight}
          style={{ background: '#f3f3f3' }}
        >
          <Row noGutters>
            <Col sm={2} md={2}>
              <div className={classes.productSideBarCart}>
                <h5
                  className={classes.productSideBarCart2}
                  onClick={this.props.onToggle}
                >
                  {this.props.buttonLabel}
                  <IoIosCart size={25} />
                  購物車({cartlength})
                </h5>
              </div>
              <div className={classes.productSideBarGenre}>
                <p className={classes.productSideBarGenre2}>
                  車種類別:
                  {this.props.product.p_genre}/{this.props.product.p_genre2}
                </p>
              </div>
              <div className={classes.productSideBarBarnd}>
                <p className={classes.productSideBarBarnd2}>
                  單車品牌:
                  {this.props.product.p_brand}
                </p>
              </div>
            </Col>
            <Col sm={5} md={6}>
              <div className={classes.productSideBarPrice} style={{ background: '#f3f3f3' }}>
                <Col className={classes.productSideBarPrice2} md={10}>
                  <h1>NT:{this.props.product.p_price}</h1>
                  <p className="r_fs_20">
                    {this.props.product.p_name}
                    {/* <img src= {this.props.product.photos[0]}></img> */}
                  </p>
                </Col>
                <Col className={classes.productSideBarPrice3} md={5}>
                  <Form.Control
                    style={{ width: '10rem' }}
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option selected value="null">
                      數量
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Form.Control>
                </Col>
              </div>
            </Col>
            <Col className={classes.productSideBarButtonControl} md={4} style={{ background: '#f3f3f3' }}>
              <div style={{ background: '#f3f3f3' }}>
                {/* <Link
                  to={{
                    pathname: `/checkout`,
                  }}
                > */}
                <Button
                  className={classes.productSideBarButton}
                  onClick={this.handleBuy}
                  style={{ borderRadius: '0' }}
                >
                  直接購買
                </Button>
                {/* </Link> */}
              </div>
              <div style={{ background: '#f3f3f3' }}>
                <Button
                  className={classes.productSideBarButton2}
                  // disabled={cart.find(item => item.p_id === product.p_id)}
                  color="secondary"
                  onClick={() => this.addToCart(product)}
                  style={{ borderRadius: '0' }}
                >
                  加入購物車
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal
          isOpen={this.props.modal}
          toggle={this.props.onToggle}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader toggle={this.props.onToggle}>購物車</ModalHeader>
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
                        onClick={() => this.props.deleteCartItem(index)}
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
            <Button color="danger" onClick={this.props.ModalReset}>
              結帳
            </Button>

            <Button color="dark" onClick={this.props.onToggle}>
              取消
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

// For R Alert
const mapStateToProps = state => ({
  a: state.alertReducer,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ alertAppear }, dispatch)

// export default withRouter(SingleSiderBar)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleSiderBar))
