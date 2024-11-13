<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <div class="login-card">
            <h2 class="text-center">Login to Your Account</h2>
            <form @submit.prevent="login" class="form">
                <div class="form-group">
                    <label for="email" class="vs">Name</label>
                    <input v-model="name" type="text" id="name" placeholder="Enter your name" required />
                </div>
                <div class="form-group">
                    <label for="email" class="vs">Email</label>
                    <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div class="form-group">
                    <label for="password" class="vs1">Password</label>
                    <input v-model="password" type="password" id="password" placeholder="Enter your password"
                        required />
                </div>
                <div class="form-group">
                    <label for="password_confirmation" class="vs1">Password Confirm</label>
                    <input v-model="password_confirmation" type="password" id="password_confirmation"
                        placeholder="Enter your password Confirmation" required />
                </div>
                <button type="submit" class="submit-btn">Register</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import '../style/main.scss';
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const store = useStore();
const router = useRouter();

const login = async () => {
    try {
        await store.dispatch('register', { email: email.value, password: password.value, password_confirmation: password_confirmation.value, name: name.value });
        router.push('/');
    } catch (error) {
        console.error('register failed:', error);
        alert('register failed.');
    }
};
</script>