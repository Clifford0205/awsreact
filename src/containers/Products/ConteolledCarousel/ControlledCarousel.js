import React from 'react';
import classes from '../Products.module.css';
import { Carousel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      product: [],
    };
  }

  componentDidMount() {
    fetch('http://18.139.60.49:5000/prouductcarousel')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ product: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { index, direction } = this.state;
    const single = this.props.p_sid;
    return (
      <>
        <div className="w-100 d-flex justify-content-center">
          {' '}
          <Col xs={11} lg={10} className="my-4 flex-column m-0 ">
            <h1 className="r_fs_20 m-0 r_color_red r_fw_extra_bold">
              THE WHEEL 商城
            </h1>
            <h1 className="m-0  mt-1 r_fw_bold r_fs_20">本月推薦商品</h1>
          </Col>
        </div>

        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          className={(classes.Carousel, classes.Carouselol)}
          style={{ height: '700px' }}
        >
          {this.state.product.map((item, index) => (
            <Carousel.Item key={index} style={{ textAlign: 'center' }}>
              <Link to={`/products2/${single}`}>
                <img
                  // className="d-block w-100  "
                  className={classes.imgHeight}
                  // src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
                  src={item.p_photo}
                  alt="First slide"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
              {/* <img
                className="d-block w-100  "
                className={classes.imgHeight}
                src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
                alt="First slide"
                style={{ 'object-fit': 'contain' }}
              /> */}
              <p className={classes.itemtext}>{item.p_name}</p>
            </Carousel.Item>
          ))}

          {/* <Carousel.Item style={{ 'text-align': 'center' }}>
            <img
              className="d-block w-100"
              className={classes.imgHeight}
              src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
              alt="First slide"
              style={{ 'object-fit': 'contain' }}
            />
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Item> */}
        </Carousel>
      </>
    );
  }
}

export default ControlledCarousel;
