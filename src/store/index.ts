import { createStore } from 'vuex';
import {
  login,
  logout,
  register,
  fetchPosts,
  createPost,
  updatePost,
  deletePost,

} from '../utils/api';
import { State, Post, Comment } from './types'; // Import tipe yang telah didefinisikan

const store = createStore<State>({
  state: {
    token: '',
    posts: [],
    comments: {},
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
      console.log('Token set to:', state.token);
    },
    clearToken(state) {
      state.token = '';
      state.posts = [];
      state.comments = {};
    },
    setPosts(state, posts: Post[]) {
      state.posts = posts;
      console.log('Posts set:', state.posts);
    },
    addPost(state, post: Post) {
      state.posts.push(post);
    },
    updatePost(state, { postId, updatedPost }: { postId: string; updatedPost: Partial<Post> }) {
      const index = state.posts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...updatedPost };
      }
    },
    deletePost(state, postId: string) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    setComments(state, { postId, comments }: { postId: string; comments: Comment[] }) {
      state.comments[postId] = comments;
    },
    addComment(state, { postId, comment }: { postId: string; comment: Comment }) {
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push(comment);
    },
    updateComment(state, { postId, commentId, updatedComment }: { postId: string; commentId: string; updatedComment: Partial<Comment> }) {
      const index = state.comments[postId].findIndex((comment) => comment.id === commentId);
      if (index !== -1) {
        state.comments[postId][index] = { ...state.comments[postId][index], ...updatedComment };
      }
    },
    deleteComment(state, { postId, commentId }: { postId: string; commentId: string }) {
      state.comments[postId] = state.comments[postId].filter((comment) => comment.id !== commentId);
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const { access_token } = await login(credentials);
      localStorage.setItem('token', access_token);
      commit('setToken', access_token);
    },
    async register({commit }, credentials) {
       await register(credentials);
      // localStorage.setItem('token', access_token);
      // commit('setToken', access_token);
    },
    async logout({ commit, state }) {
      await logout(state.token);
      commit('clearToken');
    },
    async fetchPosts({ commit, state }) {
      const posts = await fetchPosts(state.token);
      commit('setPosts', posts);
    },
    async createPost({ commit, state }, post) {
      console.log('get token'+ state.token);
      const newPost = await createPost(state.token, post);
      commit('addPost', newPost);
    },
    async updatePost({ commit, state }, { postId, post }) {
      const updatedPost = await updatePost(state.token, postId, post);
      commit('updatePost', { postId, updatedPost });
    },
    async deletePost({ commit, state }, postId) {
      await deletePost(state.token, postId);
      commit('deletePost', postId);
    },

  },
});

export default store;