import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility untuk login
export const login = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data; 
};
export const register = async (credentials: { email: string; password: string,password_confirmation:string,name:string }) => {
  const response = await apiClient.post('/auth/register', credentials);
  return response.data; 
};
// Utility untuk logout
export const logout = async (token: string) => {
  await apiClient.post('/auth/logout', {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

// Utility untuk mendapatkan informasi user
export const getMe = async (token: string) => {
  const response = await apiClient.post('/auth/me', {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

// Utility untuk CRUD post
export const fetchPosts = async (token: string) => {
    const response = await apiClient.get('/posts', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  
    // Ensure you extract `data` from `post`
    return response.data.post.data;
  };
  

export const createPost = async (token: string, post: { title: string; body: string }) => {
  const response = await apiClient.post('/posts', post, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const updatePost = async (token: string, postId: string, post: { message: string; post: string }) => {
  const response = await apiClient.put(`/posts/${postId}`, post, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const deletePost = async (token: string, postId: string) => {
  await apiClient.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

// Utility untuk CRUD comment
export const fetchComments = async (postId: string, token: string) => {
  const response = await apiClient.get(`/posts/${postId}/comments`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const createComment = async (postId: string, token: string, comment: { comment: string }) => {
  const response = await apiClient.post(`/posts/${postId}/comments`, comment, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const updateComment = async (token: string, commentId: string, comment: { comment: string }) => {
  const response = await apiClient.put(`/comments/${commentId}`, comment, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const deleteComment = async (token: string, commentId: string) => {
  await apiClient.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};