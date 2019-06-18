
export const NEW_COMMENT_CODE = "NEW_COMMENT_CODE";
export const NEW_SIGNUP_CODE = "NEW_SIGNUP_CODE";


let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export function newCommentCode () {
  let code = "";
  let arr = [
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1
  ]
  arr.forEach(number => {
    return code += str[number]
  });

  return {
    type: NEW_COMMENT_CODE,
    code: code
  }
}
export function newSignUpCode () {
  let code = "";
  let arr = [
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1,
    Math.ceil(Math.random() * 35) - 1
  ]
  arr.forEach(number => {
    return code += str[number]
  });

  return {
    type: NEW_SIGNUP_CODE,
    code: code
  }
}