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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
              <td>
              <button class="update-btn" @click="showUpdateModal(post)">Update</button>
              <button class="delete-btn" @click="deletePost(post.id)">Delete</button>
            </td>

            </tr>
          </tbody>
        </table>
      </div>

    <!-- Create/Update Post Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2 class="form-title">{{ isUpdating ? 'Update Post' : 'Create a New Post' }}</h2>
        <form @submit.prevent="isUpdating ? updatePost() : createNewPost()">
          <div class="form-group">
            <label for="title">Title</label>
            <input v-model="formData.title" id="title" type="text" placeholder="Enter title" required />
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <input v-model="formData.body" id="body" type="text" placeholder="Enter body" required />
          </div>
          <button type="submit" class="submit-btn">{{ isUpdating ? 'Update' : 'Create' }}</button>
        </form>
      </div>
    </div>

    <!-- Create Post Button -->
    <button class="create-btn" @click="showModal = true; isUpdating = false">Create Post</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const formData = ref({ title: '', body: '' });
    const posts = computed(() => store.state.posts);
    const showModal = ref(false);
    const isUpdating = ref(false);
    const currentPostId = ref<string | null>(null);

    const createNewPost = async () => {
      await store.dispatch('createPost', formData.value);
      formData.value = { title: '', body: '' };
      store.dispatch('fetchPosts');
      closeModal();
    };

    const updatePost = async () => {
      if (currentPostId.value) {
        await store.dispatch('updatePost', { postId: currentPostId.value, post: formData.value });
        formData.value = { title: '', body: '' };
        store.dispatch('fetchPosts');
        closeModal();
      }
    };

    const deletePost = async (postId: string) => {
      await store.dispatch('deletePost', postId);
      store.dispatch('fetchPosts');
    };

    const showUpdateModal = (post: { id: string; title: string; body: string }) => {
      formData.value = { title: post.title, body: post.body };
      currentPostId.value = post.id;
      showModal.value = true;
      isUpdating.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      isUpdating.value = false;
      currentPostId.value = null;
    };

    onMounted(() => {
      store.dispatch('fetchPosts');
    });

    return {
      formData,
      posts,
      showModal,
      isUpdating,
      createNewPost,
      updatePost,
      deletePost,
      showUpdateModal,
      closeModal,
    };
  },
});
</script>

<style scoped>
.post-table td:last-child,
.post-table th:last-child {
  text-align: right;
}
.post-table td,
.post-table th {
  text-align: center;
}
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
.update-btn {
  background-color: #4CAF50;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.create-btn {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}
</style>