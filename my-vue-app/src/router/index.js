
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import Orders from '../views/Orders.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import ProductDetail from '../views/ProductDetail.vue';
import MemberCenter from '../views/MemberCenter.vue';
import Admin from '../views/Admin.vue';
import AdminLogin from '../views/AdminLogin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/member-center',
    name: 'MemberCenter',
    component: MemberCenter,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
