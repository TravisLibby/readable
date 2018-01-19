import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navigation from '../Navigation';
import Loader from '../common/Loader';
import VotingBar from '../common/VotingBar';
import EditPostForm from '../common/EditPostForm';
import Comments from '../common/Comments';
import AddCommentForm from '../common/AddCommentForm';
import {fetchPost, fetchComments, clearComments, fetchDeletePost, editingPost, cancelEditingPost} from '../../actions';
import {formatDate} from '../../utils/helpers';

class PostDetails extends Component {
  state = {
    showingComments: false
  };

  /**
   * Fetches or clears the comments.
   */
  toggleComments = () => {
    this.setState({showingComments: !this.state.showingComments});
    if (this.props.post.item.commentCount !== 0) {
      this.props.dispatch(fetchComments(this.props.post.item.id));
    } else {
      this.props.dispatch(clearComments());
    }
  };

  /**
   * Gets the text label for the toggle comment button.
   *
   * @return {String} The label for the toggle comment button.
   */
  getCommentLinkText = () => {
    const post = this.props.post.item;
    const {showingComments} = this.state;
    if (post.commentCount > 0) {
      return showingComments ? 'Hide' : 'Show';
    }
    return showingComments ? 'Cancel' : 'Add First Comment';
  };

  /**
   * Marks the post as in editing mode.
   */
  setToEditing = (post) => {
    this.props.dispatch(editingPost(post));
  };

  /**
   * Marks the post as in viewing mode.
   */
  setToNotEditing = () => {
    this.props.dispatch(cancelEditingPost());
  };

  /**
   * Deletes the post with the given id.
   *
   * @param  {Number} id The id of the post.
   * @return {void}
   */
  deletePost = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    if (shouldDelete) {
      this.props.dispatch(fetchDeletePost(id)).then(this.props.history.push('/'));
    } else {
      return;
    }
  };

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.dispatch(fetchPost(id));
  };

  render() {
    const post = this.props.post.item;
    const postLoading = this.props.post.isLoading;
    const {showingComments} = this.state;
    const {isEditing} = this.props.post;
    const commentsLoading = this.props.comments.isLoading;
    const {id} = this.props.match.params;
    const {deletePost, setToEditing, setToNotEditing, getCommentLinkText} = this;
    const {author, title, body, timestamp} = this.props.post.item;

    if (!postLoading) {
      if (Object.keys(post).length === 0) {
        return (
          <Redirect to='/404' />
        );
      }
    }

    return (
      <div>
        <Navigation />
        {postLoading && (
          <Loader />
        )}
        {(!postLoading && !isEditing && post.id === id) && (
          <div className="post-details">
            <h3 className="post-title">{title}</h3>
            <div className="edit-delete">
              <span className="edit" onClick={() => setToEditing(post)}>Edit</span> |&nbsp;
              <span className="delete" onClick={() => deletePost(post.id)}>Delete</span>
            </div>
            <span>by {author} | {formatDate(timestamp)}</span>
            <VotingBar type={"post"} item={post} />
            <p>{body}</p>
              <div className="comments">
                <h4 className="comments-header">Comments ({post.commentCount})</h4>
                <span
                  className="toggle-comments"
                  onClick={() => this.toggleComments()}>
                  {getCommentLinkText()}
                </span>
                {(showingComments && !commentsLoading) && (
                  <div>
                    <Comments />
                    <AddCommentForm post={post} />
                  </div>
                )}
              </div>
          </div>
        )}
        <div>
          {!postLoading && isEditing && (
            <div>
              <h3 className="edit-header">Edit Post</h3>
              <EditPostForm />
              <button onClick={() => setToNotEditing()}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({comments, post}) => {
  return {
    comments,
    post
  };
};

export default connect(mapStateToProps)(PostDetails);
