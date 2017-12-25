import React, {Component} from 'react';
import {connect} from 'react-redux';
import {categories} from '../../constants/categories';
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

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }), () => this.handleFormValidation());
  };

  handleFormValidation = () => {
    const {category, author, title, body} = this.state;
    this.setState(() => ({
      formInvalid: category.length === 0 || author.length === 0 || title.length === 0 || body.length === 0
    }));
  };

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
    const {REACT, REDUX, UDACITY} = categories;

    return (
      <form className="post-form" name="addPostForm" onSubmit={(e) => handleSubmit(e)}>
        <select name="category" value={category} onChange={(e) => handleInputChange(e)}>
          <option value="" disabled>Select a Category</option>
          <option value={REACT}>{capitalize(REACT)}</option>
          <option value={REDUX}>{capitalize(REDUX)}</option>
          <option value={UDACITY}>{capitalize(UDACITY)}</option>
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

export default connect()(AddPostForm);
