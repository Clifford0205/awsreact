import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';

class DetailPageIntro extends Component {
    state = {};
    render() {
        return (
            <Col className="d-flex justify-content-center">
                <Col
                    sm={11}
                    xl={9}
                    className="d-flex justify-content-between my-5 px-0 r_rdintro_rwd_con1"
                >
                    <Col className="r_fw_bold r_fs_18">路線介紹</Col>
                    <Col xs={12} sm={7}>
                        &nbsp;
                        <br />
                        &nbsp;
                        <br />
                        <span>{this.props.data}</span>
                    </Col>
                </Col>
            </Col>
        );
    }
}

export default DetailPageIntro;
