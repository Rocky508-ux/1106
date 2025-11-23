<script setup>
import { ref, reactive, computed } from 'vue';
import ShoppingCart from './components/ShoppingCart.vue';
import Login from './components/Login.vue';
import SearchBar from './components/SearchBar.vue';

const currentPage = ref('products');
const isLoggedIn = ref(false);
const selectedCategory = ref('');
const searchQuery = ref('');
const filter = ref('');
const showTransactions = ref(false);
const walletBalance = ref(15000);

const registerForm = reactive({
  name: '',
  email: '',
  phone: '',
  birthday: '',
  password: '',
  confirmPassword: ''
});

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

function handleSearch(query) {
  searchQuery.value = query;
}

function handleLoginSuccess() {
  isLoggedIn.value = true;
  currentPage.value = 'products';
}

function register() {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('密碼不一致！');
    return;
  }
  alert('註冊功能需串接後端 API');
  currentPage.value = 'login';
}

function logout() {
  isLoggedIn.value = false;
  currentPage.value = 'products';
}

function addToCart(product) {
  cartItems.value.push(product);
  alert(`已將 ${product.name} 加入購物車`);
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
}

function getStatusClass(status) {
  const map = {
    '已完成': 'status-completed',
    '配送中': 'status-shipping',
    '待付款': 'status-pending'
  };
  return map[status] || '';
}
</script>

<template>
  <div id="gk-shop">
    <header class="main-header">
      <div class="header-inner-container">
        <div class="top-bar">
          <div class="gk-title" @click="currentPage = 'products'" style="cursor: pointer;">
            <h1>RC玩童</h1>
          </div>
          <search-bar @search="handleSearch"></search-bar>
          <div class="auth-buttons">
            <button class="auth-btn cart-btn" @click="currentPage = 'cart'">🛒 購物車</button>
            <button class="auth-btn login-btn" v-if="!isLoggedIn" @click="currentPage = 'login'">登入</button>
            <button class="auth-btn register-btn" v-if="!isLoggedIn" @click="currentPage = 'register'">註冊</button>
            <button class="auth-btn logout-btn" v-else @click="logout">登出</button>
          </div>
        </div>
        
        <nav class="main-nav">
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'new' }" @click="currentPage = 'products'; filter = 'new'">最新上架</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && !filter }" @click="currentPage = 'products'; filter = ''">商品列表</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'prize' }" @click="currentPage = 'products'; filter = 'prize'">景品模型</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'gk' }" @click="currentPage = 'products'; filter = 'gk'">GK模型</span>
          <span class="nav-item" :class="{ active: currentPage === 'products' && filter === 'blindbox' }" @click="currentPage = 'products'; filter = 'blindbox'">盒玩</span>
          <span class="nav-item" :class="{ active: currentPage === 'contact' }" @click="currentPage = 'contact'">聯絡我們</span>
        </nav>
      </div>
    </header>

    <main class="main-content-area">
      <!-- Product Page Layout -->
      <div v-if="currentPage === 'products'" class="product-page-container">
          <div class="product-card" v-for="product in filteredProducts" :key="product.id">
            <div class="product-image-container">
              <span class="product-tag">{{ product.tag }}</span>
              <img :src="product.imageUrl" :alt="product.name">
            </div>
            <div class="product-info">
              <p class="product-series">{{ product.series }}</p>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price-range">NT$ {{ product.Price.toLocaleString() }}</p>
              <button class="buy-btn" @click="addToCart(product)">加入購物車</button>
            </div>
          </div>
      </div>

      <!-- Standalone Page Layout for all other pages -->
      <div v-else class="standalone-page-container">
        <section class="content-section" v-if="currentPage === 'profile'">
          <h2 class="section-title">會員中心</h2>
          <div class="extra-block">
            <h4>會員資訊</h4>
            <p v-if="isLoggedIn">歡迎回來！</p>
            <p v-else>請先登入</p>
          </div>
        </section>
        <section class="content-section" v-if="currentPage === 'orders'">
          <h2 class="section-title">我的訂單</h2>
          <div class="order-list">
            <div class="order-item" v-for="order in orders" :key="order.id">
              <div class="order-header">
                <div>
                  <h3>訂單編號: {{ order.id }}</h3>
                  <p class="order-date">{{ order.date }}</p>
                </div>
                <span class="order-status" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </div>
              <div class="order-total">
                總金額: <strong>NT$ {{ order.totalAmount.toLocaleString() }}</strong>
              </div>
            </div>
          </div>
        </section>
        <section class="content-section" v-if="currentPage === 'cart'">
          <shopping-cart 
            :cart-items="cartItems" 
            :is-logged-in="isLoggedIn"
            @remove-from-cart="removeFromCart"
            @require-login="currentPage = 'login'"
            @back-to-products="currentPage = 'products'"
          ></shopping-cart>
        </section>
        <Login v-if="currentPage === 'login'" @login-success="handleLoginSuccess" />
        <div class="login-container" v-if="currentPage === 'register'">
            <h2>會員註冊</h2>
            <form @submit.prevent="register" class="login-form">
              <div class="form-group">
                <label>姓名 <span style="color: red;">*</span></label>
                <input type="text" v-model="registerForm.name" required>
              </div>
              <div class="form-group">
                <label>電子郵件 <span style="color: red;">*</span></label>
                <input type="email" v-model="registerForm.email" required>
              </div>
              <div class="form-group">
                <label>手機 <span style="color: red;">*</span></label>
                <input type="tel" v-model="registerForm.phone" required>
              </div>
              <div class="form-group">
                <label>生日</label>
                <input type="date" v-model="registerForm.birthday" required>
              </div>
              <div class="form-group">
                <label>密碼 <span style="color: red;">*</span></label>
                <input type="password" v-model="registerForm.password" required>
              </div>
              <div class="form-group">
                <label>確認密碼 <span style="color: red;">*</span></label>
                <input type="password" v-model="registerForm.confirmPassword" required>
              </div>
              <button type="submit" class="buy-btn">註冊</button>
              <p class="login-footer">已有帳號？ <a @click="currentPage = 'login'">立即登入</a></p>
            </form>
          </div>
        <section class="content-section" v-if="currentPage === 'contact'">
          <h2 class="section-title">聯絡我們</h2>
          <p>這是有關如何聯絡我們的資訊。</p>
        </section>
        <section class="content-section" v-if="currentPage === 'about'">
          <h2 class="section-title">關於我們</h2>
          <p>這是關於我們公司的資訊。</p>
        </section>
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

<style src="./App.css"></style>