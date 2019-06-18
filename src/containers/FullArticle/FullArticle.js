import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./FullArticle.module.css";
import { connect } from "react-redux";
import {
  fetchFullArticle,
  replyArticle
} from "../../../src/store/fullArticleActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Verify from "../../components/Verification/Verification";
import { newCommentCode } from "../../store/verifyActions";
import image from "../../image/icon.png";
import { Container, Row, Col } from "react-bootstrap";

var getWindowOptions = function() {
  var width = 500;
  var height = 450;
  var left = window.innerWidth / 2 - width / 2;
  var top = window.innerHeight / 2 - height / 2;

  return [
    "resizable,scrollbars,status",
    "height=" + height,
    "width=" + width,
    "left=" + left,
    "top=" + top
  ].join();
};
class Fullarticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: null,
      collection: null,
      showReplyInput: []
    };
    this.canvas = null;
    this.verify = null;
    this.article = React.createRef();
    this.back = React.createRef();
    this.textarea = React.createRef();
  }

  componentDidMount() {
    // window.twttr.widgets.load();
    let sid = this.props.selectedSid;
    if (!this.props.selectedSid) {
      sid = this.props.match.params.id;
    }
    this.props.dispatch(fetchFullArticle(sid));
    this.back.current.addEventListener("click", this.closeFull);
    this.setState({ isOpen: true });
    document.body.style.overflow = "hidden"; //52.221.144.169
    /*Increase views */ axios.post("http://18.139.60.49:5000/views_increase.api", {
      sid: sid
    });
    ///驗證//
    this.props.dispatch(newCommentCode());

    /////
    fetch("http://18.139.60.49:5000/is_logined", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.user_id) {
          this.setState({ user: data });

          axios
            .get("http://18.139.60.49:5000/collection.api", {
              params: {
                sid: data.user_id
              }
            })
            .then(res => {
              this.setState({ collection: JSON.parse(res.data[0].collection) });
            });
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.collection);
    window.twttr.widgets.load();
    var fbBtn = document.querySelector(".facebook-share");
    var title = encodeURIComponent("Hey everyone, come & see how good I look!");
    var shareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      window.location.href +
      "&title=" +
      title;
    fbBtn.href = shareUrl;

    fbBtn.addEventListener("click", function(e) {
      e.preventDefault();
      var win = window.open(shareUrl, "ShareOnFb", getWindowOptions());
      win.opener = null;
    });
    ////////////////////////////

    if (
      this.props.post &&
      this.props.post.comment &&
      this.state.showReplyInput.length === 0
    ) {
      console.log("123");
      let comment = JSON.parse(this.props.post.comment);
      let arr = [];
      for (let i = 0; i < comment.length; i++) {
        arr.push(false);
      }
      this.setState({ showReplyInput: arr });
    }
  }

  commentHandler = () => {
    if (this.verify.value.toUpperCase() !== this.props.code) {
      return window.alert("驗證碼錯誤!請重新輸入");
    }

    let comments = [];
    if (this.props.post.comment) {
      comments = JSON.parse(this.props.post.comment);
    }

    let date = new Date().toLocaleDateString("zh-tw", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    comments.push({
      text: encodeURIComponent(this.props.commentInput),
      reply: "",
      id: comments.length + 1,
      disable: 0,
      edited: 0,
      userName: this.state.user ? this.state.user.session_name : null,
      userId: this.state.user ? this.state.user.user_id : null,
      userImg: this.state.user ? this.state.user.session_photo : null,
      date: date
    });
    this.props.dispatch(
      replyArticle(this.props.post.sid, JSON.stringify(comments))
    );
    this.textarea.current.value = "";
    this.props.dispatch(newCommentCode());
    this.verify.value = "";
  };

  userReply = id => {
    let input = document.getElementById(`reply${id}`).value;

    if (!input.length > 0) {
      return;
    }
    let comment = JSON.parse(this.props.post.comment)[id - 1];
    console.log(comment);
    let userReply = [];
    if (comment.userReply) {
      userReply = comment.userReply;
    }
    console.log(userReply);
    let content = {
      userId: this.state.user ? this.state.user.user_id : null,
      userName: this.state.user ? this.state.user.session_name : null,
      userImg: this.state.user ? this.state.user.session_photo : null,
      text: input
    };
    userReply.push(content);
    comment.userReply = userReply;
    let updatedComment = JSON.parse(this.props.post.comment);
    updatedComment[id - 1] = comment;
    this.props.dispatch(
      replyArticle(this.props.post.sid, JSON.stringify(updatedComment))
    );
  };

  closeFull = event => {
    if (event.target.id === "back") {
      this.setState({ isOpen: false });
      document.body.style.overflowY = "auto";
      this.props.history.push("/news/");
      setTimeout(() => window.scrollTo(0, this.props.scrollY), 10);
    }
  };

  collectHandler = () => {
    let collection = [];
    let sid = this.props.selectedSid;
    if (this.state.collection) {
      collection = this.state.collection;
    }
    let included = false;
    if (collection.length > 0) {
      for (let id of collection) {
        if (id === sid) {
          collection = collection.filter(item => item !== sid);
          this.setState({ collection: collection });
          included = true;
          break;
        }
      }
    }
    if (!included) {
      collection.push(sid);
      this.setState({ collection: collection });
    }

    //52.221.144.169
    axios.post("http://18.139.60.49:5000/new_collection.api", {
      collection: JSON.stringify(collection),
      sid: this.state.user.user_id
    });
    // .then(res => {
    //   this.props.dispatch({
    //     type: "NEW_COLLECTION",
    //     user: res.data[0]
    //   });
    // });
  };

  render() {
    let collected = false;
    if (this.state.collection) {
      if (this.state.collection.length > 0) {
        for (let sid of this.state.collection) {
          if (sid === +this.props.selectedSid) {
            collected = true;
          }
        }
      }
    }
    let figure,
      text,
      title,
      commentList,
      views = null;
    if (this.props.post) {
      const { post } = this.props;
      let endPoint = post.text.indexOf("</figure>") + 9;
      figure = post.text.slice(0, endPoint);
      text = post.text.slice(endPoint);
      title = post.title;
      views = post.views;
      commentList = (
        <div className={classes.Comment}>
          <p>目前沒有留言</p>
        </div>
      );
      if (post.comment) {
        let comments = JSON.parse(post.comment);
        let src = image;
        commentList = comments.map((comment, index) => {
          if (comment.disable === 0) {
            if (comment.userImg) {
              src = comment.userImg;
            }
            return (
              <div key={"c" + index}>
                <div className={classes.Comment}>
                  {comment.userName && comment.userId ? (
                    <div className="d-flex align-items-center">
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginRight: "5px",
                          border: "1px solid black"
                        }}
                        alt="userImage"
                        src={src}
                      />
                      <Link
                        to={"/member/edit/" + comment.userId}
                        onClick={() => {
                          document.body.style.overflowY = "auto";
                        }}
                      >
                        <h5
                          style={{
                            color: "black",
                            textDecoration: "underline"
                          }}
                        >
                          {comment.userName}:
                        </h5>
                      </Link>
                    </div>
                  ) : (
                    <h5>匿名</h5>
                  )}
                  <div
                    style={{
                      width: "100%",
                      border: "none",
                      background: "#f7f7f8",
                      height: "auto"
                    }}
                    id={`text${index}`}
                  >
                    {decodeURIComponent(comment.text)}
                  </div>
                  <div className="d-flex">
                    {comment.edited && +comment.edited === 1 ? (
                      <span>*留言編輯於</span>
                    ) : null}
                    <span>{comment.date}</span>
                  </div>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>
                      <span
                        onClick={() => {
                          let arr = this.state.showReplyInput;
                          arr[index] = !arr[index];
                          this.setState({ showReplyInput: arr });
                        }}
                        className={classes.SpanSuccess}
                      >
                        回覆
                      </span>
                    </div>
                    {this.state.user &&
                    this.state.user.user_id === comment.userId ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end"
                        }}
                      >
                        <span
                          onClick={() => {
                            let text = document.getElementById(`text${index}`);
                            let send = document.getElementById(`send${index}`);
                            let cancel = document.getElementById(
                              `cancel${index}`
                            );
                            text.contentEditable = true;
                            send.style.display = "initial";
                            cancel.style.display = "initial";
                            text.style.background = "white";
                            text.focus();
                          }}
                          className={classes.SpanSuccess}
                        >
                          編輯
                        </span>
                        <span
                          id={`send${index}`}
                          style={{ display: "none" }}
                          onClick={() => {
                            let newComments = JSON.parse(
                              this.props.post.comment
                            );
                            let send = document.getElementById(`send${index}`);
                            let text = document.getElementById(`text${index}`);
                            let cancel = document.getElementById(
                              `cancel${index}`
                            );
                            let date = new Date().toLocaleDateString("zh-tw", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit"
                            });
                            newComments[index].text = text.innerText.replace(
                              /\s+/g,
                              ""
                            );
                            newComments[index].date = date;
                            newComments[index].edited = 1;
                            this.props.dispatch(
                              replyArticle(
                                this.props.post.sid,
                                JSON.stringify(newComments)
                              )
                            );
                            text.style.background = "#f7f7f8";
                            send.style.display = "none";
                            cancel.style.display = "none";
                          }}
                          className={classes.SpanConfirm}
                        >
                          送出
                        </span>
                        <span
                          id={`cancel${index}`}
                          style={{ display: "none" }}
                          onClick={() => {
                            let text = document.getElementById(`text${index}`);
                            let send = document.getElementById(`send${index}`);
                            let cancel = document.getElementById(
                              `cancel${index}`
                            );
                            text.contentEditable = false;
                            text.innerText = JSON.parse(
                              this.props.post.comment
                            )[index].text;
                            send.style.display = "none";
                            cancel.style.display = "none";
                            text.style.background = "#f7f7f8";
                            text.blur();
                          }}
                          className={classes.SpanDanger}
                        >
                          取消
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {this.state.showReplyInput[index] ? (
                  <div
                    style={{
                      background: "#f7f7f8",
                      width: "100%",
                      display: "flex",
                      padding: "10px",
                      marginBottom: "10px"
                    }}
                    className={classes.ReplyInput}
                  >
                    <input type="text" id={`reply${comment.id}`} />
                    <span
                      onClick={() => {
                        this.userReply(comment.id);
                        let arr = this.state.showReplyInput;
                        arr[index] = !arr[index];
                        this.setState({ showReplyInput: arr });
                      }}
                      className={classes.SpanConfirm}
                    >
                      送出
                    </span>

                    <span
                      onClick={() => {
                        let arr = this.state.showReplyInput;
                        arr[index] = !arr[index];
                        this.setState({ showReplyInput: arr });
                      }}
                      className={classes.SpanDanger}
                    >
                      取消
                    </span>
                  </div>
                ) : null}

                {comment.reply ? (
                  <div className={classes.Reply}>
                    <div
                      className="d-flex"
                      style={{
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={image}
                        alt=".."
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "5px",
                          border: "1px solid black"
                        }}
                      />
                      <p>作者回覆:</p>
                    </div>
                    <p>{comment.reply}</p>
                  </div>
                ) : null}

                {comment.userReply
                  ? comment.userReply.map(reply => {
                      return (
                        <div
                          className={classes.Reply}
                          style={{ marginBottom: "10px" }}
                        >
                          {reply.userName ? (
                            <div
                              className="d-flex"
                              style={{
                                alignItems: "center"
                              }}
                            >
                              <img
                                src={reply.userImg}
                                alt=".."
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                  marginRight: "5px",
                                  border: "1px solid black"
                                }}
                              />
                              <p>{reply.userName}</p>
                            </div>
                          ) : (
                            <p>匿名</p>
                          )}

                          {/* <p>{reply.userId}</p> */}
                          <p>{reply.text}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            );
          } else {
            return (
              <div className={classes.Comment}>
                <p>留言已被封鎖</p>
              </div>
            );
          }
        });
      }
    }

    let disable = true;
    if (this.textarea.current && this.textarea.current.value.length >= 10) {
      disable = false;
    }

    return (
      <React.Fragment>
        <div
          id="back"
          className={classes.Full}
          ref={this.back}
          style={{ width: "100%" }}
        >
          <div className={classes.Article} ref={this.article}>
            <Container>
              <Row>
                <Col lg={3}>
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      paddingTop: "80px",
                      marginRight: "20px"
                    }}
                  >
                    {title}
                  </h1>
                </Col>
                <Col lg={9}>
                  <div className={classes.Panel}>
                    {this.state.user ? (
                      <div className={classes.Collect}>
                        <span onClick={this.collectHandler}>
                          {collected ? "已收藏" : "收藏此文章"}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className={classes.SocialMedia}>
                      分享此篇文章:
                      <div>
                        <a
                          style={{ fontSize: "1.2rem", color: "red" }}
                          href={`https://twitter.com/intent/tweet?url=${
                            window.location.href
                          }&text="bike news!"`}
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      </div>
                      <div>
                        <a
                          href="/"
                          style={{ fontSize: "1.2rem", color: "red" }}
                          className="facebook-share"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                        <span> 觀看人數： {views ? views : 0} </span>
                      </div>
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: figure }} />
                  <div dangerouslySetInnerHTML={{ __html: text }} />

                  {commentList}
                  <div className={classes.CommentArea}>
                    <textarea
                      ref={this.textarea}
                      onChange={() =>
                        this.props.dispatch({
                          type: "COMMENT_INPUT",
                          input: this.textarea.current.value
                        })
                      }
                      placeholder="留言內容請輸入10個字以上~"
                    />
                  </div>
                  <div className={classes.CommentButton}>
                    <div>
                      <span>請輸入下方驗證碼</span>
                      <input ref={el => (this.verify = el)} />{" "}
                    </div>
                    <div>
                      <span>若未登入將以匿名送出留言</span>
                      <Button
                        variant="dark"
                        onClick={this.commentHandler}
                        disabled={disable}
                        style={{ borderRadius: 0 }}
                      >
                        送出留言
                      </Button>
                    </div>
                  </div>
                  <div className={classes.Verify}>
                    <Verify code={this.props.code} />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.fullArticle.isFetching,
    post: state.fullArticle.post,
    commentInput: state.fullArticle.commentInput,
    selectedSid: state.fullArticle.selectedSid,
    scrollY: state.fullArticle.scrollY,
    code: state.verify.commentCode
  };
};

export default connect(mapStateToProps)(withRouter(Fullarticle));
