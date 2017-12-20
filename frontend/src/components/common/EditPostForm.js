import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEditPost, cancelEditingPost} from '../../actions';

class EditPostForm extends Component {
  state = {
    formInvalid: true,
    title: '',
    body: ''
  };

  handleInputChange = (e) => {
    const {value, name} = e.target;
    this.setState(() => ({
      [name]: value
    }), () => this.handleFormValidation());
  };

  handleFormValidation = () => {
    const {title, body} = this.state;
    this.setState(() => ({
      formInvalid: title.length === 0 || body.length === 0
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      title: this.state.title,
      body: this.state.body
    };
    this.props.dispatch(fetchEditPost(this.props.post.item.id, params)).then(() => {
      this.props.dispatch(cancelEditingPost());
    });
  };

  componentDidMount() {
    const {title, body} = this.props.post.item;

    this.setState(() => {
      return {
        editing: true,
        title,
        body
      };
    });
  }

  render() {
    const {handleInputChange, handleSubmit} = this;
    const {formInvalid} = this.state;

    return (
      <form className="post-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Post Title"
          className="post-title"
          name="title"
          value={this.state.title}
          onChange={(e) => handleInputChange(e)} /><br />
        <textarea
          placeholder="Post Body"
          className="post-body"
          name="body"
          value={this.state.body}
          onChange={(e) => handleInputChange(e)}>
        </textarea><br />
        <button type="submit" disabled={formInvalid}>Save</button>
      </form>
    );
  };
}

const mapStateToProps = ({post}) => {
  return {
    post
  };
};

export default connect(mapStateToProps)(EditPostForm);
