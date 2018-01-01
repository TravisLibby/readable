import React, {Component} from 'react';
import {connect} from 'react-redux';
import {cancelEditingComment, fetchEditComment} from '../../actions';

class EditCommentForm extends Component {
  state = {
    formInvalid: true,
    body: this.props.comment.body
  };

  handleInputChange = (e) => {
    const {value, name} = e.target;

    this.setState(() => {
      return {
        [name]: value
      };
    }, () => this.handleFormValidation());
  };

  cancelEditingComment = () => {
    this.props.dispatch(cancelEditingComment());
  };

  handleFormValidation = () => {
    this.setState(() => {
      return {
        formInvalid: this.state.body.length === 0
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(fetchEditComment(this.props.comment.id, {
      body: this.state.body.trim(),
      timestamp: Date.now()
    }));
  };

  render() {
    const {handleInputChange, cancelEditingComment, handleSubmit} = this;
    const {formInvalid, body} = this.state;

    return (
      <form className="edit-comment-form" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="body"
          placeholder="Your Comment"
          value={body}
          onChange={(e) => handleInputChange(e)}>
        </textarea>
        <button onClick={() => cancelEditingComment()}>Cancel</button>
        <button type="submit" disabled={formInvalid}>Submit</button>
      </form>
    );
  }
}

export default connect()(EditCommentForm);
