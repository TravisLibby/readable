import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {categories} from '../constants/categories';
import {capitalize} from '../utils/helpers';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';

class Navigation extends Component {
  render() {
    const {REACT, REDUX, UDACITY} = categories;

    return (
      <div className="navigation">
        <ul>
          <li>
            <NavLink exact to="/">All</NavLink>
          </li>
          <li>
            <NavLink to="/react">{capitalize(REACT)}</NavLink>
          </li>
          <li>
            <NavLink to="/redux">{capitalize(REDUX)}</NavLink>
          </li>
          <li>
            <NavLink to="/udacity">{capitalize(UDACITY)}</NavLink>
          </li>
          <li>
            <NavLink to="/add-post">
              <span className="add-post"><FaPlusSquare className="add-post-icon" /> Add Post</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default Navigation;
