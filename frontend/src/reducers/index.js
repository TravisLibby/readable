import {combineReducers} from 'redux';
import {RECEIVE_POSTS,
        RECEIVE_POST,
        VOTE_ON_POST,
        SORT_POSTS,
        ADD_POST,
        EDIT_POST,
        DELETE_POST,
        RECEIVE_COMMENTS,
        EDITING_POST,
        CANCEL_EDITING_POST} from '../actions';
import {sortingOrder} from '../constants/sortingOrder';

const posts = (state = {isLoading: true, items: []}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        isLoading: false,
        items: action.posts.sort((a, b) => b.timestamp - a.timestamp)
      };
    case ADD_POST:
      return {
        ...state,
        items: [...state.items, action.post].sort((a, b) => b.timestamp - a.timestamp)
      };
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter((post => post.id !== action.id))
      }
    case VOTE_ON_POST:
      const {post} = action;
      return {
        ...state,
        items: state.items.map((currPost) => {
          if (currPost.id === post.id) {
            currPost.voteScore = post.voteScore
          }
          return currPost;
        })
      };
    case SORT_POSTS:
      const {option} = action,
            {LOWEST_FIRST,
             HIGHEST_FIRST,
             NEWEST_FIRST,
             OLDEST_FIRST} = sortingOrder;

      return {...state, items: state.items.slice().sort((a, b) => {
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
      })};
    default:
      return state;
  }
};

const post = (state = {isEditing: false, item: {}}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return {
        isEditing: false,
        item: action.post
      };
    case VOTE_ON_POST:
      return Object.assign({}, action.post);
    case EDIT_POST:
      return {
        ...state,
        item: action.post
      };
    case EDITING_POST:
      return {
        ...state,
        isEditing: true
      };
    case CANCEL_EDITING_POST:
      return {
        ...state,
        isEditing: false
      };
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
