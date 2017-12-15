import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate} from '../../utils/helpers';

const PostsListItem = (props) => {
  const {post, index} = props;
  console.log('post', post);

  return (
    <div>
      <p>{index + 1}. <Link to={`/posts/${post.id}`}>{post.title}</Link></p>
      <span>
        by {post.author} | {formatDate(post.timestamp)} | {post.commentCount} comments
      </span>
    </div>
  );
}

export default PostsListItem;
