import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from '../Navigation';
import VotingBar from '../common/VotingBar';
import EditPostForm from '../common/EditPostForm';
import {fetchPost, fetchComments, fetchDeletePost, editingPost, cancelEditingPost} from '../../actions';
import {formatDate} from '../../utils/helpers';

class PostDetails extends Component {
  state = {
    showingComments: false,
    isLoading: true
  };

  toggleComments = (e) => {
    e.preventDefault();

    this.setState(() => {
      return {
        showingComments: !this.state.showingComments
      };
    });
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

    this.props.dispatch(fetchPost(id)).then(() => {
      this.setState(() => {
        return {
          isLoading: false
        };
      });
    });

    this.props.dispatch(fetchComments(id));
  };

  render() {
    const {showingComments, isLoading} = this.state;
    const {comments} = this.props;
    const {isEditing} = this.props.post;
    const post = this.props.post.item;
    const {id} = this.props.match.params;
    const {deletePost, setToEditing, setToNotEditing} = this;
    const {author, title, body, timestamp} = this.props.post.item;

    return (
      <div>
        <Navigation />
        {(!isLoading && !isEditing) && (
          <div className="post-details">
            <h3 className="post-title">{title}</h3>
            <div className="edit-delete">
              <span className="edit" onClick={() => setToEditing()}>Edit</span> | <span className="delete" onClick={() => deletePost(post.id)}>Delete</span>
            </div>
            <span>by {author} | {formatDate(timestamp)}</span>
            <VotingBar post={post} />
            <p>{body}</p>
            <div className="comments">
              <h4 className="comments-header">Comments</h4>
              <a
                href="#"
                className="toggle-comments"
                onClick={(e) => this.toggleComments(e)}>
                ({showingComments ? 'Hide' : 'Show'})
              </a>
              {showingComments && (
                <ul>
                  {comments.map((comment) => {
                    return (
                      <li key={comment.id}>
                        <span>by {comment.author} | {formatDate(comment.timestamp)}</span>
                        <p>{comment.body}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
        <div>
          {!isLoading && isEditing && (
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
