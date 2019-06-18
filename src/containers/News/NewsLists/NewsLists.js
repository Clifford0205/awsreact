import React from "react";
import Button from "../../../components/Button/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NewsList from "../../../components/NewsList/NewsList";
import FullArticle from "../../FullArticle/FullArticle";
import { TweenMax, Power4, TimelineLite } from "gsap/all";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts, fetchPopular } from "../../../store/newsActions";
import classes from "./NewsLists.module.css";
import "intersection-observer";

class NewsLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShow: false,
      scrollY: 0
    };
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.1) {
          TweenMax.to(entry.target, 1.5, {
            y: 0,
            autoAlpha: 1,

            ease: Power4.easeOut
          });
        }
      });
    };
    this.observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.1
    });

    this.tl = new TimelineLite();
    this.search = null;
  }

  componentDidMount(prevProps) {
    this.setState({ currentShow: true }); //切換route後觸發動畫
    if (this.props.newsLists.length === 0) {
      this.props.dispatch(
        fetchPosts(this.props.page, this.props.search, this.props.filter)
      );
    }
    if (this.props.popularList.length === 0) {
      this.props.dispatch(fetchPopular());
    }
  }

  componentDidUpdate(prevProps) {
    let lists = document.querySelectorAll(".lists");
    lists.forEach(list => this.observer.observe(list));

    if (
      this.props.search !== prevProps.search ||
      this.props.filter !== prevProps.filter
    ) {
      this.props.dispatch(
        fetchPosts(this.props.page, this.props.search, this.props.filter)
      );
    }
  }

  moreArticle = () => {
    this.props.dispatch(
      fetchPosts(this.props.page + 1, this.props.search, this.props.filter)
    );
  };

  fullArticleHandler = sid => {
    // let scrollY = window.scrollY;
    // this.setState({scrollY});
    this.props.dispatch({
      type: "OPEN",
      selectedSid: sid,
      scrollY: window.scrollY
    });
    this.props.history.push("/news/" + sid);
  };

  render() {
    document.body.style.overflowY = "auto"; //對應瀏覽器按上一頁
    let lists = null;
    let sizes = [4, 4, 4, 4, 8, 8, 4];
    if (this.props.newsLists.length > 0) {
      lists = this.props.newsLists.map((list, index) => {
        return (
          <NewsList
            title={list["title"]}
            type={list["type"]}
            text={list["text"]}
            key={list["sid"]}
            sid={list["sid"]}
            size={sizes[index % 7]}
            onClick={() => {
              this.fullArticleHandler(list["sid"]);
            }}
          />
        );
      });
      lists.push(
        <Button
          key={this.props.page}
          btnName="更多文章"
          onClick={this.moreArticle}
          disable={this.props.page === this.props.totalPage ? true : false}
        />
      );
    } else {
      lists = this.props.isFetching ? null : (
        <Col xs={12} className="d-flex    justify-content-center">
          <h5 className={classes.Font}>沒有相關文章！</h5>
        </Col>
      );
    }
    return (
      <React.Fragment>
        <div className={classes.NewsLists}>
          <Row>
            <Col
              xs={11}
              lg={10}
              style={{
                width: "100%",
                margin: "0 auto"
              }}
            >
              <Row>{lists}</Row>
            </Col>
          </Row>
        </div>

        <Route path="/news/:id" exact render={() => <FullArticle />} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.news.isFetching,
    newsLists: state.news.newsLists,
    page: state.news.page,
    popularList: state.news.popularList,
    isFetchingPopular: state.news.isFetchingPopular,
    filter: state.news.filter,
    search: state.news.search,
    totalPage: state.news.totalPage
  };
};

export default connect(mapStateToProps)(withRouter(NewsLists));
