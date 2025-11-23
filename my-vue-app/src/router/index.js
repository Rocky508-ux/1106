import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Contact from '../components/Contact.vue';
import About from '../components/About.vue';
import Profile from '../components/Profile.vue';
import Orders from '../components/Orders.vue';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: ProductList,
    props: route => ({
      searchQuery: route.query.searchQuery,
      filter: route.query.filter
    })
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    props: true // Pass all route params as props. Not strictly needed here, but for consistency.
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    props: true
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;