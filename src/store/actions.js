import { getCachedData } from '../shared';

export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';

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
      'https://jsonplaceholder.typicode.com/posts',
      'GET'
    )
      .then((posts) => dispatch(getPostsSuccess(posts)))
      .catch((error) => dispatch(getPostsFail(error)));
  };
};
