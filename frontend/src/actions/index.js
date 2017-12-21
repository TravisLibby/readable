import * as ReadableAPI from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_ALL_POSTS';
export const RETRIEVING_POST = 'RETRIEVING_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const VOTE_ON_POST = 'VOTE_ON_POST';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDITING_POST = 'EDITING_POST';
export const CANCEL_EDITING_POST = 'CANCEL_EDITING_POST';
export const EDIT_POST = 'EDIT_POST';

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

export const fetchPosts = () => dispatch => (
  ReadableAPI.getPosts().then(posts => dispatch(receivePosts(posts)))
);

export const retrievingPost = () => {
  return {
    type: RETRIEVING_POST
  };
};

export const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post
  };
};

export const fetchPost = id => dispatch => {
  dispatch(retrievingPost());
  return ReadableAPI.getPostById(id).then(post => dispatch(receivePost(post)));
};

export const sortPosts = (option) => {
  return {
    type: SORT_POSTS,
    option
  };
};

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

export const voteOnComment = (comment) => {
  return {
    type: VOTE_ON_COMMENT,
    comment
  };
};

export const fetchCommentVote = (id, option) => dispatch => {
  ReadableAPI.voteOnComment(id, option).then(comment => dispatch(voteOnComment(comment)))
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
};

export const fetchAddPost = (post) => dispatch => (
  ReadableAPI.addPost(post).then(newPost => dispatch(addPost(newPost)))
);

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id
  };
};

export const fetchDeletePost = id => dispatch => (
  ReadableAPI.deletePost(id).then(() => dispatch(deletePost(id)))
);

export const editingPost = () => {
  return {
    type: EDITING_POST
  };
};

export const cancelEditingPost = () => {
  return {
    type: CANCEL_EDITING_POST
  };
};

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    post
  };
};

export const fetchEditPost = (id, params) => dispatch => (
  ReadableAPI.editPost(id, params).then((post) => dispatch(editPost(post)))
);
