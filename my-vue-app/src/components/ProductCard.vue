<template>
  <div class="product-card" @click="navigateToDetail">
    <div class="product-image-container">
      <img v-if="mainImage" :src="mainImage" :alt="product.name">
      <div v-else class="placeholder-image">Image not available</div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-actions">
        <p class="product-price-range">NT$ {{ product.price.toLocaleString() }}</p>
        <button class="buy-btn" @click.stop="$emit('add-to-cart', product)">加入購物車</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { productImages } from '../data/productImages.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['add-to-cart']);

const router = useRouter();

// Find the main image for this product
const mainImage = computed(() => {
  const image = productImages.value.find(
    img => img.product_id === props.product.id && img.is_main
  );
  return image ? image.image_path : null;
});

function navigateToDetail() {
  router.push('/product/' + props.product.id);
}
</script>

<style scoped>
/* Scoped styles specific to ProductCard */
.product-card {
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.product-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #f8f8f8;
  border-bottom: 1px solid #f0f0f0;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover .product-image-container img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-series {
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 5px;
  font-weight: 500;
}

.product-name {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.4;
  flex-grow: 1;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price-range {
  font-size: 1.1rem;
  font-weight: bold;
  color: #DB4437;
  margin: 0;
}

.buy-btn {
  padding: 8px 16px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.buy-btn:hover {
  background-color: #3367d6;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
