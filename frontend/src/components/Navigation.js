import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {capitalize} from '../utils/helpers';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';

class Navigation extends Component {
  state = {
    categories: []
  };

  componentDidMount() {

  }
  render() {
    const {categories} = this.props;

    return (
      <div className="navigation">
        <ul>
          <li>
            <NavLink exact to="/">All</NavLink>
          </li>
        </ul>
        <ul>
          {categories.items.map(category => (
            <li key={category.name}>
              <NavLink exact to={`/${category.path}`}>{capitalize(category.name)}</NavLink>
            </li>
          ))}
        </ul>
        <ul>
          <li className="add-post">
            <NavLink exact to="/add-post">
              <span><FaPlusSquare className="add-post-icon" /> Add Post</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

const mapStateToProps = ({categories}) => {
  return {
    categories
  };
};

export default withRouter(connect(mapStateToProps)(Navigation));
