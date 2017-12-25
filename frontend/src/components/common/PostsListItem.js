import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate} from '../../utils/helpers';

const PostsListItem = (props) => {
  const {post, index} = props;

  return (
    <div>
      <p>{index + 1}. <Link to={`/posts/${post.id}`}>{post.title}</Link></p>
      <span>
        {post.voteScore} pts |&nbsp;
        by {post.author} |&nbsp;
        {formatDate(post.timestamp)} |&nbsp;
        {post.commentCount} {post.commentCount > 1 ? "comments" : "comment"}
      </span>
    </div>
  );
}

export default PostsListItem;
