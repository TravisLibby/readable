import React from 'react';
import {Link} from 'react-router-dom';
import AddPostForm from './common/AddPostForm';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';

const AddPostPage = () => {
  return (
    <div className="add-post-page">
      <Link to="/" className="back-to-posts"><FaArrowCircleLeft /></Link>
      <h3>Add Post</h3>
      <AddPostForm />
    </div>
  );
};

export default AddPostPage;
