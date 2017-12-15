const api = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

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
