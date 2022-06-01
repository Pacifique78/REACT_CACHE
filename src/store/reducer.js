import { updateObject } from '../shared';
import { GET_POSTS_FAIL, GET_POSTS_START, GET_POSTS_SUCCESS } from './actions';

const initialReducer = {
  posts: [],
  loading: false,
  error: null,
};
const getPostsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const getPostsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    posts: action.payload,
  });
};
const getPostsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload,
  });
};

const reducer = (state = initialReducer, action) => {
  switch (action.type) {
    case GET_POSTS_START:
      return getPostsStart(state, action);
    case GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action);
    case GET_POSTS_FAIL:
      return getPostsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
