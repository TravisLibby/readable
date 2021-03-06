import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sortPosts} from '../../actions';
import {sortingOrder} from '../../constants/sortingOrder';

class SortingBar extends Component {
  state = {
    selectedFilter: sortingOrder.NEWEST_FIRST
  }


  /**
   * Sorts the post based on the selected option.
   *
   * @param  {Object} e The click event.
   */
  sortPosts = (e) => {
    const option = e.target.value;
    this.props.dispatch(sortPosts(option));
    this.setState({selectedFilter: option});
  };

  render() {
    const {selectedFilter} = this.state,
          {LOWEST_FIRST,
           HIGHEST_FIRST,
           NEWEST_FIRST,
           OLDEST_FIRST} = sortingOrder;

    return (
      <div className="sorting">
        <select value={selectedFilter} onChange={(e) => this.sortPosts(e)}>
          <option value={NEWEST_FIRST}>Newest First</option>
          <option value={OLDEST_FIRST}>Oldest First</option>
          <option value={LOWEST_FIRST}>Lowest First</option>
          <option value={HIGHEST_FIRST}>Highest First</option>
        </select>
      </div>
    );
  }
}

export default connect()(SortingBar);
