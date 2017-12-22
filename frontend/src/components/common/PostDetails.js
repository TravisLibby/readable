import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from '../Navigation';
import Loader from '../common/Loader';
import VotingBar from '../common/VotingBar';
import EditPostForm from '../common/EditPostForm';
import Comments from '../common/Comments';
import AddCommentForm from '../common/AddCommentForm';
import {fetchPost, fetchComments, fetchDeletePost, editingPost, cancelEditingPost} from '../../actions';
import {formatDate} from '../../utils/helpers';

class PostDetails extends Component {
  state = {
    showingComments: false
  };

  toggleComments = (e) => {
    e.preventDefault();
    this.setState({showingComments: !this.state.showingComments});
    if (this.props.comments.items.length === 0) {
      this.props.dispatch(fetchComments(this.props.post.item.id));
    }
  };

  setToEditing = () => {
    this.props.dispatch(editingPost());
  };

  setToNotEditing = () => {
    this.props.dispatch(cancelEditingPost());
  };

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
    const comments = this.props.comments.items;
    const postLoading = this.props.post.isLoading;
    const {showingComments} = this.state;
    const {isEditing} = this.props.post;
    const {id} = this.props.match.params;
    const {deletePost, setToEditing, setToNotEditing} = this;
    const {author, title, body, timestamp} = this.props.post.item;

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
              <span className="edit" onClick={() => setToEditing()}>Edit</span> | <span className="delete" onClick={() => deletePost(post.id)}>Delete</span>
            </div>
            <span>by {author} | {formatDate(timestamp)}</span>
            <VotingBar type={"post"} item={post} />
            <p>{body}</p>
            {post.commentCount > 0 && (
              <div className="comments">
                <h4 className="comments-header">Comments ({post.commentCount})</h4>
                <a
                  href="#"
                  className="toggle-comments"
                  onClick={(e) => this.toggleComments(e)}>
                  {showingComments ? 'Hide' : 'Show'}
                </a>
                {showingComments && (
                  <div>
                    <Comments />
                    <AddCommentForm />
                  </div>
                )}
              </div>
            )}
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
