import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DetailPageLocations_style.css';

class DetailPageLocations extends Component {
    state = {};

    render() {
        if (this.props.data[0]) {
            return (
                <div className="mb-3 d-flex">
                    <div className="r_bannerLabel r_d_l_576_d-none" />
                    <Row className="w-100 d-flex align-items-center flex-column my-5 mx-sm-5 mx-sm-0">
                        <div xs={5} className="r_d_lication_con">
                            <Col className="d-flex justify-content-start px-0 mx-3">
                                <Col
                                    lg={5}
                                    className="d-flex justify-content-start p-0"
                                >
                                    <div className="pr-5 r_d_pr_xxs">
                                        <div className="position-relative h-100">
                                            <div className="r_d_circle" />
                                            <div className="r_d_stick position-absolute" />
                                        </div>
                                    </div>

                                    <div className="r_fw_bold pl-3">
                                        {this.props.place1}
                                    </div>
                                </Col>
                                <Col lg={7}>
                                    &nbsp;
                                    <br />
                                    &nbsp;
                                    <br />
                                    &nbsp;
                                    <br />
                                </Col>
                            </Col>
                            {this.props.data.map(i => {
                                return (
                                    <Col
                                        key={'lsid' + i.l_sid}
                                        className="d-flex justify-content-start r_d_bg_gray px-0 mx-3 r_d_lication_con2"
                                    >
                                        <Col
                                            lg={5}
                                            className="d-flex justify-content-start p-0"
                                        >
                                            <div className=" r_d_bg_white pr-5 r_d_pr_xxs">
                                                <div className="position-relative h-100">
                                                    <div className="r_d_circle" />
                                                    <div className="r_d_stick position-absolute" />
                                                </div>
                                            </div>

                                            <div className="r_fw_bold pl-3">
                                                {i.l_name}
                                            </div>
                                        </Col>
                                        <Col lg={7} className="r_d_l_intro_con">
                                            <div>
                                                <div className="r_d_stick position-absolute r_d_l_d-none" />
                                                <div className="intro">
                                                    <span className="r_d_l_576_d-none">
                                                        &nbsp;
                                                        <br />
                                                    </span>

                                                    <span>{i.l_intro}</span>
                                                    <span>
                                                        &nbsp;
                                                        <br />
                                                        &nbsp;
                                                        <br />
                                                    </span>
                                                    <span className="r_d_l_d-none">
                                                        &nbsp;
                                                        <br />
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Col>
                                );
                            })}
                            <Col className="d-flex justify-content-start px-0 mx-3">
                                <Col
                                    lg={5}
                                    className="d-flex justify-content-start p-0"
                                >
                                    <div className="position-relative r_d_pr_xxs pr-5">
                                        <div className="r_d_circle" />
                                    </div>

                                    <div className="r_fw_bold pl-3">
                                        {this.props.place2}
                                    </div>
                                </Col>
                                <Col lg={7} />
                            </Col>
                        </div>
                    </Row>
                </div>
            );
        } else {
            return <></>;
        }
    }
}
export default DetailPageLocations;
