import { IS_LOADING, IS_ANIMATED } from "../loadingActions";

const loading = (
  state = {
    isLoading: true,
    isAnimated: false
  },
  action
) => {
  switch (action.type) {
    case IS_LOADING:
      return Object.assign({}, state, {
        isLoading: false
      });
    case IS_ANIMATED:
      return Object.assign({}, state, {
        isAnimated: true
      });
    default:
      return state;
  }
};

export default loading;
