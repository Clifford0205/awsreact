import axios from "axios";
import { actionChannel } from "@redux-saga/core/effects";

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  };
}

function receiveProducts(json, page) {
  return {
    type: RECEIVE_PRODUCTS,
    products: json.data.data,
    page: page,
    totalPage: json.data.totalPage
  };
}

export function fetchProducts(page, filter) {
  return dispatch => {
    dispatch(requestProducts());
    return axios
      .get("http://52.221.144.169:5000/products_list.api", {
        params: {
          page: page,
          filter: filter
        }
      })
      .then(json => {
        dispatch(receiveProducts(json, page));
      }).catch(error => console.log(error));
  };
}