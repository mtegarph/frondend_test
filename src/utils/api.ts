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

export const deletePost = async (token: string, id: string) => {
  await apiClient.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

