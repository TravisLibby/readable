import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from './common/Loader';
import PostsList from './common/PostsList';
import Navigation from './Navigation';

class CategoryPosts extends Component {
  render() {
    const {posts, isLoading} = this.props;

    return (
      <div>
        <Navigation />
        {isLoading && posts.length === 0 ? <Loader /> : <PostsList posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = ({posts}, ownProps) => {
  const category = ownProps.location.pathname.slice(1);
  return {
    posts: posts.items.filter(post => post.category === category),
    isLoading: posts.isLoading
  };
};

export default connect(mapStateToProps)(CategoryPosts);
