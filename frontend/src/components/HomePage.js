import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostsList from './common/PostsList';
import Navigation from './Navigation';

class HomePage extends Component {


  render() {
    const {posts} = this.props;

    return (
      <div>
        <Navigation />
        <PostsList posts={posts} />
      </div>
    );
  }
};

const mapStateToProps = ({posts}) => {
  return {
    posts
  };
};

export default connect(mapStateToProps)(HomePage);
