import { CLOSE_MODAL, SHOW_MODAL } from "../modalActions";

const modal = (state = {
  show: false
}, action) => {
  switch(action.type){
    case SHOW_MODAL:
      return Object.assign({}, state, {
        show: true,
        bodyText: action.bodyText,
        buttonText: action.buttonText,
        noBtn: action.noBtn,
        noCBtn: action.noCBtn,
        backdrop: action.backdrop,
        confirm: action.confirm
      });
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        show: false
      });

    default:
    return state
  }
}

export default modal;