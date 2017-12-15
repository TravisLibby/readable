import React from 'react';

const NoPosts = (props) => {
  const {category} = props;

  return (
    <p>There are no posts for {category}.</p>
  );
}

export default NoPosts;
