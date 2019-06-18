import React from 'react';
// import ReactDOM from 'react-dom'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import RBCarousel from 'react-bootstrap-carousel';
import classes from '../Products/Products.module.css';

// const styles = { height: 400, width: '100%' }

class ControlledCarousel2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true,
    };
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = active => {
    console.log(`visiable onSelect active=${active}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    leftIcon = leftIcon ? undefined : <span className="fa fa-glass" />;
    rightIcon = rightIcon ? undefined : <span className="fa fa-music" />;
    this.setState({ leftIcon, rightIcon });
  };
  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <div>
        <Row>
          <Col span={12} style={{ paddingTop: '100px' }}>
            <RBCarousel
              animation={true}
              autoplay={this.state.autoplay}
              slideshowSpeed={5000}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onSelect={this.onSelect}
              ref={r => (this.slider = r)}
              version={4}
              className={classes.right}
            >
              <div style={{ width: '90%', height: '00%' }}>
                <img
                  src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
                  alt=""
                />
                <div style={{ color: '#000' }}>Image</div>
              </div>
              <div style={{ width: '90%', height: '100%' }}>
                <img
                  src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
                  alt=""
                />

                <div style={{ color: '#000' }}>Image1231321321</div>
              </div>
              <div>
                <img
                  style={{ width: '90%', height: '100%' }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                  alt=""
                />
                <div>Image</div>
              </div>
            </RBCarousel>
          </Col>
        </Row>
      </div>
    );
  }
}

/**
 *  Boostrap Component
 */
const Row = props => <div className="row">{props.children}</div>;
const Col = props => (
  <div className={`col-${props.span}`} style={props.style}>
    {props.children}
  </div>
);
// const Button = props => {
//   const { style, bsStyle, onClick } = props
//   const className = bsStyle ? `btn btn-${bsStyle}` : 'btn'
//   return (
//     <button style={style} className={className} onClick={onClick}>
//       {props.children}
//     </button>
//   )
// }

export default ControlledCarousel2;
