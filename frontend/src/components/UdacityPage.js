import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostsList from './common/PostsList';
import Navigation from './Navigation';
import {categories} from '../constants/categories';

class UdacityPage extends Component {
  render() {
    const {posts} = this.props;

    return (
      <div>
        <Navigation />
        <PostsList posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.filter(post => post.category === categories.UDACITY)
  };
};

export default connect(mapStateToProps)(UdacityPage);
