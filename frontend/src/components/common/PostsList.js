import React from 'react';
import PostsListItem from './PostsListItem';

const PostsList = (props) => {
    const {posts} = props;

    return (
      <div>
        {posts.length > 0 && (
          <ul className="posts-list">
            {posts.map((post, index) => (
              <li key={post.id}>
                <PostsListItem post={post} index={index} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default PostsList;
