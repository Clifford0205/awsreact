import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_RESULT = "LOGIN_RESULT";
export const USERNAME_INPUT = "USERNAME_INPUT";
export const PASSWORD_INPUT = "PASSWORD_INPUT";
export const SHOW_SIGN_IN = "SHOW_SIGN_IN";
export const CLEAR_FORM = "CLEAR_FORM";
export const GET_ORDERS = "GET_ORDERS";
export const SET_USER_PAGE = "SET_USER_PAGE"

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

export const showSignIn = (show) => {
  return {
    type: SHOW_SIGN_IN,
    show: show
  }
}

const loginResult = (result) => {
  return {
    type: LOGIN_RESULT,
    result: result.data,
    isAuth: false,
    user: result.data.user
  }
}

function get_orders (orders) {
  return {
    type: GET_ORDERS,
    orders: orders
  }
}

export const getOrders = (id) => {
  return dispatch => {
    return axios.get("http://52.221.144.169:5000/get_order.api", {
      params:{
        id: id
      }
    }).then(res => dispatch(get_orders(res.data)));
  }
}

export const usernameInput = (value) => {
  return {
    type: USERNAME_INPUT,
    value: value
  }
}
export const passwordInput = (value) => {
  return {
    type: PASSWORD_INPUT,
    value: value
  }
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginRequest());
    axios.post("http://52.221.144.169:5000/logintest", {
      email: email,
      password: password
    }).then(res => {
      dispatch(loginResult(res));
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          dispatch(showSignIn(false))
          document.body.style.overflowX = "hidden";
          document.body.style.overflowY = "auto";
          dispatch(clearForm())}, 1000);
      }
    })
  }
}

function setUserPage (data) {
  return {
    type: SET_USER_PAGE,
    data: data
  }
}

export const getUserPage = (id) => {
  return dispatch => {
    return  axios.get("http://52.221.144.169:5000/get_userpage.api", {
      params : {
        id: id
      }
    }).then(res => {
      dispatch(setUserPage(res.data));
    });
  }
}