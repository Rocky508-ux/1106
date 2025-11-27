<template>
  <div v-if="product" class="product-detail-container">
    <h1>{{ product.name }}</h1>
    <img v-if="mainImage" :src="mainImage" :alt="product.name" class="product-image" />
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">價格: NT$ {{ product.price.toLocaleString() }}</p>
    <router-link to="/" class="back-link">返回商品列表</router-link>
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

// Find the product from the shared list based on the route's id prop
const product = computed(() => {
  return products.value.find(p => p.id === props.id);
});

// Find the main image for this product
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
}
.product-description {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1.5rem;
}
.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}
.back-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4285F4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.back-link:hover {
  background-color: #3367d6;
}
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}
</style>
