<template>
  <div v-if="product" class="product-detail-container">
    <h1>{{ product.name }}</h1>
    <img v-if="mainImage" :src="mainImage" :alt="product.name" class="product-image" />
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">價格: NT$ {{ product.price.toLocaleString() }}</p>
    
    <div class="action-buttons">
      <button class="add-cart-btn" @click="$emit('add-to-cart', product)">加入購物車</button>
      <router-link to="/" class="back-link">返回商品列表</router-link>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>很抱歉，找不到該商品</h2>
    <p>您想找的商品可能已下架或不存在。</p>
    <router-link to="/" class="back-link">返回首頁</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { products } from '../data/products.js';
import { productImages } from '../data/productImages.js';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// 定義可以發出的事件
defineEmits(['add-to-cart']);

const product = computed(() => {
  return products.value.find(p => p.id === props.id);
});

const mainImage = computed(() => {
  if (!product.value) return null;
  const image = productImages.value.find(
    img => img.product_id === product.value.id && img.is_main
  );
  return image ? image.image_path : null;
});
</script>

<style scoped>
.product-detail-container {
  padding: 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.product-image {
  max-width: 100%;
  height: auto;
  max-height: 500px;
  margin: 2rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  object-fit: contain; /* 確保圖片不變形 */
}
.product-description {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #d93025; /* 價格用紅色顯眼 */
  margin-bottom: 2rem;
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}
.add-cart-btn {
  padding: 12px 30px;
  background-color: #fbbc05; /* Google Yellow */
  color: #333;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.add-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  background-color: #f9ab00;
}
.back-link {
  display: inline-block;
  padding: 12px 20px;
  background-color: #e0e0e0;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}
.back-link:hover {
  background-color: #d5d5d5;
}
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}
</style>