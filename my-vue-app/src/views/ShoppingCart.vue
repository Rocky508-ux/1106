<template>
  <div class="cart-container">
    <h2>購物車</h2>
    <div v-if="!cartItems || cartItems.length === 0" class="cart-empty">
      <p>您的購物車是空的。</p>
      <router-link to="/" class="back-to-shop-btn">繼續購物</router-link>
    </div>
    <div v-else>
      <div class="cart-items-list">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <img :src="getProductImage(item)" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-name">{{ item.name }} (x{{ item.quantity }})</h4>
            <p class="cart-item-series">{{ item.series }}</p>
            <p class="cart-item-price">NT$ {{ item.price?.toLocaleString() }}</p>
          </div>
          <button @click="$emit('remove-from-cart', item.id)" class="remove-item-btn">✕</button>
        </div>
      </div>
      <div class="cart-summary">
        <div class="cart-total">
          <h3>總計</h3>
          <p>NT$ {{ totalPrice.toLocaleString() }}</p>
        </div>
        <button @click="handleCheckout" class="checkout-btn">前往結帳</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
// 引入圖片資料庫以查找對應圖片
import { productImages } from '../data/productImages.js';

const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
    default: () => []
  },
  isLoggedIn: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['remove-from-cart', 'require-login']);

// 輔助函式：取得商品圖片
const getProductImage = (item) => {
  // 如果商品本身就有 imageUrl 就用它，否則去 productImages 查找
  if (item.imageUrl) return item.imageUrl;
  
  const foundImage = productImages.value.find(
    img => img.product_id === item.id && img.is_main
  );
  return foundImage ? foundImage.image_path : 'https://via.placeholder.com/100'; // 預設圖
};

const totalPrice = computed(() => {
  if (!props.cartItems) return 0;
  // 修正價格計算：Price -> price
  return props.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const handleCheckout = () => {
  if (props.isLoggedIn) {
    alert('正在前往結帳...');
    // Here you would typically navigate to a checkout page
  } else {
    alert('請先登入會員，才能進行結帳。');
    emit('require-login');
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  width: 50%; /* 配合您的 App.css 設定，若覺得太窄可在 RWD 調整 */
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
}

.cart-empty {
  text-align: center;
  padding: 3rem 0;
}
.cart-empty p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.back-to-shop-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-block;
  text-decoration: none;
}
.back-to-shop-btn:hover {
  background-color: #0056b3;
}

.cart-items-list {
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f8f8f8;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.cart-item-series {
  font-size: 0.9rem;
  color: #777;
  margin: 0 0 0.5rem 0;
}

.cart-item-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #d9534f;
  margin: 0;
}

.remove-item-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.3s;
}
.remove-item-btn:hover {
  color: #d9534f;
}

.cart-summary {
  border-top: 2px solid #f0f0f0;
  padding-top: 1.5rem;
  text-align: right;
}

.cart-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cart-total h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.cart-total p {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #218838;
}
</style>