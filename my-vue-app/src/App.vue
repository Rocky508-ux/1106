<script setup>
import { ref, reactive, computed } from 'vue';
import ShoppingCart from './components/ShoppingCart.vue';
import Login from './components/Login.vue';
import SearchBar from './components/SearchBar.vue';
import ProductList from './components/ProductList.vue';
import ToastNotification from './components/ToastNotification.vue';
import Register from './components/Register.vue';
import Orders from './components/Orders.vue';
import Profile from './components/Profile.vue';
import Contact from './components/Contact.vue';
import About from './components/About.vue';

const currentPage = ref('products');
const isLoggedIn = ref(false);
const selectedCategory = ref('');
const searchQuery = ref('');
const filter = ref('');
const showTransactions = ref(false);
const walletBalance = ref(15000);
const notifications = ref([]);

const products = ref([
  { id: 1, name: '鋼彈 RX-78-2', Price: 3200, category: 'gundam', imageUrl: '/image/羅莉1.jpg', tag: '現貨', series: '機動戰士系列' },
  { id: 2, name: 'ONE PIECE 魯夫', Price: 2200, category: 'onepiece', imageUrl: '/image/羅莉.jpg', tag: '預購', series: '海賊王系列' },
  { id: 3, name: '火影忍者 鳴人', Price: 2800, category: 'naruto', imageUrl: '/image/naruto_figure.jpg', tag: '現貨', series: '疾風傳系列' },
  { id: 4, name: '寶可夢 皮卡丘', Price: 2000, category: 'pokemon', imageUrl: '/image/pokemon_pika.jpg', tag: '現貨', series: '精靈寶可夢' },
  { id: 5, name: '鬼滅之刃 炭治郎', Price: 2400, category: 'other', imageUrl: '/image/kimetsu_tanjiro.jpg', tag: '現貨', series: '柱系列' },
  { id: 6, name: '進擊的巨人 艾連', Price: 2800, category: 'other', imageUrl: '/image/aot_eren.jpg', tag: '預購', series: '最終季' },
  { id: 7, name: '崩壞星穹鐵道 歌月君', Price: 16500, category: 'other', imageUrl: '/image/star_rail_yue.jpg', tag: '現貨', series: 'Imagination 歌月君' },
  { id: 8, name: '蝙蝠俠 (Batman)', Price: 4500, category: 'other', imageUrl: '/image/batman.jpg', tag: '預購', series: 'Prime 1 Studio' },
  { id: 9, name: '七龍珠 悟空', Price: 3500, category: 'other', imageUrl: '/image/野獸.webp', tag: '現貨', series: '超級賽亞人系列' }
]);

const orders = ref([
  { id: 'ORD001', totalAmount: 4300, status: '已完成', date: '2024-09-15' },
  { id: 'ORD002', totalAmount: 2200, status: '配送中', date: '2024-10-20' },
  { id: 'ORD003', totalAmount: 1500, status: '待付款', date: '2024-11-01' }
]);

const cartItems = ref([]);

const filteredProducts = computed(() => {
  let result = products.value;

  if (searchQuery.value) {
    result = result.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value);
  }

  return result;
});

function addNotification(message) {
  const id = Date.now();
  notifications.value.push({ id, message });
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 3000);
}

function handleSearch(query) {
  searchQuery.value = query;
}

function handleLoginSuccess() {
  isLoggedIn.value = true;
  navigateTo('products');
}

function logout() {
  isLoggedIn.value = false;
  navigateTo('products');
}

function addToCart(product) {
  cartItems.value.push(product);
  addNotification(`已將 ${product.name} 加入購物車`);
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
}

function navigateTo(page, newFilter = '') {
  currentPage.value = page;
  filter.value = newFilter;
  searchQuery.value = ''; // Reset search on navigation
}
</script>

<template>
  <div id="gk-shop">
    <ToastNotification :notifications="notifications" />
    <header class="main-header">
      <div class="header-inner-container">
        <div class="top-bar">
          <div class="gk-title" @click="navigateTo('products')" style="cursor: pointer;">
            <h1>RC玩童</h1>
          </div>
          <search-bar @search="handleSearch"></search-bar>
          <div class="auth-buttons">
            <button class="auth-btn cart-btn" @click="navigateTo('cart')">🛒 購物車</button>
            <button class="auth-btn login-btn" v-if="!isLoggedIn" @click="navigateTo('login')">登入</button>
            <button class="auth-btn register-btn" v-if="!isLoggedIn" @click="navigateTo('register')">註冊</button>
            <button class="auth-btn logout-btn" v-else @click="logout">登出</button>
          </div>
        </div>
        
        <nav class="main-nav">
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'new' }" @click="navigateTo('products', 'new')">最新上架</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && !filter }" @click="navigateTo('products', '')">商品列表</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'prize' }" @click="navigateTo('products', 'prize')">景品模型</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'gk' }" @click="navigateTo('products', 'gk')">GK模型</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'blindbox' }" @click="navigateTo('products', 'blindbox')">盒玩</span>
          <span class="nav-item" :class="{ active: currentPage === 'contact' }" @click="navigateTo('contact')">聯絡我們</span>
        </nav>
      </div>
    </header>
    
    <main class="main-content-area">
      <!-- Product Page Layout -->
      <product-list
        v-if="currentPage === 'products'"
        :products="filteredProducts"
        @add-to-cart="addToCart"
      ></product-list>

      <!-- Standalone Page Layout for all other pages -->
      <div v-else class="standalone-page-container">
        <Profile v-if="currentPage === 'profile'" :is-logged-in="isLoggedIn" />
        <Orders v-if="currentPage === 'orders'" :orders="orders" />
        <section class="content-section" v-if="currentPage === 'cart'">
          <shopping-cart 
            :cart-items="cartItems" 
            :is-logged-in="isLoggedIn"
            @remove-from-cart="removeFromCart"
            @require-login="navigateTo('login')"
            @back-to-products="navigateTo('products')"
          ></shopping-cart>
        </section>
        <Login v-if="currentPage === 'login'" @login-success="handleLoginSuccess" />
        <Register 
            v-if="currentPage === 'register'" 
            @navigate-to-login="navigateTo('login')" 
            @registration-notification="addNotification" 
        />
        <Contact v-if="currentPage === 'contact'" />
        <About v-if="currentPage === 'about'" />
      </div>
    </main>
    <footer class="main-footer">
      <div class="footer-links">
        <a href="#">關於我們</a> | 
        <a href="#">聯絡我們</a> | 
        <a href="#">訂單查詢</a> | 
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