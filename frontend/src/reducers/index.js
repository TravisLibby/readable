import {combineReducers} from 'redux';
import {RECEIVE_POSTS,
        RETRIEVING_POST,
        RECEIVE_POST,
        VOTE_ON_POST,
        VOTE_ON_COMMENT,
        SORT_POSTS,
        ADD_POST,
        EDIT_POST,
        DELETE_POST,
        RECEIVE_COMMENTS,
        ADD_COMMENT,
        CLEAR_COMMENTS,
        DELETE_COMMENT,
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

const post = (state = {isLoading: true, isEditing: false, item: {}}, action) => {
  switch (action.type) {
    case RETRIEVING_POST:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_POST:
      return {
        isLoading: false,
        isEditing: false,
        item: action.post
      };
    case VOTE_ON_POST:
      return {
        ...state,
        item: action.post
      };
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
    case ADD_COMMENT:
      return {
        ...state,
        item: {
          ...state.item,
          commentCount: state.item.commentCount += 1
        }
      };
      case DELETE_COMMENT:
        return {
          ...state,
          item: {
            ...state.item,
            commentCount: state.item.commentCount -= 1
          }
        };
    default:
      return state;
  }
};

const comments = (state = {isLoading: true, items: []}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        isLoading: false,
        items: action.comments
      };
    case CLEAR_COMMENTS:
      return {
        isLoading: false,
        items: []
      };
    case ADD_COMMENT:
      return {
        ...state,
        items: [
          ...state.items,
          action.comment
        ]
      };
    case VOTE_ON_COMMENT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.comment.id) {
            item = action.comment;
          }
          return item;
        })
      };
    case DELETE_COMMENT:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};

export default combineReducers({posts, post, comments});
