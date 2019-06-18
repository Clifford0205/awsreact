import {LOGIN_REQUEST, LOGIN_RESULT, USERNAME_INPUT, PASSWORD_INPUT, SHOW_SIGN_IN, CLEAR_FORM, GET_ORDERS, SET_USER_PAGE} from "../loginActions";

const loginStatus = (state = {
  username: "",
  password: "",
  isAuth: false,
  isLogging: false,
  result: null,
  showSignIn: false,
  user: null,
  orders: null,
  userPage: null
}, action) => {
  switch(action.type){
    case "LOG_OUT":
      return Object.assign({}, state, {
        result: null,
        isAuth: false,
        user: null,
        orders: null,
      })

    case "ALREADY_AUTH":
      return Object.assign({}, state, {
        user: action.user
      })
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLogging: true
      });
    case LOGIN_RESULT:
      return Object.assign({}, state, {
        isLogging: false,
        result: action.result,
        isAuth: action.isAuth,
        user: action.user
      });
    case USERNAME_INPUT:
      return Object.assign({}, state, {
        username: action.value
      });
    case PASSWORD_INPUT:
      return Object.assign({}, state, {
        password: action.value
      });
    case SHOW_SIGN_IN:
      return Object.assign({}, state, {
        showSignIn: action.show
      });
    case CLEAR_FORM:
      return Object.assign({}, state, {
        username: "",
        password: "",
        result: null
      })
    case GET_ORDERS:
      return Object.assign({}, state, {
        orders: action.orders
      })
    case SET_USER_PAGE:
      return Object.assign({}, state, {
        userPage: action.data
      })
    case "NEW_COLLECTION":
      return Object.assign({}, state, {
        user: action.user
      }) 
    default:
      return state;
  }
}

export default loginStatus;