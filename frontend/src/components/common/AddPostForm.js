import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capitalize} from '../../utils/helpers';
import {fetchAddPost} from '../../actions';
import uuid from 'uuid';

class AddPostForm extends Component {
  state = {
    postSubmitted: false,
    formInvalid: true,
    category: '',
    author: '',
    title: '',
    body: ''
  };

  /**
   * Handles updating the state of the form inputs on change.
   *
   * @param  {Object} e The click event.
   */
  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }), () => this.handleFormValidation());
  };

  /**
   * Handles the form validation.
   */
  handleFormValidation = () => {
    const {category, author, title, body} = this.state;
    this.setState(() => ({
      formInvalid: category.length === 0 || author.length === 0 || title.length === 0 || body.length === 0
    }));
  };

  /**
   * Submits the post.
   *
   * @param  {Object} e The click event.
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(fetchAddPost({
      id: uuid.v4(),
      timestamp: Date.now(),
      title: this.state.title.trim(),
      body: this.state.body.trim(),
      author: this.state.author.trim(),
      category: this.state.category
    })).then(() => this.handleSuccess());
  };

  /**
   * Alerts the user upon successful post submission.
   */
  handleSuccess = () => {
    alert('Your post was submitted!');
    this.setState(() => ({
      postSubmitted: false,
      formInvalid: true,
      category: '',
      author: '',
      title: '',
      body: ''
    }))
  };

  render() {
    const {category, author, title, body, formInvalid} = this.state;
    const {handleInputChange, handleSubmit} = this;
    const {categories} = this.props;

    return (
      <form className="post-form" name="addPostForm" onSubmit={(e) => handleSubmit(e)}>
        <select name="category" value={category} onChange={(e) => handleInputChange(e)}>
          <option value="" disabled>Select a Category</option>
          {categories.items.map(item => (
            <option key={item.name} value={item.name}>{capitalize(item.name)}</option>
          ))}
        </select><br />
        <input
          type="text"
          placeholder="Your Name"
          className="post-author"
          name="author"
          value={author}
          onChange={(e) => handleInputChange(e)} /><br />
        <input
          type="text"
          placeholder="Post Title"
          className="post-title"
          name="title"
          value={title}
          onChange={(e) => handleInputChange(e)} /><br />
        <textarea
          placeholder="Post Body"
          className="post-body"
          name="body"
          value={body}
          onChange={(e) => handleInputChange(e)}>
        </textarea><br />
        <button type="submit" disabled={formInvalid}>Submit</button>
      </form>
    )
  };
}

const mapStateToProps = ({categories}) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(AddPostForm);
