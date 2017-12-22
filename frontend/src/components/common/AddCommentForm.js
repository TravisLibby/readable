import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddCommentForm extends Component {
  state = {
    author: '',
    body: ''
  };

  render() {
    const {author, body} = this.state;

    return (
      <form className="add-comment-form">
        <input type="text" name="author" placeholder="Your Name" value={author} /><br />
        <textarea name="body" placeholder="Your Comment" value={body}></textarea><br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default connect()(AddCommentForm);
