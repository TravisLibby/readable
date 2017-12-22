import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostVote, fetchCommentVote} from '../../actions';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';

const ITEM_TYPES = {
  POST:'post',
  COMMENT: 'comment'
};

class VotingBar extends Component {
  vote = (id, option) => {
    switch (this.props.type) {
      case ITEM_TYPES.POST:
        this.props.dispatch(fetchPostVote(id, option));
        break;
      case ITEM_TYPES.COMMENT:
        this.props.dispatch(fetchCommentVote(id, option));
        break;
      default:
        return;
    }
  };

  render() {
    const {item} = this.props,
    VOTE_TYPES = {
      UPVOTE: 'upVote',
      DOWNVOTE: 'downVote'
    };

    return (
      <div className="voting">
        <ThumbsUp className="thumb-up" onClick={() => this.vote(item.id, VOTE_TYPES.UPVOTE)} />
        <span className="score">{item.voteScore}</span>
        <ThumbsDown className="thumb-down" onClick={() => this.vote(item.id, VOTE_TYPES.DOWNVOTE)} />
      </div>
    );
  }
}

export default connect()(VotingBar);
