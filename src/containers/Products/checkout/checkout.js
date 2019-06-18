import React from 'react';
import classes from './checkout.module.css';
import { TweenMax } from 'gsap/all';
import { Transition } from 'react-transition-group';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
// import ContentPage from '../ContentPage/ContentPage'
import {
  Button,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { join } from 'path';
// import R Alert made by Ivy
import RAlert from '../../Route/components/R_Alert/R_Alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertAppear } from '../../Route/actions';
import { spawn } from '@redux-saga/core/effects';

const startState = { autoAlpha: 0, y: -50 };

class checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      display: 'none',
      cart: null,
      isChecked: false,
      pay: [],
      totalprice: null,
      delivery: [],
      id: localStorage.getItem('meber'),
    };
    this.handleChecked = this.handleChecked.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem('cart')) {
      const cart = null;
      cart.push();
      this.setState({
        cart,
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      // console.log(this.state)
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      cart.push();
      this.setState({
        cart,
      });

      localStorage.setItem('cart', JSON.stringify(cart));
    }

    if (localStorage.getItem('totalPrice')) {
      let totalprice = 0;
      totalprice = JSON.parse(localStorage.getItem('totalPrice'));

      this.setState({
        totalprice,
      });
    }
  }
  PlusCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    // const quantity = '3'
    if (localStorage.getItem('cart')) {
      // cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(item => {
        if (item.quantity) {
          console.log(item.quantity);
          let sum = item.quantity + 1;
          return (item.quantity += sum);
        }

        //  localStorage.setItem('cart',JSON.stringify(cart))
      });
    }
  };
  handleChange = event => {
    if (event.target.value === '信用卡') {
      this.setState({
        display: 'block',
      });
      this.setState({
        pay: event.target.value,
      });
      // var number =  document.getElementById('number');
      // const numberVal = number.value
      // console.log(numberVal)
    } else {
      this.setState({
        display: 'none',
      });
      this.setState({
        pay: event.target.value,
      });
    }
  };

  handleChecked = event => {
    console.log(event.target.value);
    this.setState({
      isChecked: !this.state.isChecked,
      delivery: event.target.value,
    });
  };
  handleCheckedtoggle = event => {
    this.setState({ isChecked: false });
  };

  // inputNumber = event => {
  //   this.setState({
  //     pay: ['信用卡:' + event.target.value],
  //   })
  //   console.log(this.state)
  // }

  deleteCartItem = index => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    cart.splice(index, 1);

    this.setState({
      cart,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  handleSend = () => {
    console.log(this.state.cart);
    let arr = [];
    let order = this.state.cart;
    order.forEach(obj => {
      let item = {};
      item.p_sid = obj.p_sid;
      item.p_price = obj.p_price;
      item.p_photo = obj.p_photo;
      item.p_name = obj.p_name;
      item.qty = obj.quantity;
      arr.push(item);
    });

    var obj = {
      id: this.state.id,
      cart: JSON.stringify(arr),
      pay: this.state.pay,
      totalprice: this.state.totalprice,
    };
    console.log(arr);
    if (!localStorage.getItem('meber')) {
      // Swal.fire({
      //   type: 'error',
      //   title: '請登入會員',
      //
      // })
      this.props.alertAppear(false, '請登入會員');
    } else {
      fetch('http://18.139.60.49:5000/checkout', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });
      // Swal.fire(
      //   '下單成功',
      //   '',
      //   'success'
      // )
      this.props.alertAppear(true, '下單成功');

      this.setState({
        modal: !this.props.modal,
      });
      localStorage.removeItem('cart');
      localStorage.removeItem('totalPrice');
      this.props.history.push('/products');
    }
  };

  render() {
    let cart = '';
    cart = JSON.parse(localStorage.getItem('cart'));

    var txt;
    if (this.state.isChecked) {
      txt = 'block';
    } else {
      txt = 'none';
    }
    // console.log(this.state.cart.quantity)

    console.log(this.state.cart);

    return (
      <>
        <RAlert />
        <Container
          className={classes.OderCard}
          style={{
            marginTop: '10rem',
            padding: '0 5rem 0 5rem',
            border: 'none',
            backgroundColor: '#f3f3f3',
            margin: '50px 0 0 0',
            paddingTop: '5rem',
            paddingBottom: '9rem',
          }}
          fluid
        >
          <Card
            className={classes.OderCardTop}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
            }}
          >
            {/* <div className="row">
              {cart.map((item, index) => (
                <Col
                  md={7}
                  className={classes.CheckImg}
                  style={{ textAlign: 'center' }}
                >
                  <Card.Img
                    // variant="top"
                    src={JSON.parse(item.p_photo)[0]}
                    alt=""
                    style={{ width: '70%' }}
                  />
                  
                </Col>
              ))}
              {cart.map((item, index) => (
                <Col md={5} style={{ padding: '20px' }}>
                  <Card.Title style={{ marginTop: '4rem' }}>
                    商品名:{item.p_name}
                  </Card.Title>
                  <Card.Text>商品車種:{item.p_genre}</Card.Text>
                  <Card.Text>商品品牌:{item.p_brand}</Card.Text>
                  <Card.Text>商品說明:{item.p_description}</Card.Text>
                  <Card.Text>數量:{item.quantity}</Card.Text>
                </Col>
              ))}
            </div> */}
            <Card
              style={{
                border: 'none',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                marginBottom: '15px',
              }}
            >
              <div className="row px-5 m-0 mb-3">
                <Col className="mx-3">
                  {cart.map((item, index) => (
                    <Col style={{ padding: '20px' }}>
                      <Card.Title
                        style={{ marginTop: '2rem' }}
                        className="d-flex justify-content-between"
                      >
                        <span>{item.p_name}</span>
                        <Button
                          // color="danger"
                          // variant="danger"
                          onClick={() => this.deleteCartItem(index)}
                          className="btnhover"
                          style={{
                            backgroundColor: '#f52a2a',
                            border: 'none',
                            borderRadius: '0',
                          }}
                        >
                          刪除此商品
                        </Button>
                      </Card.Title>
                      <div className="d-flex">
                        {' '}
                        <div className="col-md-4">
                          <img
                            src={item.p_photo}
                            alt=""
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div className="ml-5">
                          {' '}
                          <Card.Text
                            style={{
                              backgroundColor: 'black',
                              width: '80px',
                              color: 'white',
                              borderRadius: '500px',
                              textAlign: 'center',
                              fontWeight: '700',
                              padding: '3px 10px 3px 10px',
                            }}
                          >
                            {item.p_genre}
                          </Card.Text>
                          <Card.Text>商品品牌:{item.p_brand}</Card.Text>
                          <Card.Text
                            style={{
                              maxHeight: '82px',
                              overflow: 'hidden',
                              marginBottom: '0',
                            }}
                          >
                            商品說明:{item.p_description}
                            {item.p_description2}
                          </Card.Text>
                          <span>. . .</span>
                          <br />
                          <Card.Text
                            className="w-100 text-right r_fw_bold"
                            style={{ color: '#f52a2a' }}
                          >
                            數量:{item.quantity}
                            {/* <Button onClick={this.PlusCartItem}>+</Button> */}
                          </Card.Text>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Col>
              </div>
            </Card>
            <Form
              style={{
                padding: '15px',
                marginTop: '5rem',
                backgroundColor: 'white',
              }}
            >
              <Form.Group as={Col} md={4} controlId="formGridState">
                <Form.Label className="r_fw_bold">付款方式</Form.Label>
                <Form.Control as="select" onChange={this.handleChange}>
                  <option selected>請選擇</option>
                  <option value="信用卡">信用卡</option>
                  <option value="貨到付款">貨到付款</option>
                  <option value="匯款">匯款</option>
                </Form.Control>
              </Form.Group>
              <div style={{ display: `${this.state.display}` }}>
                <Form.Group as={Col} md={3}>
                  <Form.Label>卡號</Form.Label>
                  {/* <input id="number" type="text" onChange={this.inputNumber} /> */}
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} md={1} controlId="formGridPassword">
                  <Form.Label>安全碼</Form.Label>
                  {/* <input id="number" type="text"></input> */}
                  <Form.Control />
                </Form.Group>
              </div>

              <div>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Label
                    as="legend"
                    column
                    sm={2}
                    className="r_fw_bold mt-5"
                  >
                    配送方式
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="宅配"
                    onChange={this.handleChecked}
                    value="宅配"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="7-11寄送"
                    value="7-11寄送"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onChange={this.handleCheckedtoggle}
                  />
                  <Form.Check
                    type="radio"
                    label="郵局領取"
                    value="郵局領取"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onChange={this.handleCheckedtoggle}
                  />
                </Form.Group>
              </div>
              <div style={{ display: `${txt}` }}>
                <Form.Group as={Col} md={4}>
                  <Form.Label>地址</Form.Label>
                  <Form.Control />
                </Form.Group>
                {/* <Form.Group as={Col} md={2} controlId="formGridState">
                  <Form.Label>城市</Form.Label>
                  <Form.Control as="select">
                    <option selected>選擇</option>
                    <option>台北市</option>
                    <option>新北市</option>
                    <option>桃園市</option>
                    <option>新竹市</option>
                    <option>高雄市</option>
                    <option>嘉義市</option>
                  </Form.Control>
                </Form.Group> */}
              </div>
            </Form>
            <Container className="d-flex justify-content-end mt-4">
              <Row style={{ textAlign: 'right' }} className="mr-5">
                <Col>
                  <h1>NT:{this.state.totalprice}</h1>
                </Col>
              </Row>
              <Row
                className={classes.checkButton}
                style={{ justifyContent: 'flex-end' }}
              >
                <Button
                  className={classes.checkButton2}
                  onClick={this.handleSend}
                  style={{
                    borderRadius: '0',
                    backgroundColor: 'black',
                    fontWeight: '700',
                  }}
                >
                  下訂單
                </Button>
              </Row>
            </Container>
          </Card>

          {this.props.children}
        </Container>
      </>
    );
  }
}

// For R Alert
const mapStateToProps = state => ({
  a: state.alertReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ alertAppear }, dispatch);

// export default withRouter(checkout);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(checkout));
