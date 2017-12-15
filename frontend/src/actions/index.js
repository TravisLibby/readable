import * as ReadableAPI from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const VOTE_ON_POST = 'VOTE_ON_POST';

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

export const fetchPosts = () => dispatch => (
  ReadableAPI.getPosts().then(posts => dispatch(receivePosts(posts)))
);

export const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post
  };
};

export const fetchPost = id => dispatch => (
  ReadableAPI.getPostById(id).then(post => dispatch(receivePost(post)))
);

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const fetchComments = id => dispatch => (
  ReadableAPI.getCommentsByPostId(id).then(comments => dispatch(receiveComments(comments)))
);

export const voteOnPost = (post) => {
  return {
    type: VOTE_ON_POST,
    post
  };
};

export const fetchPostVote = (id, option) => dispatch => (
  ReadableAPI.voteOnPost(id, option).then(post => dispatch(voteOnPost(post)))
);
