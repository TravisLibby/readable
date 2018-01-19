import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {formatDate} from '../../utils/helpers';
import EditPostForm from '../common/EditPostForm';
import {fetchDeletePost, editingPost, cancelEditingPost} from '../../actions';


class PostsListItem extends Component {
  /**
   * Deletes the post with the given id.
   *
   * @param  {Number} id The id of the post.
   * @return {void}
   */
  deletePost = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    if (shouldDelete) {
      this.props.dispatch(fetchDeletePost(id));
    } else {
      return;
    }
  };

  /**
   * Marks the post as in editing mode.
   */
  setToEditing = (id) => {
    this.props.dispatch(editingPost(id));
  };

  /**
   * Marks the post as in viewing mode.
   */
  setToNotEditing = () => {
    this.props.dispatch(cancelEditingPost());
  };

  render() {
    const {post, index, isEditing, editingPostId} = this.props;
    const {deletePost, setToEditing, setToNotEditing} = this;

    return (
      <div>
        <p>{index + 1}. <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
          <span className="edit-delete">
            <span className="edit"  onClick={() => setToEditing(post)}>Edit</span> |&nbsp;
            <span className="delete" onClick={() => deletePost(post.id)}>Delete</span>
          </span>
        </p>
        <span>
          {post.voteScore} pts |&nbsp;
          by {post.author} |&nbsp;
          {formatDate(post.timestamp)} |&nbsp;
          {post.commentCount} {post.commentCount > 1 ? "comments" : "comment"}
        </span>
        <div>
          {(isEditing && post.id === editingPostId) && (
            <div><br />
              <EditPostForm />
              <button onClick={() => setToNotEditing()}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({post}) => {
  return {
    isEditing: post.isEditing,
    editingPostId: post.postBeingEdited
  };
};

export default connect(mapStateToProps)(PostsListItem);
