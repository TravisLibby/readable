import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from '../Navigation';
import VotingBar from '../common/VotingBar';
import {fetchPost, fetchComments, fetchDeletePost} from '../../actions';
import {formatDate} from '../../utils/helpers';

class PostDetails extends Component {
  state = {
    showingComments: false
  };

  toggleComments = (e) => {
    e.preventDefault();

    this.setState(() => {
      return {
        showingComments: !this.state.showingComments
      };
    });
  };

  deletePost = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    if (shouldDelete) {
      this.props.dispatch(fetchDeletePost(id));
    } else {
      return;
    }  
  };

  componentDidMount() {
    const {id} = this.props.match.params;

    this.props.dispatch(fetchPost(id));
    this.props.dispatch(fetchComments(id));
  }

  render() {
    const {showingComments} = this.state;
    const {post, comments} = this.props;
    const {id} = this.props.match.params;
    const {deletePost} = this;

    return (
      <div>
        <Navigation />
        <div className="post-details">
          {post && post.id === id &&  (
            <div>
              <h3 className="post-title">{post.title}</h3>
              <div className="edit-delete">
                <span>Edit</span> | <span className="delete" onClick={() => deletePost(post.id)}>Delete</span>
              </div>
              <span>by {post.author} | {formatDate(post.timestamp)}</span>
              <VotingBar post={post} />
              <p>{post.body}</p>
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
