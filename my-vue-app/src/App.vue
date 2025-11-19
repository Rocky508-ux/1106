<template>
  <div id="gk-shop">
    <header class="main-header">
      <div class="header-container">
        <div class="gk-title" @click="currentPage = 'products'" style="cursor: pointer;">
          <h1>🎎 GK 收藏投資平台</h1>
        </div>
        
        <div class="auth-buttons">
          <button class="auth-btn cart-btn">🛒 購物車</button>
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
        <span class="nav-item" :class="{ active: currentPage === 'about' }" @click="currentPage = 'about'">關於我們</span>
      </nav>

      <div class="top-filters">
        <div class="filter-dropdown">
          <select class="category-select" v-model="selectedCategory">
            <option value="">全部類別</option>
            <option value="gundam">鋼彈系列</option>
            <option value="onepiece">ONE PIECE</option>
            <option value="naruto">火影忍者</option>
            <option value="pokemon">寶可夢</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="filter-list">
          <h4>篩選條件</h4>
          <p>價格: $1000-2000</p>
          <p>價格: $2000-3000</p>
          <p>價格: $3000以上</p>
          <p>-----</p>
          <p>熱門商品</p>
          <p>最新上架</p>
        </div>
      </div>
    </header>

    <main class="main-content-area">

      <aside class="sidebar">
        <ul class="sidebar-nav">
          <li>項目 1</li>
          <li>項目 2</li>
          <li>項目 3</li>
          <li>項目 4</li>
          <li>項目 5</li>
        </ul>
      </aside>

      <div class="content-wrapper">
        <section class="product-display" v-if="currentPage === 'products'">
          <div class="product-card" v-for="product in filteredProducts" :key="product.id">
            <div class="product-image-container">
              <span class="product-tag">{{ product.tag }}</span>
              <img :src="product.imageUrl" :alt="product.name">
            </div>
            <div class="product-info">
              <p class="product-series">{{ product.series }}</p>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price-range">NT$ {{ product.minPrice.toLocaleString() }} ~ NT$ {{ product.maxPrice.toLocaleString() }}</p>
            </div>
          </div>
        </section>

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

        

        <section class="content-section" v-if="currentPage === 'login'">
          <div class="login-container">
            <h2>會員登入</h2>
            <form @submit.prevent="login" class="login-form">
              <div class="form-group">
                <label>電子郵件</label>
                <input type="email" v-model="loginForm.email" required>
              </div>
              <div class="form-group">
                <label>密碼</label>
                <input type="password" v-model="loginForm.password" required>
              </div>
              <button type="submit" class="buy-btn">登入</button>
              <p class="login-footer">還沒有帳號？ <a @click="currentPage = 'register'">立即註冊</a></p>
            </form>
          </div>
        </section>

        <section class="content-section" v-if="currentPage === 'register'">
          <div class="login-container">
            <h2>會員註冊</h2>
            <form @submit.prevent="register" class="login-form">
              <div class="form-group">
                <label>姓名</label>
                <input type="text" v-model="registerForm.name" required>
              </div>
              <div class="form-group">
                <label>電子郵件</label>
                <input type="email" v-model="registerForm.email" required>
              </div>
              <div class="form-group">
                <label>手機</label>
                <input type="tel" v-model="registerForm.phone" required>
              </div>
              <div class="form-group">
                <label>生日</label>
                <input type="date" v-model="registerForm.birthday" required>
              </div>
              <div class="form-group">
                <label>密碼</label>
                <input type="password" v-model="registerForm.password" required>
              </div>
              <div class="form-group">
                <label>確認密碼</label>
                <input type="password" v-model="registerForm.confirmPassword" required>
              </div>
              <button type="submit" class="buy-btn">註冊</button>
              <p class="login-footer">已有帳號？ <a @click="currentPage = 'login'">立即登入</a></p>
            </form>
          </div>
        </section>

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

<script src="./App.js"></script>
<style src="./App.css"></style>