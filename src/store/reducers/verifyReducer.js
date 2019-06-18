import { NEW_COMMENT_CODE, NEW_SIGNUP_CODE } from "../verifyActions";

const verify = (state = {
  commentcode: "",
  signUpcode: ""
}, action) => {
  switch(action.type){
    case NEW_COMMENT_CODE:
      return Object.assign({}, state, {
        commentCode: action.code
      })
    case NEW_SIGNUP_CODE:
      return Object.assign({}, state, {
        signUpCode: action.code
      })  
    default:
      return state;
  }
}

export default verify;