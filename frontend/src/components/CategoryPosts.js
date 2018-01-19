import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from './common/Loader';
import PostsList from './common/PostsList';
import PageNotFound from './common/PageNotFound';
import Navigation from './Navigation';

class CategoryPosts extends Component {
  render() {
    const {posts, isLoading, categories, category} = this.props;

    if (!categories.items.find(item => item.name === category)) {
      return (
        <PageNotFound />
      );
    }
    return (
      <div>
        <Navigation />
        {isLoading && posts.length === 0 ? <Loader /> : <PostsList posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = ({posts, categories}, ownProps) => {
  const category = ownProps.location.pathname.slice(1).toLowerCase();

  return {
    categories,
    category,
    posts: posts.items.filter(post => post.category === category),
    isLoading: posts.isLoading
  };
};

export default connect(mapStateToProps)(CategoryPosts);
