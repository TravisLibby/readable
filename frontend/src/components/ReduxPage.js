import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostsList from './common/PostsList';
import {categories} from '../constants/categories';

class ReduxPage extends Component {
  render() {
    const {posts} = this.props;

    return (
      <div>
        <PostsList posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.filter(post => post.category === categories.REDUX)
  };
};

export default connect(mapStateToProps)(ReduxPage);
