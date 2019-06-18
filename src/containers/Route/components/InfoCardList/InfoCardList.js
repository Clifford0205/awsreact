import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoCard from '../InfoCard/InfoCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchPostsAsync,
    addToLikeSuccess,
    addToChallengeSuccess,
    handlecurrentPage,
    handleSearch,
    fetchPopularPostsAsync,
} from '../../actions';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import './InfoCardList_style.css';

class InfoCardList extends Component {
    state = {};

    componentDidMount() {
        if (this.props.r.postsList.posts.length === 0) {
            this.props.fetchPostsAsync(0);
        }

        let r_Collection = new FormData();
        let arr = [];
        let arr2 = [];
        fetch('http://18.139.60.49:5000/is_logined', {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })
            .then(res => res.json())
            .then(obj => {
                if (obj.isLogined) {
                    this.setState({
                        user_id: obj.user_id,
                    });
                    console.log('yayyyy1');
                    r_Collection.append('m_sid', obj.user_id);
                }
                if (!obj.user_id) {
                    throw new Error('not Logged in');
                }
                return obj.user_id;
            })
            .then(r =>
                fetch('http://18.139.60.49:5000/routeCollect', {
                    method: 'post',
                    body: r_Collection,
                })
                    .then(res => res.json())
                    .then(obj => {
                        arr = JSON.parse(obj[0]['r_collection']);
                        console.log(arr);
                        arr2 = JSON.parse(obj[0]['r_challengeSuccess']);
                        this.setState({
                            r_collection: arr,
                            r_challengeSuccess: arr2,
                        });
                        this.props.addToLikeSuccess(arr);
                        this.props.addToChallengeSuccess(arr2);
                    })
            )
            .catch(e => console.log(e));
    }

    handleLoadMore = () => {
        switch (this.props.r.currentState) {
            case 'popular':
                console.log('this.props.r.currentState = popular');
                this.props.fetchPopularPostsAsync(
                    this.props.r.postsList.page + 1
                );
                break;
            case 'search':
                console.log('this.props.r.currentState = search');
                this.props.handleSearch(this.props.r.postsList.page + 1);
                break;
            default:
                console.log('this.props.r.currentState = default');
                this.props.fetchPostsAsync(this.props.r.postsList.page + 1);
        }
    };
    handlePageChange = page => async () => {
        await this.props.handlecurrentPage(page);
        switch (this.props.r.currentState) {
            case 'popular':
                this.props.fetchPopularPostsAsync(0);
                break;
            default:
                this.props.fetchPostsAsync(0);
        }
    };

    render() {
        let style = {
            backgroundColor: '#FAFAFA',
            minHeight: '30vh',
        };
        return (
            <Container style={style} fluid className="py-2">
                <Row className="d-flex justify-content-center pt-4 pb-3 m-0">
                    <Col
                        md={11}
                        xl={9}
                        className="d-flex justify-content-end p-0"
                    >
                        <span
                            className={
                                'm-3 r_fw_medium r_infocard_list ' +
                                (this.props.r.currentState === 'newest'
                                    ? 'r_link_active'
                                    : '')
                            }
                            onClick={this.handlePageChange('newest')}
                        >
                            最新路線
                        </span>

                        <span
                            className={
                                'm-3 r_fw_medium r_infocard_list ' +
                                (this.props.r.currentState === 'popular'
                                    ? 'r_link_active'
                                    : '')
                            }
                            onClick={this.handlePageChange('popular')}
                        >
                            熱門路線
                        </span>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center m-0">
                    <Col md={11} xl={9}>
                        {this.props.r.postsList.posts.map(items => {
                            return (
                                <InfoCard
                                    key={items.r_sid}
                                    data={items}
                                    r_collection={this.state.r_collection}
                                    user_id={this.state.user_id}
                                />
                            );
                        })}
                    </Col>
                </Row>
                <Row className="d-flex jusityfy-content-center m-0 m-5">
                    <Col className="d-flex justify-content-center mb-4">
                        <LoadMoreBtn
                            onClick={this.handleLoadMore}
                            none={
                                this.props.r.postsList.posts.length < 7
                                    ? 'd-none'
                                    : ''
                            }
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = store => ({ r: store.routeReducer });

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchPostsAsync,
            addToLikeSuccess,
            addToChallengeSuccess,
            handlecurrentPage,
            handleSearch,
            fetchPopularPostsAsync,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoCardList);
