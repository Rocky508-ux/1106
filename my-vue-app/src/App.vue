<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';
import ToastNotification from './components/ToastNotification.vue';
import SearchBar from './components/SearchBar.vue';

const router = useRouter();
const route = useRoute();

// Global state
const isLoggedIn = ref(false);
const isAdmin = ref(false);
const notifications = ref([]);
const cartItems = ref([]);

// 導航列 Active 狀態
const isPreorderActive = computed(() => route.fullPath === '/?tag=預購');
const isInstockActive = computed(() => route.fullPath === '/?tag=現貨');
const isNewActive = computed(() => route.fullPath === '/?tag=new');
const isPrizeActive = computed(() => route.fullPath === '/?category=prize_blindbox');
const isContactActive = computed(() => route.path === '/contact');

function checkAuth() {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  
  isLoggedIn.value = !!token;
  isAdmin.value = role === 'ADMIN';
}

onMounted(() => {
  checkAuth();
});

function handleLoginSuccess() {
  checkAuth();
}

// 容器 Class 計算
const containerClass = computed(() => {
  if (route.path === '/') {
    return 'product-page-container';
  } else if (route.path.startsWith('/admin')) {
    return 'full-width-page-container';
  } else {
    return 'standalone-page-container';
  }
});

const headerInnerClass = computed(() => {
  if (route.path.startsWith('/admin')) {
    return 'header-full-width';
  }
  return 'header-inner-container';
});

// ★★★ 新增：計算購物車商品總數量 ★★★
const totalCartCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.quantity || 1), 0);
});

function handleSearch(query) {
  router.push({ path: '/', query: { search: query } });
}

function addNotification(message) {
  const id = Date.now();
  notifications.value.push({ id, message });
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 3000);
}

function addToCart(product) {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
  addNotification(`已將 ${product.name} 加入購物車`);
}

function updateCartQuantity(productId, change) {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      item.quantity = newQuantity;
    }
  }
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
}

function clearCart() {
  cartItems.value = [];
  addNotification('購物車已清空');
}

function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  
  isLoggedIn.value = false;
  isAdmin.value = false;
  
  router.push('/');
  addNotification('已成功登出');
}
</script>

<template>
  <div id="gk-shop">
    <ToastNotification :notifications="notifications" />
    <header class="main-header">
      <div :class="headerInnerClass">
        <div class="top-bar">
          <div class="gk-title">
            <router-link to="/"><h1>RC玩童</h1></router-link>
          </div>
          <search-bar @search="handleSearch"></search-bar>
          <div class="auth-buttons">
            <router-link to="/cart" class="auth-btn cart-btn">
              🛒 購物車 <span v-if="totalCartCount > 0">({{ totalCartCount }})</span>
            </router-link>
            
            <router-link v-if="!isLoggedIn" to="/login" class="auth-btn login-btn">登入</router-link>
            <router-link v-if="!isLoggedIn" to="/register" class="auth-btn register-btn">註冊</router-link>
            <button class="auth-btn logout-btn" v-else @click="logout">登出</button>
          </div>
        </div>
        
        <nav class="main-nav">
          <router-link to="/?tag=new" class="nav-item" :class="{ 'active': isNewActive }">最新上架</router-link>
          <router-link to="/?tag=預購" class="nav-item" :class="{ 'active': isPreorderActive }">預購商品</router-link>
          <router-link to="/?tag=現貨" class="nav-item" :class="{ 'active': isInstockActive }">現貨商品</router-link>
          <router-link to="/?category=prize_blindbox" class="nav-item" :class="{ 'active': isPrizeActive }">景品/盒玩</router-link>
          <router-link to="/contact" class="nav-item" :class="{ 'active': isContactActive }">聯絡我們</router-link>
          <router-link v-if="isLoggedIn" to="/member-center" class="nav-item">會員中心</router-link>
          <router-link v-if="isAdmin" to="/admin" class="nav-item">管理者後台</router-link>
        </nav>
      </div>
    </header>
    
    <main :class="containerClass">
      <router-view 
        :is-logged-in="isLoggedIn"
        :cart-items="cartItems"
        @login-success="handleLoginSuccess" 
        @registration-notification="addNotification"
        @require-login="$router.push('/login')"
        @add-to-cart="addToCart"
        @update-quantity="updateCartQuantity" 
        @remove-from-cart="removeFromCart"
        @clear-cart="clearCart" 
        @show-notification="addNotification"
      />
    </main>

    <footer class="main-footer">
      <div class="footer-links">
        <router-link to="/about">關於我們1</router-link> | 
        <router-link to="/contact">聯絡我們</router-link> | 
        <router-link to="/orders">訂單查詢</router-link> | 
        <a href="#">售後服務</a> |
        <a href="#">隱私權政策</a>
      </div>
      <div class="footer-info">
        地址: 台北市XX區XX路XX號 | 電話: 02-1234-5678 | 營業時間: 週一至週日 10:00-22:00
      </div>
      <div class="footer-info">
        © 2024 GK收藏投資平台 版權所有
      </div>
    </footer>
  </div>
</template>

<style src="./assets/App.css"></style>