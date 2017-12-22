import React, {Component} from 'react';
import {connect} from 'react-redux';
import VotingBar from './VotingBar';
import {formatDate} from '../../utils/helpers';

class Comments extends Component {
  render() {
    const post = this.props.post.item;
    const comments = this.props.comments.items;
    return (
      <ul>
        {comments.map((comment) => {
          if (comment.parentId === post.id) {
            return (
              <li key={comment.id}>
                <span>by {comment.author} | {formatDate(comment.timestamp)}</span>
                <p>{comment.body}</p>
                <VotingBar type='comment' item={comment} />
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({comments, post}) => {
  return {
    comments,
    post
  };
};

export default connect(mapStateToProps)(Comments);
