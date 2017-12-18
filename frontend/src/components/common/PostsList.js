import React, {Component} from 'react';
import PostsListItem from './PostsListItem';
import SortingBar from './SortingBar';

class PostsList extends Component {
  render() {
    const {posts} = this.props;

    return (
      <div>
        <SortingBar />
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
  }
}

export default PostsList;
