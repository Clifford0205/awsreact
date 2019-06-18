import React from 'react';
import classes from './Products.module.css';
import { TweenMax } from 'gsap/all';
import { Transition } from 'react-transition-group';
// import ContentPage from '../ContentPage/ContentPage'
import { Container, Col, Row, Table } from 'react-bootstrap';
import { IoIosCart } from 'react-icons/io';
import ControlledCarousel from './ConteolledCarousel/ControlledCarousel';
import ProductsSearch from '../Products/ProuductSearch/ProductsSearch';
import ProductsCard from '../Products/ProductsCard';
import ControlledCarousel2 from './ControlledCarousel2';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
const startState = { autoAlpha: 0, y: -50 };

class products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      type: null,
      genre: null,
      filter: null,
      page: 0,
      modal: this.props.modal,
    };
  }

  componentDidMount = page => {
    fetch('http://18.139.60.49:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.user_id) {
          console.log(data);
          // this.setState({ user: data });
        }
      });

    page = this.state.page;
    this.setState({ page: page + 1 });
    fetch('http://18.139.60.49:5000/product?page=' + page)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        let products = [...this.state.product];
        // console.log(products)
        this.setState({ product: [...this.state.product, ...data] });
        console.log(this.state.product);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate() {}
  //搜尋欄位 改變state裡面的值

  //改變Search車種的值
  handleType = event => {
    this.setState(
      {
        type: event.target.value,
      },
      () => console.log(this.state.type)
    );
  };
  //改變Search部件的值
  handleGenre = event => {
    this.setState(
      {
        genre: event.target.value,
      },
      () => console.log(this.state.genre)
    );
  };
  //改變Search Input的值
  handleInput = event => {
    this.setState(
      {
        filter: event.target.value,
      },
      () => console.log(this.state.filter)
    );
  };
  //點擊搜尋按鈕fetch get 的資料
  handleSearch = props => {
    //  console.log(this.state.type)

    var obj = {
      type: this.state.type,
      genre: this.state.genre,
      filter: this.state.filter,
    };
    console.log(obj);
    fetch('http://18.139.60.49:5000/search', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ product: data }, () => {
          this.setState({
            type: null,
            genre: null,
            filter: null,
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleMore = page => {
    page = this.state.page;
    this.setState({ page: page + 1 });
    fetch('http://18.139.60.49:5000/product?page=' + page)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        let products = [...this.state.product];
        // console.log(products)
        this.setState({ product: [...this.state.product, ...data] });
        console.log(this.state.product);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    let totalPrice = 0;
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      console.log(cart);
      cart.forEach(item => {
        console.log(item.p_price);
        let sum = item.quantity * Number(item.p_price);
        return (totalPrice += sum);
      });

      localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    } else {
      console.log(123);
    }

    let list = null;

    if (this.state.product) {
      list = this.state.product.map(item => {
        return (
          <ProductsCard
            style={{ border: '1px solid black' }}
            pic={item.p_photo}
            name={item.p_name}
            description={item.p_description}
            price={item.p_price}
            genre={item.p_genre}
            p_sid={item.p_sid}
            key={item.p_sid}
            modal={this.props.modal}
            // handleCollect={()=>this.props.handleCollect(item.p_sid)}
          />
        );
      });
    }

    return (
      <>
        <div className={classes.bggray}>
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
              });
            }}
          >
            <div style={{ marginTop: '50px' }}>
              <ControlledCarousel />
              <div>
                <Button
                  className={classes.Button}
                  onClick={this.props.onToggle}
                  style={{ borderRadius: '0' }}
                >
                  <IoIosCart size={25} />
                  {this.props.buttonLabel}
                  購物車
                </Button>
              </div>
              <Container className={classes.SearchSideBar}>
                <Row>
                  <Col lg={3}>
                    <ProductsSearch
                      handleType={this.handleType}
                      handleGenre={this.handleGenre}
                      handleInput={this.handleInput}
                      handleSearch={this.handleSearch}
                    />
                  </Col>
                  <Col lg={9} style={{ marginBottom: '5rem' }}>
                    {/* <ProductsCard product={this.state.product} /> */}
                    {list}
                  </Col>
                </Row>
              </Container>
              <div
                style={{ marginTop: '56px' }}
                className="d-flex justify-content-center bggray flex-column"
                //className={classes.bggray}
              >
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Col
                      xs={10}
                      className="d-flex justify-content-center w-100"
                    >
                      <Row className="d-flex  justify-content-between">
                        <Col
                          lg={2.5}
                          style={{ marginTop: '3rem', maxWidth: '200px' }}
                        />
                        <Col
                          lg={9}
                          style={{ marginBottom: '5rem', marginTop: '5rem' }}
                        >
                          {/* <ProductsCard product={this.state.product} /> */}
                          {/* {list} */}
                          <div
                            className={classes.MoreButton}
                            style={{
                              textAlign: 'center',
                              marginBottom: '100px',
                            }}
                          >
                            <Button
                              className={classes.MoreButton2}
                              onClick={this.handleMore}
                            >
                              更多商品
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      {/* </Container> */}
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
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
                          className="btnhover_red"
                          onClick={() => this.props.deleteCartItem(index)}
                          style={{
                            borderRadius: '0',
                            backgroundColor: '#f52a2a',
                            border: 'none',
                          }}
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
              <Button
                className="btnhover_red"
                onClick={this.props.ModalReset}
                style={{
                  borderRadius: '0',
                  backgroundColor: '#f52a2a',
                  border: 'none',
                }}
              >
                結帳
              </Button>

              <Button
                className="btnhover_red"
                onClick={this.props.onToggle}
                style={{
                  borderRadius: '0',
                  backgroundColor: 'black',
                  border: 'none',
                }}
              >
                取消
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

export default products;
