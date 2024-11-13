<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6">
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginView',
};
</script>

<style scoped>
/* Additional styling to ensure centering */
.min-h-screen {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
