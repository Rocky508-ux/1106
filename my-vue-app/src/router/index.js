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
// 移除 AdminLogin.vue，因為已經整合進 Login.vue

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
    // ★★★ 關鍵：加上 meta 標記，告訴路由守衛這個頁面需要管理員權限
    meta: { requiresAdmin: true },
  },
  // 移除 /admin/login 路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ★★★ 路由守衛 (Navigation Guard) ★★★
// 每次切換頁面前，都會執行這個函式
router.beforeEach((to, from, next) => {
  // 檢查要去的頁面 (to) 是否有 requiresAdmin 標記
  if (to.meta.requiresAdmin) {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    // 1. 如果沒登入 (沒 token) -> 踢去登入頁
    if (!token) {
      alert('請先登入！');
      return next('/login');
    }

    // 2. 如果有登入，但身分不是 ADMIN -> 踢回首頁 (或顯示權限不足)
    if (role !== 'ADMIN') {
      alert('權限不足，您無法進入後台！');
      return next('/'); // 導向首頁
    }
  }
  
  // 3. 如果都不符合上述阻擋條件，就放行
  next();
});

export default router;