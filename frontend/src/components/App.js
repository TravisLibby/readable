import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategories} from '../actions';
import HomePage from './HomePage';
import CategoryPosts from './CategoryPosts';
import PostDetails from './common/PostDetails';
import AddPostPage from './AddPostPage';
import PageNotFound from './common/PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchCategories());
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/add-post" component={AddPostPage} />
          <Route exact path="/:category" component={CategoryPosts} />
          <Route exact path="/:category/:id" component={PostDetails} />
          <Route path="/404" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
