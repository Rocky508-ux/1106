<template>
  <div class="cart-container">
    <div class="cart-header-row">
      <h2>購物車</h2>
      <button v-if="cartItems && cartItems.length > 0" @click="confirmClear" class="clear-cart-btn">
        清空購物車
      </button>
    </div>

    <div v-if="!cartItems || cartItems.length === 0" class="cart-empty">
      <p>您的購物車是空的。</p>
      <router-link to="/" class="back-to-shop-btn">繼續購物</router-link>
    </div>
    <div v-else>
      <div class="cart-items-list">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <img :src="getProductImage(item)" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-name">{{ item.name }}</h4>
            <p class="cart-item-series">{{ item.series }}</p>
            <p class="cart-item-price">NT$ {{ item.price?.toLocaleString() }}</p>
            
            <div class="quantity-controls">
              <button class="qty-btn" @click="$emit('update-quantity', item.id, -1)" :disabled="item.quantity <= 1">-</button>
              <span class="qty-value">{{ item.quantity }}</span>
              <button class="qty-btn" @click="$emit('update-quantity', item.id, 1)">+</button>
            </div>
          </div>
          <button @click="$emit('remove-from-cart', item.id)" class="remove-item-btn" title="移除商品">✕</button>
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

const emit = defineEmits(['remove-from-cart', 'require-login', 'update-quantity', 'clear-cart']);

const getProductImage = (item) => {
  if (item.imageUrl) return item.imageUrl;
  const foundImage = productImages.value.find(
    img => img.product_id === item.id && img.is_main
  );
  return foundImage ? foundImage.image_path : 'https://via.placeholder.com/100';
};

const totalPrice = computed(() => {
  if (!props.cartItems) return 0;
  return props.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// 確認清空
const confirmClear = () => {
  if (confirm('確定要清空購物車內的所有商品嗎？')) {
    emit('clear-cart');
  }
};

const handleCheckout = () => {
  if (props.isLoggedIn) {
    alert('正在前往結帳...');
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
  width: 100%;
}

@media (min-width: 768px) {
  .cart-container {
    width: 80%;
  }
}

/* ★★★ 新增：標題區塊樣式 (Flexbox 對齊) ★★★ */
.cart-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.cart-header-row h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0; /* 移除原本的 margin-bottom */
}

/* 清空按鈕樣式 */
.clear-cart-btn {
  background-color: transparent;
  color: #999;
  border: 1px solid #ddd;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-cart-btn:hover {
  color: #d93025; /* 紅色 */
  border-color: #d93025;
  background-color: #fff5f5;
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
  margin: 0 0 0.5rem 0;
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
  margin: 0 0 10px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
  border-color: #ccc;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-value {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.remove-item-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 10px;
  transition: color 0.3s;
  border-radius: 50%;
}
.remove-item-btn:hover {
  color: #d9534f;
  background-color: #fff0f0;
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