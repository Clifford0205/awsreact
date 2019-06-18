import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { accessSync } from 'fs';
//import { actionChannel } from '@redux-saga/core/effects';

class FormControl extends Component {
  state = {
    btn1: true,
    btn2: false,
    btn3: false,
    btn4: false
  };
  handletagchange = e => () => {
    //console.log('e='+e)
    let a = {
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false
    };
    console.log(a);
    a[e] = "checked";
    this.setState(a);
  };
  render() {
    let r_border_red = "";
    let r_color_red = "";
    // console.log(typeof this.props.passed)
    // console.log(this.props.passed)
    if (this.props.passed !== "true") {
      //console.log('so not true!!!')
      r_border_red = " r_border_red";
      r_color_red = " r_color_red";
    }
    //console.log( r_border_red)
    switch (this.props.num) {
      case "2":
        return (
          <Row className="r_form_group m-0 my-5 align-items-center">
            <Col sm={2} className="d-flex justify-content-end mr-3 mr-md-5">
              <label>{this.props.info}</label>
            </Col>
            <Col className="d-flex p-0 flex-column ml-md-5">
              <Col className="d-flex ">
                <label htmlFor={this.props.name}>{this.props.label}</label>
              </Col>
              <Col>
                {this.props.list ? (
                  <input
                    className={"form-control r_form_group" + r_border_red}
                    name={this.props.name}
                    id={this.props.name}
                    placeholder={this.props.label}
                    list="countryData"
                    onChange={this.props.onChange}
                  />
                ) : (
                  <input
                    className={"form-control r_form_group" + r_border_red}
                    type={this.props.type}
                    name={this.props.name}
                    id={this.props.name}
                    placeholder={this.props.label}
                    onChange={this.props.onChange}
                    //onBlur={this.props.onBlur1}
                  />
                )}

                <small
                  className={"form-text text-muted" + r_color_red}
                  style={{ height: "18px" }}
                >
                  {this.props.small}
                </small>
              </Col>
            </Col>
            <Col className="d-flex p-0 flex-column ml-md-5">
              <Col className="d-flex ">
                <label htmlFor={this.props.name2}>{this.props.label2}</label>
              </Col>
              <Col>
                {this.props.list2 ? (
                  <input
                    className={"form-control r_form_group" + r_border_red}
                    name={this.props.name2}
                    id={this.props.name2}
                    placeholder={this.props.label2}
                    list={this.props.list2}
                  />
                ) : (
                  <input
                    className={"form-control r_form_group" + r_border_red}
                    type={this.props.type2}
                    name={this.props.name2}
                    id={this.props.name2}
                    placeholder={this.props.label2}
                    onChange={this.props.onChange}
                    //onBlur={this.props.onBlur2}
                  />
                )}

                <small
                  className={"form-text text-muted" + r_color_red}
                  style={{ height: "18px" }}
                >
                  {this.props.small2}
                </small>
              </Col>
            </Col>
          </Row>
        );
      case "4":
        return (
          <Row className="r_form_group m-0 my-5">
            <Col sm={2} className="d-flex justify-content-end mr-3 mr-md-5">
              <label>{this.props.label}</label>
            </Col>
            <Col className="ml-md-5 radiobtn_con">
              <label
                className={
                  "r_tag_style r_capsule radiobtn" +
                  (this.state.btn1 ? " r_tag_selected" : "")
                }
                onClick={this.handletagchange("btn1")}
              >
                短途
                <input
                  type="radio"
                  name="r_tag"
                  value="短途"
                  defaultChecked
                  className="d-none"
                />
              </label>
              <label
                className={
                  "r_tag_style r_capsule radiobtn" +
                  (this.state.btn2 ? " r_tag_selected" : "")
                }
                onClick={this.handletagchange("btn2")}
              >
                長途
                <input
                  type="radio"
                  name="r_tag"
                  value="長途"
                  className="d-none radiobtn"
                />
              </label>
              <label
                className={
                  "r_tag_style r_capsule radiobtn" +
                  (this.state.btn3 ? " r_tag_selected" : "")
                }
                onClick={this.handletagchange("btn3")}
              >
                環島
                <input
                  type="radio"
                  name="r_tag"
                  value="環島"
                  className="d-none radiobtn"
                />
              </label>
              {/* <label
                className={
                  "r_tag_style r_capsule radiobtn" +
                  (this.state.btn4 ? " r_tag_selected" : "")
                }
                onClick={this.handletagchange("btn4")}
              >
                跨國
                <input
                  type="radio"
                  name="r_tag"
                  value="跨國"
                  className="d-none radiobtn"
                />
              </label> */}
              <small className="form-text text-muted">{this.props.small}</small>
            </Col>
          </Row>
        );
      case "textarea":
        return (
          <Row className="r_form_group m-0 my-5">
            <Col sm={2} className="d-flex justify-content-end mr-3 mr-md-5">
              <label htmlFor={this.props.name}>{this.props.label}</label>
            </Col>
            <Col className="ml-md-5">
              <textarea
                type={this.props.type}
                name={this.props.name}
                id={this.props.name}
                placeholder={this.props.label}
                className="form-control r_form_group"
              />
              <small className="form-text text-muted">{this.props.small}</small>
            </Col>
          </Row>
        );
      default:
        return (
          <Row className="r_form_group m-0 my-5">
            <Col sm={2} className="d-flex justify-content-end mr-3 mr-md-5">
              <label htmlFor={this.props.name}>{this.props.label}</label>
            </Col>
            <Col className="ml-md-5">
              <input
                className={"form-control r_form_group" + r_border_red}
                type={this.props.type}
                name={this.props.name}
                id={this.props.name}
                placeholder={this.props.label}
              />
              <small className={"form-text text-muted" + r_color_red}>
                {this.props.small}
              </small>
            </Col>
          </Row>
        );

      // }else{
      //     return (
      //         <Row className="r_form_group m-0 my-5">
      //             <Col
      //                 sm={2}
      //                 className="d-flex justify-content-end mr-3 mr-md-5"
      //             >
      //                 <label htmlFor={this.props.name}>
      //                     {this.props.label}
      //                 </label>
      //             </Col>
      //             <Col className="ml-md-5">
      //                 <input
      //                     className="form-control r_form_group r_border_red"
      //                     type={this.props.type}
      //                     name={this.props.name}
      //                     id={this.props.name}
      //                     placeholder={this.props.label}
      //                 />
      //                 <small className="form-text r_color_red ">
      //                     {this.props.small}
      //                 </small>
      //             </Col>
      //         </Row>
      //     );

      // }
    }
  }
}

export default FormControl;
