import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <ul>
          <li>
            <NavLink exact to="/">All</NavLink>
          </li>
          <li>
            <NavLink to="/react">React</NavLink>
          </li>
          <li>
            <NavLink to="/redux">Redux</NavLink>
          </li>
          <li>
            <NavLink to="/udacity">Udacity</NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default Navigation;
