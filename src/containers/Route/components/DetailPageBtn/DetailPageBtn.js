import React from 'react';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
    faFistRaised,
    faHeart,
    faBed,
} from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons/faHeartBroken';
import Col from 'react-bootstrap/Col';
// Import stylesheet
import './DetailPageBtn_style.css';

// 贊助按鈕

class BackItButton extends React.Component {
    render() {
        return (
            <>
                <button
                    className="r_d_buttons succeed_btn r_fw_bold"
                    variant="secondary"
                    onClick={this.props.onClick}
                >
                    <FontAwesomeIcon
                        style={{ marginRight: '0.7rem' }}
                        icon={
                            this.props.challengeSuccess ? faBed : faFistRaised
                        }
                    />
                    {this.props.challengeSuccess ? '還沒興趣' : '挑戰成功'}
                </button>
            </>
        );
    }
}

// 收藏按鈕
class LikeItButton extends React.Component {
    constructor() {
        super();
        this.state = { isLiked: false };
    }

    //   handleClickOnLikeButton() {
    //     this.setState({
    //       isLiked: !this.state.isLiked
    //     });
    //   }

    handlelike = async () => {
        const response = await fetch('http://18.139.60.49:5000/is_logined', {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        });
        const jsonObject = await response.json();
        if (!jsonObject.user_id) {
            alert('收藏路線前請先登入');
            return;
        }
        let arr = this.props.h.liked;
        let rsid = this.props.data.r_sid;
        let newlike = 0;
        if (arr) {
            arr.forEach(function(el) {
                if (el === rsid) {
                    newlike = rsid;
                }
                console.log('newLike' + newlike);
            });

            if (newlike !== 0) {
                console.log('no');
                arr.splice(arr.indexOf(newlike), 1);
            } else {
                console.log('yes');
                arr.push(this.props.data.r_sid);
            }
        } else {
            arr = [this.props.data.r_sid];
        }

        console.log(arr);
        this.props.handlelikeAsync(this.props.user_id, arr);
    };

    render() {
        return (
            <>
                <button
                    className="r_d_buttons r_like_button r_fw_bold ml-3 ml-sm-5"
                    variant={this.state.isLiked ? 'light' : 'danger'}
                    onClick={this.props.onClick}
                >
                    <FontAwesomeIcon
                        style={{ marginRight: '0.7rem' }}
                        icon={this.props.heartRed ? faHeartBroken : faHeart}
                    />
                    {this.props.heartRed ? '取消收藏' : '收藏路線'}
                </button>
            </>
        );
    }
}

// 社群分享按鈕
var getWindowOptions = function() {
    var width = 500;
    var height = 450;
    var left = window.innerWidth / 2 - width / 2;
    var top = window.innerHeight / 2 - height / 2;

    return [
        'resizable,scrollbars,status',
        'height=' + height,
        'width=' + width,
        'left=' + left,
        'top=' + top,
    ].join();
};

class SNSButtons extends React.Component {
    letsgo = e => {
        var fbBtn = document.querySelector('.ffbs');
        //var title = encodeURIComponent("Hey everyone, come & see how good I look!");
        var shareUrl =
            'https://www.facebook.com/sharer/sharer.php?u=' +
            window.location.href +
            '&title=' +
            'aaaaaaa';
        fbBtn.href = shareUrl;
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
        win.opener = null;
    };

    render() {
        return (
            <>
                <Col className="d-flex mb-1 mt-3 my-xl-3 r_SNSButtons p-0">
                    {/* <div className="ml-0">
            <a href="http://www.google.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div> */}
                    <div className="ml-0">
                        <a
                            href={`https://twitter.com/intent/tweet?url=${
                                window.location.href
                            }&text="good biking places"`}
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                    <div>
                        <a className="ffbs" onClick={this.letsgo}>
                            <FontAwesomeIcon
                                icon={faFacebookF}
                                style={{ color: '#f52a2a !important' }}
                            />
                        </a>
                    </div>
                </Col>
            </>
        );
    }
}

export { LikeItButton, BackItButton, SNSButtons };
