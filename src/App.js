import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Loading from "./components/LoadingAnimation/Loading";
import Nav from "./components/Nav/Nav";
import Main from "./containers/Main/Main";
import Routes from "./containers/Route/Route";
import Group from "./containers/Group/Group";
import Course from "./containers/Course/Course";
import News from "./containers/News/News";
import Products from "./containers/Products/Products";
import Footer from "./containers/Footer/Footer";
import Login from "./components/member/page/Login";
import edit from "./components/member/page/edit";
import password from "./components/member/page/password";
import road from "./components/member/page/road";
import memberProduct from "./components/member/page/product";
import course from "./components/member/page/course";
import news from "./components/member/page/news";
import { isLoading } from "./store/loadingActions";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import CourseMain from "./containers/Course/containers/CourseMain";
import CourseBackItForm from "./containers/Course/containers/CourseBackItForm";
// import CourseList from "./containers/Course/containers/CourseList";
//Route--------------------------------------------
import RouteDisplay from "./containers/Route/containers/RrouteDisplay";
import RouteDetail from "./containers/Route/containers/RouteDetail";
import RouteAddNew from "./containers/Route/containers/RouteAddNew";
import FullArticle from "./containers/FullArticle/FullArticle";
// import FML from './containers/Route/client01'
// import Loading from "./components/LoadingAnimation/Loading";
//------------------------//
//import 商品頁面
import SingleProduct from "./containers/Products/ProductSingle/ProductSinglePage";
import Orders from "./containers/Products/oder/orders";
import checkout from "./containers/Products/checkout/checkout";
//----------------------//
const routes = [
  // { path: '/', name: 'Home', Component: Main },
  { path: "/route", name: "About", Component: RouteDisplay },
  { path: "/route/addnew", name: "About", Component: RouteAddNew },
  { path: "/route/:id", name: "About", Component: RouteDetail },

  { path: "/group", name: "Contact", Component: Group },
  {
    path: "/course/backIt/:id/",
    name: "Contact",
    Component: CourseBackItForm
  },
  { path: "/course/:id", name: "Contact", Component: CourseMain },
  { path: "/course", name: "Contact", Component: Course },
  { path: "/news", name: "Contact", Component: News },
  { path: "/news/:id", name: "Contact", Component: FullArticle },
  { path: "/login", name: "Contact", Component: Login },
  { path: "/member/edit/:id", name: "Contact", Component: edit },
  { path: "/member/password/:id", name: "Contact", Component: password },
  { path: "/member/road/:id", name: "Contact", Component: road },
  { path: "/member/product/:id", name: "Contact", Component: memberProduct },
  { path: "/member/course/:id", name: "Contact", Component: course },
  { path: "/member/news/:id", name: "Contact", Component: news },
  { path: "/products", name: "Contact", Component: Products },
  { path: `/products2/:id`, Component: SingleProduct },
  { path: "/orders/:id", name: "Contact", Component: Orders },
  { path: "/checkout", name: "Contact", Component: checkout }
];
//   { path: "/group", name: "Contact", Component: Group },
//   { path: "/course/backIt/:id/", name: "Contact", Component: CourseBackItForm },
//   { path: "/course/:id", name: "Contact", Component: CourseMain },
//   { path: "/course", name: "Contact", Component: Course },
//   { path: "/news", name: "Contact", Component: News },
//   { path: "/products", name: "Contact", Component: Products },
//   {path: "/login", name: "Contact", Component: Login},
//   {path: "/member/edit/:id", name: "Contact", Component: edit},
//   {path: "/member/password/:id", name: "Contact", Component: password},
//   {path: "/member/road/:id", name: "Contact", Component: road},
//   {path: "/member/product/:id", name: "Contact", Component: product},
//   {path: "/member/course/:id", name: "Contact", Component:course},
//   {path: "/member/news/:id", name: "Contact", Component:news}

// {

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, collectionProduct: [], id: null, test: false };
  }
  componentDidMount() {
    setTimeout(() => this.props.dispatch(isLoading()));
    // window.twttr.widgets.load();
  }
  // componentDidUpdate() {
  //   window.twttr.widgets.load();
  // }

  toggle = () => {
    this.setState(
      {
        modal: !this.state.modal
      },
      () => console.log(this.state.modal)
    );
  };
  deleteCartItem = index => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index, 1);

    this.setState({
      cart
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  ModalReset = () => {
    if (localStorage.getItem("cart")) {
      this.setState({
        modal: !this.state.modal
      });
      this.props.history.push("/checkout");
    } else {
      this.setState({
        modal: !this.state.modal
      });

      alert("請先選擇商品");
    }
  };

  render() {
    const { isLoading, isAnimated } = this.props;

    // return isLoading || !isAnimated ? (
    //   <Loading {...this.props} />
    // ) :
    return (
      // <Router>
      <div>
        <Nav {...this.props} />
        <Switch>
          <Route path="/" exact component={Main} />
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} exact>
              {({ match }) => (
                <Component
                  {...this.props}
                  show={match !== null}
                  onToggle={this.toggle}
                  deleteCartItem={this.deleteCartItem}
                  modal={this.state.modal}
                  handleCollect={this.handleCollect}
                  ModalReset={this.ModalReset}
                />
              )}
            </Route>
          ))}
        </Switch>
        <Footer />
      </div>
      // </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    isAnimated: state.loading.isAnimated
  };
};

export default connect(mapStateToProps)(withRouter(App));
