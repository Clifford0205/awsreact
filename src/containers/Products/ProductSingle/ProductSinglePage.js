import React from 'react'
import classes from '../Products'
import { TweenMax } from 'gsap/all'
import { Transition } from 'react-transition-group'
import { Button } from 'react-bootstrap'
import { IoIosHeart } from 'react-icons/io'
import ProductControlledCarousel from '../ProductControlledCarousel'
import SingleImg from './SingleImg'
import SingleSiderBar from './SingleSiderBar'
import SingleProductList from './SingleProductList'
import SingleComment from './SingleComment'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const startState = { autoAlpha: 0, y: -50 }

class ProductSinglePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      p_sid: 0,
      id: null,
      product: null,
      collectionProduct: [],
      user: null,
      isLike: false,
    }
  }

  componentDidUpdate(prevporps, prevState) {
    if (!this.state.product) {
      let p_sid = this.state.p_sid

      fetch(`http://18.139.60.49:5000/product/${p_sid}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ product: data[0] })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  componentDidMount() {
    let p_sid = +this.props.history.location.pathname.slice(11)
    this.setState({
      p_sid: p_sid,
    })
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
          this.setState({ user: data })

          axios
            .get('http://18.139.60.49:5000/collection', {
              params: {
                sid: data.user_id,
              },
            })
            .then(res => {
              console.log(res.data[0].c_product)
              this.setState({
                collectionProduct: JSON.parse(res.data[0].c_product),
              })
            })
            .then(() => {
              if (this.state.collectionProduct) {
                let Like = this.state.collectionProduct

                for (let num of Like) {
                  if (+this.state.p_sid === +num) {
                    console.log('true')
                    this.setState({ isLike: true })
                    break
                  } else {
                    this.setState({
                      isLike: false,
                    })
                  }
                }
              }
            })
        }
      })
  }
  //收藏按鈕
  handleCollect = () => {
    let collectionProduct = []
    console.log(collectionProduct)
    let sid = +this.props.history.location.pathname.slice(11)
    if (this.state.collectionProduct) {
      collectionProduct = this.state.collectionProduct
    }
    let include = false

    if (collectionProduct.length > 0) {
      for (let id of collectionProduct) {
        if (id === sid) {
          collectionProduct = collectionProduct.filter(item => item !== sid)
          this.setState({ collectionProduct: collectionProduct })
          include = true
          break
        }
      }
    }
    if (!include) {
      collectionProduct.push(sid)

      this.setState({ collectionProduct: collectionProduct })
    }
    axios
      .post('http://18.139.60.49:5000/collectionProduct', {
        collectionProduct: JSON.stringify(collectionProduct),
        sid: localStorage.meber,
      })
      .then(res => this.setState({ isLike: !this.state.isLike }))
  }

  render() {
    let list2 = null
    let list3 = null
    let list4 = null
    let list5 = null
    console.log(this.state.p_sid)
    if (this.state.product) {
      list2 = (
        <SingleSiderBar
          product={this.state.product}
          onToggle={this.props.onToggle}
          deleteCartItem={this.props.deleteCartItem}
          modal={this.props.modal}
          ModalReset={this.props.ModalReset}
        />
      )
      list3 = <SingleProductList product={this.state.product} />
      list4 = <SingleImg product={this.state.product} />
      list5 = <SingleComment p_sid={this.state.p_sid} />
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
        >
          <div>
            {/* <div style={{ height: '100vh' }}> */}
            <div
              style={{
                marginTop: '6rem',
                textAlign: '-webkit-center',
              }}
            >
              {list4}
            </div>
            <Button
              // variant="danger"
              className={classes.productSideBarButton}
              style={{
                borderRadius: '0',
                backgroundColor: '#f52a2a',
                border: 'none',
                width: '200px',
              }}
              // style={{borderRadius:'0'}}

              onClick={this.handleCollect}
            >
              <IoIosHeart size={25} />
              {this.state.isLike ? '已收藏' : '加入收藏'}
            </Button>

            {/* <SingleSiderBar /> */}
            {list2}
            {/* </div> */}
            {list3}
            {list5}

            {/* <ProductControlledCarousel/> */}

            {this.props.children}
          </div>
        </Transition>
      </>
    )
  }
}

export default withRouter(ProductSinglePage)
