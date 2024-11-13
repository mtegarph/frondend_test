<script setup lang="ts">
import PostForm from '../components/PostForm.vue'
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md center">
      <PostForm />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'HomeView',
};
</script>