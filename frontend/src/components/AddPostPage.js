import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';
import {categories} from '../constants/categories';
import {capitalize} from '../utils/helpers';
import {fetchAddPost} from '../actions';
import uuid from 'uuid';

class AddPostPage extends Component {
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
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
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
  }

  render() {
    const {category, author, title, body, formInvalid} = this.state;
    const {handleInputChange, handleSubmit, handleFormValidation} = this;
    const {REACT, REDUX, UDACITY} = categories;

    return (
      <div className="add-post-page">
        <Link to="/" className="back-to-posts"><FaArrowCircleLeft /></Link>
        <h3>Add Post</h3>
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
      </div>
    );
  }
}

export default connect()(AddPostPage);
