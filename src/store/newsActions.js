import axios from "axios";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_POPULAR = "REQUEST_POPULAR";
export const RECEIVE_POPULAR = "RECEIVE_POPULAR";
export const SEARCH_ON_CHANGE = "SEARCH_ON_CHANGE";
export const TYPE_ON_CHANGE = "TYPE_ON_CHANGE";
export const CLEAR_ALL_FILTER = "CLEAR_ALL_FILTER";
export const NO_MORE_NEWS = "NO_MORE_NEWS";

function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

function receivePosts(json, page) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.data,
    page: page,
    totalPage: json.data.totalPage
  };
}

function requestPopular() {
  return {
    type: REQUEST_POPULAR
  };
}

function receivePopular(json) {
  return {
    type: RECEIVE_POPULAR,
    posts: json.data
  };
}

export function searchOnChange(search) {
  return {
    type: SEARCH_ON_CHANGE,
    search: search
  };
}

export function typeOnChange(filter) {
  return {
    type: TYPE_ON_CHANGE,
    filter: filter
  };
}

export function clearAllFilter() {
  return {
    type: CLEAR_ALL_FILTER
  };
}

// http://52.221.144.169:5000

export function fetchPosts(page, search, filter) {
  return dispatch => {
    dispatch(requestPosts());
    return axios
      .get("http://18.139.60.49:5000/news_list.api", {
        params: {
          page: page,
          search: search,
          filter: filter
        }
      })
      .then(json => {
        dispatch(receivePosts(json, page));
      })
      .catch(error => console.log(error));
  };
}

export function fetchPopular() {
  return dispatch => {
    dispatch(requestPopular());
    return axios.get("http://18.139.60.49:5000/popular_list.api").then(json => {
      dispatch(receivePopular(json));
    });
  };
}
