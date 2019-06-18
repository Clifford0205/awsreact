import { RECEIVE_POSTS, REQUEST_POSTS, RECEIVE_POPULAR, REQUEST_POPULAR, SEARCH_ON_CHANGE, TYPE_ON_CHANGE, CLEAR_ALL_FILTER } from "../newsActions";

const initialState = {
  isFetching: false,
  newsLists: [],
  page: 1,
  isFetchingPopular: false,
  popularList: [],
  search: null,
  filter: null,
  totalPage: null
};

function news(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        newsLists: [...state.newsLists, ...action.posts],
        page: action.page,
        totalPage: action.totalPage
      });
      case SEARCH_ON_CHANGE:
        return Object.assign({}, state, {
          search: action.search,
          newsLists: [],
          page: 1
        });
      case TYPE_ON_CHANGE:
        return Object.assign({}, state, {
          filter: action.filter,
          newsLists: [],
          page: 1
        });
      case CLEAR_ALL_FILTER:
        return Object.assign({}, state, {
          filter: null,
          search: null,
          newsLists: [],
          page: 1
        });
      case REQUEST_POPULAR:
      return Object.assign({}, state, {
        isFetchingPopular: true
      });
    case RECEIVE_POPULAR:
      return Object.assign({}, state, {
        isFetchingPopular: false,
        popularList: [...action.posts]
      });
    default:
      return state;
  }
}

export default news;
