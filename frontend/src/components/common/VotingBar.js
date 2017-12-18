import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostVote} from '../../actions';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';

class VotingBar extends Component {
  vote = (id, option) => {
    this.props.dispatch(fetchPostVote(id, option));
  };

  render() {
    const {post} = this.props,
    VOTE_TYPES = {
      UPVOTE: 'upVote',
      DOWNVOTE: 'downVote'
    };

    return (
      <div className="voting">
        <ThumbsUp className="thumb-up" onClick={() => this.vote(post.id, VOTE_TYPES.UPVOTE)} />
        <span className="score">{post.voteScore}</span>
        <ThumbsDown className="thumb-down" onClick={() => this.vote(post.id, VOTE_TYPES.DOWNVOTE)} />
      </div>
    );
  }
}

export default connect()(VotingBar);
