<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="login-card">
        <h2 class="text-center">Login to Your Account</h2>
        <form @submit.prevent="login" class="form">
          <div class="form-group">
            <label for="email" class="vs">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password" class="vs1">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="submit-btn">Login</button>
        </form>
        <p class="register-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import  '../style/main.scss';
  
  const email = ref('');
  const password = ref('');
  const store = useStore();
  const router = useRouter();
  
  const login = async () => {
    try {
      await store.dispatch('login', { email: email.value, password: password.value });
      router.push('/Home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  </script>
  
  
  