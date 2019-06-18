import { ALERT_DISAPPEAR, ALERT_APPEAR } from "../actions/";

function alertReducer(
  state = { appear: false, disappear: null, success: null, msg: "" },
  action
) {
  switch (action.type) {
    case ALERT_APPEAR:
      return {
        appear: true,
        disappear: false,
        success: action.payload.success,
        msg: action.payload.msg
      };
    case ALERT_DISAPPEAR:
      return {
        appear: false,
        disappear: true,
        success: null,
        msg: ""
      };
    default:
      return state;
  }
}

export default alertReducer;
