import axios from "axios";

export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POST = "RECEIVE_POST";

const requestPost = () => {
  return {
    type: REQUEST_POST
  };
};

const receivePost = data => {
  return {
    type: RECEIVE_POST,
    post: data
  };
};
//52.221.144.169
export const fetchFullArticle = sid => {
  return dispatch => {
    dispatch(requestPost());
    return axios
      .get("http://18.139.60.49:5000/get_article.api", {
        params: {
          sid: sid
        }
      })
      .then(res => {
        dispatch(receivePost(res.data[0]));
      });
  };
};

export const replyArticle = (sid, updatedComments) => {
  return dispatch => {
    axios
      .post("http://18.139.60.49:5000/new_comment.api", {
        sid: sid,
        comment: updatedComments
      })
      .then(res => {
        dispatch(fetchFullArticle(sid));
      });
  };
};
