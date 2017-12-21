import React, {Component} from 'react';
import PostsListItem from './PostsListItem';
import SortingBar from './SortingBar';

class PostsList extends Component {
  render() {
    const {posts} = this.props;

    return (
      <div>
        {posts.length > 0 ? (
          <div>
            <SortingBar />
            <ul className="posts-list">
              {posts.map((post, index) => (
                <li key={post.id}>
                  <PostsListItem post={post} index={index} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>There are no posts for this category.</p>
        )}
      </div>
    );
  }
}

export default PostsList;
