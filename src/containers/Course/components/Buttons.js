import React from 'react'
import { Button } from 'react-bootstrap'
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faFistRaised, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons/faHeartBroken'
// Import stylesheet
import './components.css'
import '../../../index.css'
import { Link } from 'react-router-dom'

// 贊助按鈕
class BackItButton extends React.Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }
  render() {
    // console.log(props.sid)
    return (
      <>
        <Button
          className="buttons btnhover"
          variant="secondary"
          style={{
            background: 'black',
            display: `${this.props.buttonDisplay}`,
            fontWeight: '700',
          }}
        >
          <Link
            to={{
              pathname: `/course/backIt/${this.props.sid}`,
              state: {
                sid: this.props.sid,
              },
            }}
            style={{
              color: '#ffffff',
            }}
          >
            我要贊助
            <FontAwesomeIcon
              style={{ marginLeft: '0.5rem' }}
              icon={faFistRaised}
            />
          </Link>
        </Button>
      </>
    )
  }
}

// 收藏按鈕
class LikeItButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // isLiked: false
    }
  }

  handleClickOnLikeButton() {
    console.log('handleClickOnLikeButton!')
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
    return (
      <>
        <Button
          className="buttons btnhover"
          // variant={this.props.isLiked ? 'light' : 'danger'}
          onClick={this.props.collectHandler}
          style={{
            display: `${this.props.buttonDisplay}`,
            background: `${this.props.isLiked ? '#f3f3f3' : '#f52a2a'}`,
            color: `${this.props.isLiked ? '#000000' : '#ffffff'}`,
            border: 'none',
            fontWeight: '700',
          }}
        >
          {this.props.isLiked ? '取消收藏' : '收藏課程'}
          <FontAwesomeIcon
            style={{ marginLeft: '0.5rem' }}
            icon={this.props.isLiked ? faHeartBroken : faHeart}
          />
        </Button>
      </>
    )
  }
}

// 社群分享按鈕
class SNSButtons extends React.Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }
  render() {
    return (
      <>
        <div className="d-flex">
          <div
            className="m-2"
            style={{ display: `${this.props.buttonDisplay}` }}
          >
            <a href="http://www.google.com" style={{ color: '#000000' }}>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          <div
            className="m-2"
            style={{ display: `${this.props.buttonDisplay}` }}
          >
            <a href="https://tw.yahoo.com" style={{ color: '#000000' }}>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
          <div
            className="m-2"
            style={{ display: `${this.props.buttonDisplay}` }}
          >
            <a href="https://www.facebook.com" style={{ color: '#000000' }}>
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
          </div>
        </div>
      </>
    )
  }
}

// 返回按鈕
function ReturnButton() {
  return (
    <>
      <Link to="/course">
        <Button
          variant="light"
          className="buttons"
          style={{ fontWeight: '700' }}
        >
          返回
        </Button>
      </Link>
    </>
  )
}

export { ReturnButton, LikeItButton, BackItButton, SNSButtons }
