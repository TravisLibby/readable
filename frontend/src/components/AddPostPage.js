import React, {Component} from 'react';
import {connect} from 'react-redux';
import {categories} from '../constants/categories';
import {capitalize} from '../utils/helpers';
import {fetchAddPost} from '../actions';
import uuid from 'uuid';

class AddPostPage extends Component {
  state = {
    postSubmitted: false,
    category: '',
    author: '',
    title: '',
    body: ''
  };

  handleCategoryChange = (e) => this.setState({category: e.target.value});
  handleTitleChange = (e) => this.setState({title: e.target.value});
  handleAuthorChange = (e) => this.setState({author: e.target.value});
  handleBodyChange = (e) => this.setState({body: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(fetchAddPost({
      id: uuid.v4(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    })).then(() => console.log('Post submitted'));
  };

  cancel = () => this.props.history.goBack();

  render() {
    const {category, author, title, body} = this.state;
    const {handleCategoryChange, handleAuthorChange, handleTitleChange, handleBodyChange, handleSubmit} = this;
    const {REACT, REDUX, UDACITY} = categories;

    return (
      <div className="add-post-page">
        <h3>Add Post</h3>
        <form className="post-form" name="addPostForm" onSubmit={(e) => handleSubmit(e)}>
          <select value={category} onChange={(e) => handleCategoryChange(e)}>
            <option value="" disabled>Select a Category</option>
            <option value={REACT}>{capitalize(REACT)}</option>
            <option value={REDUX}>{capitalize(REDUX)}</option>
            <option value={UDACITY}>{capitalize(UDACITY)}</option>
          </select><br />
          <input
            type="text"
            placeholder="Your Name"
            className="post-author"
            value={author}
            onChange={(e) => handleAuthorChange(e)} /><br />
          <input
            type="text"
            placeholder="Post Title"
            className="post-title"
            value={title}
            onChange={(e) => handleTitleChange(e)} /><br />
          <textarea
            placeholder="Post Body"
            className="post-body"
            value={body}
            onChange={(e) => handleBodyChange(e)}>
          </textarea><br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => this.cancel()}>Cancel</button>
      </div>
    );
  }
}

export default connect()(AddPostPage);
