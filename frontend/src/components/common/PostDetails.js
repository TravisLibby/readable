import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from '../Navigation';
import VotingBar from '../common/VotingBar';
import {fetchPost, fetchComments} from '../../actions';
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

  componentDidMount() {
    const {id} = this.props.match.params;

    this.props.dispatch(fetchPost(id));
    this.props.dispatch(fetchComments(id));
  }

  render() {
    const {showingComments} = this.state;
    const {post, comments} = this.props;
    const {id} = this.props.match.params;

    return (
      <div>
        <Navigation />
        <div className="post-details">
          {post && post.id === id &&  (
            <div>
              <h3>{post.title}</h3>
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
