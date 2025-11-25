<template>
  <div class="product-card">
    <router-link :to="'/product/' + product.id">
      <div class="product-image-container">
        <span
          v-if="product.type !== 'prize' && product.type !== 'blindbox'"
          class="product-tag"
          :style="tagStyle"
        >{{ product.tag }}</span>
        <img :src="product.imageUrl" :alt="product.name">
      </div>
      <div class="product-info-link">
        <p class="product-series">{{ product.series }}</p>
        <h3 class="product-name">{{ product.name }}</h3>
      </div>
    </router-link>
    <div class="product-actions">
      <p class="product-price-range">NT$ {{ product.Price.toLocaleString() }}</p>
      <button class="buy-btn" @click.prevent="$emit('add-to-cart', product)">加入購物車</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['add-to-cart']);

const tagStyle = computed(() => {
  if (props.product.tag === '預購') {
    return { 
      backgroundColor: '#1a73e8', // Google Blue for pre-order
      color: 'white'
    };
  }
  if (props.product.tag === '現貨') {
    return { 
      backgroundColor: '#4CAF50', // Vibrant green
      color: 'white'
    };
  }
  return {}; // Default or no specific style
});
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

a {
  text-decoration: none;
  color: inherit;
}

.product-image-container {
  position: relative;
}

.product-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #4285F4;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    z-index: 1;
}

.product-image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.product-info-link {
  padding: 15px;
}

.product-series {
    font-size: 14px;
    color: #666;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.product-actions {
  padding: 0 15px 15px;
}

.product-price-range {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
}

.buy-btn {
    width: 100%;
    padding: 10px;
    background-color: #4285F4; /* A more appealing blue */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  background-color: #3367d6; /* Darker blue on hover */
}
</style>
