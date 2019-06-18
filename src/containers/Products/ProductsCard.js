import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from './Products.module.css'
import { Link } from 'react-router-dom'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Col } from 'react-bootstrap'
// import { Link } from 'fs';
// import { IoIosCart } from 'react-icons/io'
// import ControlledCarousel from './ControlledCarousel'
// import { IoIosHand } from 'react-icons/io'

class ProductsCard extends React.Component {
  constructor(props) {
    super(props)
    // const product = this.props.product
    this.state = {
      collectionProduct: [],
      id: this.props.p_sid,
    }
  }

  handleClick = () => {
    console.log(this.props.p_sid)
    this.setState({
      p_sid: this.props.p_sid,
    })
  }

  render() {
    // const a = this.props.product
    // console.log(this.props)

    const single = this.props.p_sid
    return (
      <>
        <Card className={(classes.top, classes.productCardsShadow)}>
          <div className="row mt-3 justify-content-center px-3">
            <Col
              md={5}
              className="mr-4"
              style={{ maxHeight: '200px', overflow: 'hidden' }}
            >
              <img
                // variant="top"
                src={this.props.pic}
                alt=""
                style={{ objectFit: 'contain' }}
                className="w-100 h-100"
              />
            </Col>
            <Col>
              <Card.Title className="r_fs_14 d-flex justify-content-between align-items-center mb-3">
                <span
                  className="r_fs_20 r_fw_bold"
                  style={{ maxWidth: '250px' }}
                >
                  {this.props.name}
                </span>
                <span className={classes.pcapsule}>{this.props.genre}</span>
              </Card.Title>

              <Card.Text
                style={{
                  maxHeight: '65px',
                  overflow: 'hidden',
                  marginTop: '20px',
                }}
              >
                {this.props.description}
              </Card.Text>
              <Card.Body className="d-flex justify-content-between p-0">
                <Card.Text
                  className={classes.Space}
                  style={{ padding: '0', fontWeight: '700' }}
                >
                  NT{this.props.price}
                </Card.Text>

                {/* <Button variant="primary" className={classes.ButtonSpace} onClick={this.props.handleCollect}>
                  加入收藏
                </Button> */}
                <Link
                  to={{
                    pathname: `/products2/${single}`,
                    state: {
                      p_sid: this.props.p_sid,
                      toggle: this.props.toggle,
                    },
                  }}
                >
                  <Button
                    variant="primary"
                    style={{ borderRadius: '0', border: 'none' }}
                    className={classes.ButtonSpace2}
                    onClick={this.handleClick}
                    deleteCartItem={this.props.deleteCartItem}
                    toggle={this.props.toggle}
                    modal={this.props.modal}
                  >
                    查看商品
                  </Button>
                </Link>
              </Card.Body>
            </Col>
          </div>
        </Card>
      </>
    )
  }
}

export default ProductsCard
