import { updateObject } from '../shared';
import { CHANGE_RESPONSE_ORIGIN, GET_POSTS_FAIL, GET_POSTS_START, GET_POSTS_SUCCESS } from './actions';

const initialReducer = {
  posts: [],
  loading: false,
  error: null,
  startTime: null,
  endTime: null,
  origin: '',
};
const changeResponseOrigin = (state, action) => {
  return updateObject(state, {
    origin: action.payload,
  });
};
const getPostsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    startTime: new Date().getTime(),
    origin: '',
  });
};
const getPostsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    posts: action.payload,
    endTime: new Date().getTime(),
  });
};
const getPostsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload,
    endTime: new Date().getTime(),
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
    case CHANGE_RESPONSE_ORIGIN:
      return changeResponseOrigin(state, action);
    default:
      return state;
  }
};

export default reducer;
