import {combineReducers} from 'redux';
import {RECEIVE_POSTS,
        RECEIVE_POST,
        VOTE_ON_POST,
        SORT_POSTS,
        RECEIVE_COMMENTS} from '../actions';
import {sortingOrder} from '../constants/sortingOrder';

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign(...state, action.posts.sort((a, b) => b.timestamp - a.timestamp));
    case VOTE_ON_POST:
      const {post} = action;
      return state.map((currPost) => {
        if (currPost.id === post.id) {
          currPost.voteScore = post.voteScore
        }
        return currPost;
      });
    case SORT_POSTS:
      const {option} = action,
            {LOWEST_FIRST,
             HIGHEST_FIRST,
             NEWEST_FIRST,
             OLDEST_FIRST} = sortingOrder;

      return state.slice().sort((a, b) => {
        switch (option) {
          case LOWEST_FIRST:
            return a.voteScore - b.voteScore;
          case HIGHEST_FIRST:
            return b.voteScore - a.voteScore;
          case NEWEST_FIRST:
            return b.timestamp - a.timestamp;
          case OLDEST_FIRST:
            return a.timestamp - b.timestamp;
          default:
            return b.voteScore - a.voteScore;
        }
      });
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
