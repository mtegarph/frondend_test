import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: { requiresAuth: true },
    component: Home,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
if (to.matched.some(record => record.meta.requiresAuth) ) {
  if (isAuthenticated) {
    next();
  }else {
    next('/');
  }
} else {
  next();
  
}

});

export default router;