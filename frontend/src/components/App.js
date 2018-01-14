import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import HomePage from './HomePage';
import ReactPage from './ReactPage';
import ReduxPage from './ReduxPage';
import UdacityPage from './UdacityPage';
import PostDetails from './common/PostDetails';
import AddPostPage from './AddPostPage';
import PageNotFound from './common/PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/react" component={ReactPage} />
        <Route exact path="/redux" component={ReduxPage} />
        <Route exact path="/udacity" component={UdacityPage} />
        <Route path="/:category/:id" component={PostDetails} />
        <Route path="/add-post" component={AddPostPage} />
        <Route path="/404" component={PageNotFound} />
      </div>
    );
  }
}

export default withRouter(connect()(App));
