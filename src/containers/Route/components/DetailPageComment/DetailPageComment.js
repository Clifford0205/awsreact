import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DetailPageComment_style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitCommentAsync, alertAppear } from '../../actions';

class DetailPageComment extends Component {
    constructor() {
        super();
        this.state = {
            isLogined: false,
            user_id: '',
            r_c_time: '',
            r_time_added: '',
        };
    }

    handleSubmitComment = async () => {
        try {
            const response = await fetch('http://18.139.60.49:5000/is_logined', {
                method: 'GET',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            });

            // if (!response.ok) throw new Error(response.statusText);

            const jsonObject = await response.json();
            if (!jsonObject.isLogined) {
                //return alert("留言前請先登入");
                return this.props.alertAppear(false, '留言前請先登入');
            }

            await this.setState({
                isLogined: jsonObject.isLogined,
                user_id: jsonObject.user_id,
                r_c_time: new Date().toGMTString(),
            });

            await this.props.submitCommentAsync(this.state.user_id);
            this.textArea.value = '';
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        // if (!this.props.data.m_name) {
        //     console.log('none');
        //     return (
        //         <Row className="d-flex justify-content-center">
        //             <Col sm={11} xl={9} className="my-5 px-0">
        //                 <Col className="r_fw_bold r_fs_18 py-5 mb-3">留言</Col>

        //                 <Col className="d-flex justify-content-end">
        //                     <Col sm={9} className="p-3 w-100 my-4 ">
        //                         <form>
        //                             <input
        //                                 type="text"
        //                                 className="r_leave_comment w-100"
        //                             />
        //                             <button className="r_comment_btn py-1 px-4 my-2 r_fw_bold">
        //                                 留言
        //                             </button>
        //                         </form>
        //                     </Col>
        //                 </Col>
        //             </Col>
        //         </Row>
        //     );
        // } else {
        //     console.log('yes');

        return (
            <Row className="d-flex justify-content-center m-0">
                <Col xs={11} xl={9} className="mb-5 px-0">
                    <Col className="r_fw_bold r_fs_18 py-3 py-sm-5 mb-3">
                        留言
                    </Col>
                    <Col>
                        {this.props.r.data.comment.map(i => {
                            return (
                                <Row
                                    key={i.r_c_sid}
                                    className="r_single_comment p-1 p-sm-3 w-100 my-2 my-sm-4 mx-0"
                                >
                                    <Col xs={5} sm={3} className="d-flex">
                                        <div className="d-flex flex-column align-items-center">
                                            <div
                                                className="r_comment_avstar"
                                                style={{
                                                    backgroundImage: `url(${
                                                        i.m_photo
                                                    })`,
                                                }}
                                            />
                                            <p className="r_fw_bold m-0 mt-1 mt-sm-2">
                                                {i.m_name}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={7}
                                        sm={9}
                                        className="p0 p-sm-3 d-flex flex-column justify-content-between"
                                    >
                                        <div className="d-flex align-items-center flex-grow-1">
                                            {i.r_c}
                                        </div>
                                        <div className="text-right">
                                            {new Date(i.r_c_time)
                                                .toLocaleString()
                                                .slice(0, -3)}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                        <Col className="d-flex justify-content-end">
                            <Col sm={9} className="p-3 w-100 my-sm-4 ">
                                <form name="form_comment">
                                    <input
                                        name="m_sid"
                                        id="comment_m_sid"
                                        value={this.state.user_id}
                                        readOnly
                                        className="d-none"
                                    />
                                    <input
                                        name="r_c_time"
                                        className="d-none"
                                        id="r_c_time"
                                        value={this.state.r_c_time}
                                        readOnly
                                    />
                                    <input
                                        name="r_sid"
                                        className="d-none"
                                        value={this.props.rsid}
                                        readOnly
                                    />
                                    <div className="w-100">
                                        <textarea
                                            name="r_c"
                                            className="r_leave_comment w-100 p-3"
                                            ref={el => (this.textArea = el)}
                                        />
                                    </div>
                                    <button
                                        className="r_comment_btn py-1 px-4 my-2 r_fw_bold"
                                        type="button"
                                        onClick={this.handleSubmitComment}
                                    >
                                        留言
                                    </button>
                                </form>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        );
    }
}
// }

const mapStateToProps = store => ({
    r: store.routeSingleReducer,
    a: store.alertReducer,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ submitCommentAsync, alertAppear }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPageComment);
