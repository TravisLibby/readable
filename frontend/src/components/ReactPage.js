import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from './common/Loading';
import PostsList from './common/PostsList';
import Navigation from './Navigation';
import {categories} from '../constants/categories';

class ReactPage extends Component {
  render() {
    const {posts, isLoading} = this.props;

    return (
      <div>
        <Navigation />
        {isLoading && posts.length === 0 ? <Loading /> : <PostsList posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.items.filter(post => post.category === categories.REACT),
    isLoading: posts.isLoading
  };
};

export default connect(mapStateToProps)(ReactPage);
