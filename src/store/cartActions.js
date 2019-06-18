import axios from "axios";

export const CART_IS_OPEN = "CART_IS_OPEN";
export const ADD_TO_CART = "ADD_TO_CART";
export const CART_ON_REFRESH = "CART_ON_REFRESH";
export const CHECK_OUT = "CHECK_OUT";
export const CHECK_OUT_SUCCESS = "CHECK_OUT_SUCCESS";
export const IS_ADDING = "IS_ADDING";


export const cartIsOpen = () => {
  return {
    type: CART_IS_OPEN
  }
}

export function cartOnRefresh (list) {
  return {
    type: CART_ON_REFRESH,
    list: list
    
  }
}

function addToCart (item, qty) {
  return {
    type: ADD_TO_CART,
    item: item,
    qty: qty
  }
}

function isAdding (adding) {
  return {
    type: IS_ADDING,
    isAdding: adding
  }
}

export const checkQty = (sid, qty) => {
  return dispatch => {
    dispatch(isAdding(true));
    axios.get("http://52.221.144.169:5000/product_available.api", {
      params: {
        sid: sid,
        qty: qty
      }
    })
    .then(res => {
      if(!res.data.available){
        return (window.alert("商品已完售!"))
      }
      if(res.data.available){
        dispatch(isAdding(false));
       return dispatch(addToCart(res.data.item, qty))
      }
    })
  }
}

export const removeFromCart = (sid, qty) => {
  return dispatch => {
    axios.post("http://52.221.144.169:5000/remove_from_cart.api", {
      sid: sid,
      qty: qty
    }).then(res => {
      if(!qty){
        qty = 1;
      }
      dispatch(addToCart(res.data.item, -qty))
    })
  }
}

export function checkout (checkout) {
  return {
    type: CHECK_OUT,
    checkout: checkout
  }
}

export function checkOutSuccess () {
  localStorage.removeItem("selected");
  return {
    type: CHECK_OUT_SUCCESS,
    selected: [],
    totalPrice: 0
  }
}

