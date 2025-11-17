<template>
  <div id="gk-shop">
    <header class="main-header">
      <div class="header-container">
        <div class="gk-title">
          <h1>🎎 GK 收藏投資平台</h1>
        </div>
        
        <div class="auth-buttons">
          <button class="auth-btn login-btn" v-if="!isLoggedIn" @click="currentPage = 'login'">登入</button>
          <button class="auth-btn register-btn" v-if="!isLoggedIn" @click="currentPage = 'register'">註冊</button>
          <button class="auth-btn logout-btn" v-else @click="logout">登出</button>
        </div>
      </div>
      
      <nav class="main-nav">
        <span class="nav-item" :class="{ active: currentPage === 'products' }" @click="currentPage = 'products'">商品列表</span>
        <span class="nav-item" :class="{ active: currentPage === 'orders' }" @click="currentPage = 'orders'">我的訂單</span>
        <span class="nav-item" :class="{ active: currentPage === 'wallet' }" @click="currentPage = 'wallet'">我的錢包</span>
      </nav>
    </header>

    <main class="main-content-area">
      
      <aside class="sidebar">
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
        <div class="extra-block">
          <h4>會員資訊</h4>
          <p v-if="isLoggedIn">歡迎回來！</p>
          <p v-else>請先登入</p>
        </div>
        <div class="extra-block">
          <h4>快速連結</h4>
          <p @click="currentPage = 'orders'" style="cursor: pointer;">📦 訂單查詢</p>
          <p @click="currentPage = 'wallet'" style="cursor: pointer;">💰 我的錢包</p>
        </div>
      </aside>

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

      <section class="content-section" v-if="currentPage === 'wallet'">
        <h2 class="section-title">我的錢包</h2>
        <div class="wallet-container">
          <div class="wallet-balance">
            <h3>當前餘額</h3>
            <p class="balance-amount">NT$ {{ walletBalance.toLocaleString() }}</p>
          </div>
          <div class="wallet-actions">
            <button class="action-btn" @click="showTopUp = true">儲值</button>
            <button class="action-btn secondary" @click="showTransactions = !showTransactions">交易記錄</button>
          </div>
          
          <div v-if="showTopUp" class="topup-form">
            <h4>儲值金額</h4>
            <input type="number" v-model="topUpAmount" placeholder="請輸入金額">
            <button class="buy-btn" @click="topUp">確認儲值</button>
            <button class="cancel-btn" @click="showTopUp = false">取消</button>
          </div>

          <div v-if="showTransactions" class="transaction-list">
            <h4>交易記錄</h4>
            <div class="transaction-item" v-for="trans in transactions" :key="trans.id">
              <span>{{ trans.type }}</span>
              <span :class="trans.amount > 0 ? 'positive' : 'negative'">
                {{ trans.amount > 0 ? '+' : '' }}NT$ {{ Math.abs(trans.amount).toLocaleString() }}
              </span>
              <span class="trans-date">{{ trans.date }}</span>
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
              <label>電子郵件</label>
              <input type="email" v-model="registerForm.email" required>
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
<style src="./App.css" scoped></style>