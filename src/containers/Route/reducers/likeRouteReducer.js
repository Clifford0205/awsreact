import {
  ADD_TO_LIKE_SUCCESS,
  ADD_TO_CHALLENGE_SUCCESS_SUCCESS,
  CLEAR_STATE_LIKE,
} from '../actions';

function likeRouteReducer(state = { liked: [], challengeSuccess: [] }, action) {
  switch (action.type) {
    case ADD_TO_LIKE_SUCCESS:
      return {
        ...state,
        liked: action.payload,
      };
    case ADD_TO_CHALLENGE_SUCCESS_SUCCESS:
      return {
        ...state,
        challengeSuccess: action.payload,
      };
    case CLEAR_STATE_LIKE:
      return (state = { liked: [], challengeSuccess: [] });
    default:
      return state;
  }
}
export default likeRouteReducer;
