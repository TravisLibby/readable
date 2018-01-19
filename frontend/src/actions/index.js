import * as ReadableAPI from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_ALL_POSTS';
export const RETRIEVING_POST = 'RETRIEVING_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';
export const VOTE_ON_POST = 'VOTE_ON_POST';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDITING_COMMENT = 'EDITING_COMMENT';
export const CANCEL_EDITING_COMMENT = 'CANCEL_EDITING_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDITING_POST = 'EDITING_POST';
export const CANCEL_EDITING_POST = 'CANCEL_EDITING_POST';
export const EDIT_POST = 'EDIT_POST';

/**
 * Action creator for receiving categories.
 *
 * @param  {Array} categories All of the categories.
 * @return {Object} The action for when categories have been received.
 */
export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  };
};

/**
 * Dispatches the receiveCategories action creator once all categories have been received.
 *
 * @return {void}
 */
export const fetchCategories = () => dispatch => (
  ReadableAPI.getCategories().then(categories => dispatch(receiveCategories(categories)))
);

/**
 * Action creator for receiving posts.
 *
 * @param  {Array} posts All of the posts.
 * @return {Object} The action for when posts have been received.
 */
export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

/**
 * Dispatches the receivePosts action creator once all posts have been received.
 *
 * @return {void}
 */
export const fetchPosts = () => dispatch => (
  ReadableAPI.getPosts().then(posts => dispatch(receivePosts(posts)))
);

/**
 * Action creator for retrieving the details of a post.
 *
 * @return {[type]} The action for retrieving a post.
 */
export const retrievingPost = () => {
  return {
    type: RETRIEVING_POST
  };
};

/**
 * Action creator for when the details of a post have been received.
 *
 * @param  {Object} post The post details.
 * @return {Object} The action for when the post has been received.
 */
export const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post
  };
};

/**
 * Dispatches the receivePost action creator once the post with the given id
 * has been received.
 *
 * @param  {Number} id The given id.
 * @return {void}
 */
export const fetchPost = id => dispatch => {
  dispatch(retrievingPost());
  return ReadableAPI.getPostById(id).then(post => dispatch(receivePost(post)));
};

/**
 * Action creator for sorting posts.
 *
 * @param  {String} option The order to sort the posts.
 * @return {Object} The action for sorting the posts.
 */
export const sortPosts = (option) => {
  return {
    type: SORT_POSTS,
    option
  };
};

/**
 * The action creator for when the comments have been received.
 *
 * @param  {Array} comments The comments for the post.
 * @return {Object} The action for receiving comments.
 */
export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

/**
 * Dispatches the receiveComments action creator once the comments for a posts
 * with the given id have been received.
 *
 * @param  {Number} id The id of the post.
 * @return {void}
 */
export const fetchComments = id => dispatch => (
  ReadableAPI.getCommentsByPostId(id).then(comments => dispatch(receiveComments(comments)))
);

/**
 * The action creator for when a vote has been cast for a post.
 *
 * @param  {Object} post The post for which a vote has been cast.
 * @return {Object} The action for voting on a post.
 */
export const voteOnPost = (post) => {
  return {
    type: VOTE_ON_POST,
    post
  };
};

/**
 * Dispatches the voteOnPost action creator once the updated post has
 * been received.
 *
 * @param  {Number} id     The id of of the post for which a vote has been cast.
 * @param  {[type]} option Whether the post is being upvoted or downvoted.
 * @return {void}
 */
export const fetchPostVote = (id, option) => dispatch => (
  ReadableAPI.voteOnPost(id, option).then(post => dispatch(voteOnPost(post)))
);

/**
 * Action creator for when a vote has been cast for a comment.
 *
 * @param  {Object} comment The comment for which a vote has been cast.
 * @return {Object} The action for voting on a comment.
 */
export const voteOnComment = (comment) => {
  return {
    type: VOTE_ON_COMMENT,
    comment
  };
};

/**
 * Dispatches the voteOnComment action creator when the updated comment has
 * been received.
 *
 * @param  {Number} id     The id of the comment for which a vote has been cast.
 * @param  {[type]} option Whether the comment has been upvoted or downvoted.
 * @return {void}
 */
