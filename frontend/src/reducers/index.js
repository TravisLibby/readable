import {combineReducers} from 'redux';
import {RECEIVE_POSTS, RECEIVE_POST, RECEIVE_COMMENTS, VOTE_ON_POST} from '../actions';

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign(...state, action.posts);
    default:
      return state;
  }
};

const post = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return Object.assign({}, action.post);
    case VOTE_ON_POST:
      return Object.assign({}, action.post);
    default:
      return state;
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    default:
      return state;
  }
};

export default combineReducers({posts, post, comments});
