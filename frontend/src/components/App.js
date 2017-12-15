import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import Navigation from './Navigation';
import HomePage from './HomePage';
import ReactPage from './ReactPage';
import ReduxPage from './ReduxPage';
import UdacityPage from './UdacityPage';
import PostDetails from './common/PostDetails';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <Route exact path="/" component={HomePage} />
        <Route path="/react" component={ReactPage} />
        <Route path="/redux" component={ReduxPage} />
        <Route path="/udacity" component={UdacityPage} />
        <Route path="/posts/:id" component={PostDetails} />
      </div>
    );
  }
}

export default withRouter(connect()(App));
