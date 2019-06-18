// import Card from 'react-bootstrap/Card'
import React from 'react';
import classes from '../Products.module.css';
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../../ContentPage/ContentPage'
import { Button, Form } from 'react-bootstrap';
// import { IoIosCart } from 'react-icons/io'
// import ControlledCarousel from './ControlledCarousel'
import { IoIosHand } from 'react-icons/io';

class ProductsSearch extends React.Component {
  handleButtonClick = () => {
    this.form.reset();
  };
  clearAndSearch = () => {
    // console.log('enter onClick!');
    this.props.handleSearch();
    this.handleButtonClick();
  };

  render() {
    return (
      <>
        <Form
          ref={form => (this.form = form)}
          className="mt-5 p-4"
          style={{ backgroundColor: 'white' }}
        >
          <Form.Group className="w-100">
            <Form.Control
              style={{
                borderRadius: '0',
                border: '0',
                backgroundColor: '#fafafa',
              }}
              className="w-100 "
              placeholder="搜尋"
              onChange={this.props.handleInput}
              id="filter"
              name="filter"
              // value="null"
            />

            <Form.Label className="mt-4 r_fw_bold">車種</Form.Label>
            <Form.Control
              className="w-100 "
              id="type"
              name="type"
              as="select"
              onChange={this.props.handleType}
              style={{ borderRadius: '0', border: '0' }}
            >
              <option selected value="">
                請選擇
              </option>
              <option value="公路車">公路車</option>
              <option value="特技車">特技車</option>
              <option value="單速車">單速車</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3 r_fw_bold">部件</Form.Label>
            <Form.Control
              style={{ borderRadius: '0', border: '0' }}
              className="w-100"
              id="genre"
              name="genre"
              as="select"
              onChange={this.props.handleGenre}
            >
              <option selected value="">
                請選擇
              </option>
              <option value="全車">全車</option>
              <option value="車架">車架</option>
              <option value="握把.龍頭">握把.龍頭</option>
              <option value="坐墊.坐管">坐墊.坐管</option>
              <option value="煞車零件">煞車零件</option>
              <option value="鍊條">鍊條</option>
              <option value="輪胎">輪胎</option>
              <option value="踏板">踏板</option>
            </Form.Control>
            {/* <Button
              variant="primary"
              type="button"
              className={classes.SearchButton}
              onClick={this.clearAndSearch}
            >
              搜尋
            </Button> */}
          </Form.Group>
          <Button
            style={{ borderRadius: '0', border: 'none' }}
            type="button"
            className={classes.SearchButton}
            onClick={this.clearAndSearch}
          >
            搜尋
          </Button>
        </Form>
      </>
    );
  }
}

export default ProductsSearch;
