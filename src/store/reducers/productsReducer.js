import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS } from "../productsActions";

const initialState = {
  isFetching: false,
  productsLists: [],
  page: 1,
  filter: false,
};

function products(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        productsLists: [...state.productsLists, ...action.products],
        page: action.page,
        totalPage: action.totalPage
      });
    case "CHANGE_FILTER":
      return Object.assign({}, state, {
        filter: action.filter,
        productsLists: [],
        page: 1
      })
    default:
      return state;
  }
}

export default products;