export const fetchCommentVote = (id, option) => dispatch => (
  ReadableAPI.voteOnComment(id, option).then(comment => dispatch(voteOnComment(comment)))
);

/**
 * The action creator for when a post has been added.
 *
 * @param {Object} post The post that has been added.
 * @return {Object} The action for adding a post.
 */
export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  };
};

/**
 * Dispatches the addPost action creator once the new post has been added.
 *
 * @param  {Object} post The new post to add.
 * @return {void}
 */
export const fetchAddPost = (post) => dispatch => (
  ReadableAPI.addPost(post).then(newPost => dispatch(addPost(newPost)))
);

/**
 * The action creator for when a post has been deleted.
 *
 * @param  {Number} id The id of the post to delete.
 * @return {Object} The action for when a post has been deleted.
 */
export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id
  };
};

/**
 * Dispatches the delete post action creator once the post has been deleted.
 *
 * @param  {Number} id The id of the post to delete.
 * @return {void}
 */
export const fetchDeletePost = id => dispatch => (
  ReadableAPI.deletePost(id).then(() => dispatch(deletePost(id)))
);

/**
 * The action creator for when a post is being edited.
 *
 * @return {Object} The action for when a post is being edited.
 */
export const editingPost = () => {
  return {
    type: EDITING_POST
  };
};

/**
 * The action creator for when editing a post has been canceled.
 *
 * @return {Object} The action for cancel editing.
 */
export const cancelEditingPost = () => {
  return {
    type: CANCEL_EDITING_POST
  };
};

/**
 * The action creator for when a post has been edited.
 *
 * @param  {Object} post The edited post.
 * @return {Object}      The action for and edited post.
 */
export const editPost = (post) => {
  return {
    type: EDIT_POST,
    post
  };
};

/**
 * Dispatches the editPost action creator once the post with the given id has
 * been edited.
 *
 * @param  {Number} id     The id of the post to edit.
 * @param  {[type]} params The updated properties of the post.
 * @return {void}
 */
export const fetchEditPost = (id, params) => dispatch => (
  ReadableAPI.editPost(id, params).then((post) => dispatch(editPost(post)))
);

/**
 * The action creator for when a comment has been added.
 *
 * @param {Object} comment The comment that has been added.
 * @return {Object}        The action for the added comment.
 */
export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  };
};

/**
 * Dispatches the addComment action creator once the comment has been added.
 *
 * @param  {Object} comment The comment that has been added.
 * @return {void}
 */
export const fetchAddComment = (comment) => dispatch => {
  return ReadableAPI.addComment(comment).then(comment => dispatch(addComment(comment)));
};

/**
 * The action creator for clearing the list of comments.
 *
 * @return {Object} The action for clearing comments.
 */
export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  };
};

/**
 * The action creator for when a comment has been deleted.
 *
 * @param  {Object} comment The deleted comment.
 * @return {Object}         The action for the deleted comment.
 */
export const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  };
};

/**
 * Dispatches the deleteComment action creator once the comment has
 * been deleted.
 *
 * @param  {Object} comment The comment to delete.
 * @return {void}
 */
export const fetchDeleteComment = (comment) => dispatch => {
  return ReadableAPI.deleteComment(comment.id).then(() => dispatch(deleteComment(comment)));
};

/**
 * The action creator for when a comment is being edited.
 *
 * @param  {Number} id The id of the comment being edited.
 * @return {Object}    The action for the comment editing.
 */
export const editingComment = (id) => {
  return {
    type: EDITING_COMMENT,
    id
  };
};

/**
 * The action creator for when editing a comment is canceled.
 *
 * @return {Object} The action for cancel editing a comment.
 */
export const cancelEditingComment = () => {
  return {
    type: CANCEL_EDITING_COMMENT
  };
};

/**
 * The action creator when a comment has been edited.
 *
 * @param  {Object} comment The edited comment.
 * @return {Object}         The action for the edited comment.
 */
export const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  };
};

/**
 * Dispatches the editComment action creator once a comment with the given id
 * has been edited.
 *
 * @param  {Number} id     The id of the comment to be edited.
 * @param  {Object} params The properties of the comment to edit.
 * @return {void}
 */
export const fetchEditComment = (id, params) => dispatch => {
  return ReadableAPI.editComment(id, params).then(comment => dispatch(editComment(comment)));
};
