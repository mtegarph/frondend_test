<template>
    <div class="login-container">
      <!-- Display Posts -->
      <h2 class="title">Posts</h2>
      <div class="post-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Create Post Form -->
      <div class="form-card">
        <h2 class="form-title">Create a New Post</h2>
        <form @submit.prevent="createNewPost">
          <div class="form-group">
            <label for="title">Title</label>
            <input v-model="newPost.title" id="title" type="text" placeholder="Enter title" required />
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <input v-model="newPost.body" id="body" type="text" placeholder="Enter body" required />
          </div>
          <button type="submit" class="submit-btn">Create Post</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const store = useStore();
      const newPost = ref({ title: '', body: '' });
      const posts = computed(() => store.state.posts);
  
      const createNewPost = async () => {
        await store.dispatch('createPost', newPost.value);
        newPost.value = { title: '', body: '' };
        store.dispatch('fetchPosts');
      };
  
      onMounted(() => {
        store.dispatch('fetchPosts');
      });
  
      return {
        newPost,
        posts,
        createNewPost,
      };
    },
  });
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .post-table {
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #3b82f6;
    color: #ffffff;
    font-weight: 600;
  }
  
  td {
    background-color: #f9fafb;
  }
  
  .form-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .form-title {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  
  label {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s;
  }
  
  input:focus {
    border-color: #3b82f6;
    box-shadow: 0px 0px 0px 3px rgba(59, 130, 246, 0.3);
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #3b82f6;
    color: #ffffff;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-btn:hover {
    background-color: #2563eb;
  }
  </style>
  