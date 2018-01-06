import React, {Component} from 'react';
import {connect} from 'react-redux';
import VotingBar from './VotingBar';
import EditCommentForm from './EditCommentForm';
import {fetchDeleteComment, editingComment} from '../../actions';
import {formatDate} from '../../utils/helpers';

class Comments extends Component {
  /**
   * Deletes the given comment.
   *
   * @param  {Object} comment The comment to delete.
   */
  deleteComment = (comment) => {
    this.props.dispatch(fetchDeleteComment(comment));
  };

  /**
   * Marks a given comment as in editing mode.
   *
   * @param {Number} id The id of the comment currently in edit mode.
   */
  setAsEditing = id => this.props.dispatch(editingComment(id));

  render() {
    const post = this.props.post.item;
    const comments = this.props.comments.items;
    const {deleteComment, setAsEditing} = this;

    return (
      <ul>
        {comments.map((comment) => {
          if (comment.parentId === post.id) {
            return (
              <li key={comment.id}>
                <span>by {comment.author} | {formatDate(comment.timestamp)}</span>
                <div className="edit-delete">
                  <span className="edit" onClick={() => setAsEditing(comment.id)}>Edit</span> |&nbsp;
                  <span className="delete" onClick={() => deleteComment(comment)}>Delete</span>
                </div>
                <p>{comment.body}</p>
                <VotingBar type='comment' item={comment} />
                {comment.id === this.props.comments.commentEditing && (
                  <EditCommentForm comment={comment} />
                )}
              </li>
            );
          } else {
            return null;
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
