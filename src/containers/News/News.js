import React from "react";
import classes from "./News.module.css";
// import { TweenMax } from "gsap/all";
// import { Transition } from "react-transition-group";
import ContentPage from "../ContentPage/ContentPage";
import { connect } from "react-redux";
import {
  searchOnChange,
  typeOnChange,
  clearAllFilter
} from "../../store/newsActions";
import NewsLists from "./NewsLists/NewsLists";
import Control from "./Control/Control";
import PopularNews from "./PopularNews/PopularNews";
import CSSPlugin from "gsap/CSSPlugin";
import { Col } from "react-bootstrap";

const C = CSSPlugin;

const startState = { autoAlpha: 0, y: -50 };

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopular: false
    };
    this.search = null;
  }

  componentDidMount() {}

  toggleList = e => {
    if (e.target.getAttribute("value") === "false") {
      this.setState({ showPopular: false });
    } else {
      this.setState({ showPopular: true });
    }
  };

  filterHandler = e => {
    let type = e.target.getAttribute("data-value");
    if (type === this.props.filter) type = null;
    this.props.dispatch(typeOnChange(type));
  };

  searchHandler = () => {
    let search = this.search.value;
    if (this.props.search !== null) {
      return this.props.dispatch(searchOnChange(null));
    }
    this.props.dispatch(searchOnChange(search));
    this.search.value = null;
  };

  clearAllHandler = () => {
    this.props.dispatch(clearAllFilter());
  };

  render() {
    return (
      <div className={classes.News}>
        <ContentPage style={{ background: "#FAFAFA" }}>
          <Control
            toggle={this.toggleList}
            filterHandler={this.filterHandler}
            searchHandler={this.searchHandler}
            clearAllHandler={this.clearAllHandler}
            setRef={el => (this.search = el)}
            showPopular={this.state.showPopular}
            {...this.props}
          />

          <div className={classes.Toggle}>
            <ul>
              <li
                onClick={e => {
                  this.toggleList(e);
                  if (this.props.filter || this.props.search) {
                    this.clearAllHandler();
                  }
                }}
                value="false"
              >
                所有文章
              </li>
              <li
                onClick={e => {
                  this.toggleList(e);
                  if (this.props.filter || this.props.search) {
                    this.clearAllHandler();
                  }
                }}
                value="true"
              >
                熱門文章
              </li>
            </ul>
          </div>
          {this.state.showPopular ? <PopularNews /> : <NewsLists />}
        </ContentPage>
      </div>
      // </Transition>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.news.search,
    filter: state.news.filter,
    isFetching: state.news.isFetching
  };
};

export default connect(mapStateToProps)(News);
