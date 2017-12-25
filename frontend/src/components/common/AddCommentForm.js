import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {fetchAddComment} from '../../actions';

class AddCommentForm extends Component {
  state = {
    formInvalid: true,
    author: '',
    body: ''
  };

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState(() => {
      return {
        [name]: value
      };
    }, () => this.handleValidation());
  };

  handleValidation = () => {
    const {author, body} = this.state;
    this.setState(() => {
      return {
        formInvalid: author.length === 0 || body.length === 0
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(fetchAddComment({
      id: uuid.v4(),
      timestamp: Date.now(),
      body: this.state.body.trim(),
      author: this.state.author.trim(),
      parentId: this.props.post.id
    })).then(() => {
      this.setState(() => {
        return {
          formInvalid: true,
          author: '',
          body: ''
        };
      });
    });
  };

  render() {
    const {author, body, formInvalid} = this.state;
    const {handleInputChange, handleSubmit} = this;

    return (
      <form className="add-comment-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="author"
          placeholder="Your Name"
          value={author}
          onChange={(e) => handleInputChange(e)}
        /><br />
        <textarea
          name="body"
          placeholder="Your Comment"
          value={body}
          onChange={(e) => handleInputChange(e)}>
        </textarea><br />
        <button type="submit" disabled={formInvalid}>Submit</button>
      </form>
    );
  }
}

export default connect()(AddCommentForm);
