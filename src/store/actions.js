import { getCachedData } from '../shared';

export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';
export const CHANGE_RESPONSE_ORIGIN = 'CHANGE_RESPONSE_ORIGIN'; //will change the origin of a response either (server or cache)

const changeResponseOrigin = (origin) => {
  return {
    type: CHANGE_RESPONSE_ORIGIN,
    payload: origin,
  };
};

const getPostsStart = () => {
  return {
    type: GET_POSTS_START,
  };
};

const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts,
  };
};

const getPostsFail = (error) => {
  return {
    type: GET_POSTS_FAIL,
    payload: error,
  };
};

export const getPosts = () => {
  return (dispatch) => {
    dispatch(getPostsStart());
    getCachedData(
      'react_cache',
      'https://jsonplaceholder.typicode.com/posts?_delay=7000',
      'GET',
      10 //ten seconds
    )
      .then((posts) => {
        dispatch(getPostsSuccess(posts.data));
        dispatch(changeResponseOrigin(posts.from));
      })
      .catch((error) => {
        dispatch(getPostsFail(new Error(error).message));
      });
  };
};
