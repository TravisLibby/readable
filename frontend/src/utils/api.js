const api = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};

export const getCategories = () => fetch(`${api}/categories`, {headers}).then(res => res.json());

export const getPosts = () => fetch(`${api}/posts`, {headers}).then(res => res.json());

export const getPostById = id => fetch(`${api}/posts/${id}`, {headers}).then(res => res.json());

export const getCommentsByPostId = (id) => {
  return fetch(`${api}/posts/${id}/comments`, {headers}).then(res => res.json());
};

export const voteOnPost = (id, option) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(res => res.json());
};

export const addPost = (post) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());
};

export const deletePost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  });
}

export const editPost = (id, params) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json());
};

export const voteOnComment = (id, option) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(res => res.json());
};

export const addComment = (comment) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());
};

export const deleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  });
};

export const editComment = (id, params) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json());
};
