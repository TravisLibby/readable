import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../../utils/helpers';

class Comments extends Component {
  render() {
    const comments = this.props.comments.items;
    console.log(this.props);
    return (
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
    );
  }
}

const mapStateToProps = ({comments}) => {
  return {
    comments
  };
};

export default connect(mapStateToProps)(Comments);
