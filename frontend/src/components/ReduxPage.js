import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from './common/Loader';
import PostsList from './common/PostsList';
import Navigation from './Navigation';
import {categories} from '../constants/categories';

class ReduxPage extends Component {
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

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.items.filter(post => post.category === categories.REDUX),
    isLoading: posts.isLoading
  };
};

export default connect(mapStateToProps)(ReduxPage);
