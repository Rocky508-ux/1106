<template>
  <div class="product-page-container">
    <template v-if="filteredProducts.length > 0">
      <product-card
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', $event)"
      ></product-card>
    </template>
    <div v-else class="no-results">
      <p>找不到符合條件的商品</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { products } from '../data/products.js';

defineEmits(['add-to-cart']);

const route = useRoute();

const filteredProducts = computed(() => {
  let currentProducts = products.value;

  // Filter by search term (always applies)
  const searchTerm = (route.query.search || '').toLowerCase();
  if (searchTerm) {
    currentProducts = currentProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  // Navigation filters (mutually exclusive)
  const tagType = route.query.tag; // '預購' or '現貨'
  const categoryType = route.query.category; // 'prize_blindbox'

  if (tagType) {
    // Apply tag filter if present
    currentProducts = currentProducts.filter(product => product.tag === tagType);
  } else if (categoryType === 'prize_blindbox') {
    // Apply category filter only if no tag filter is active
    currentProducts = currentProducts.filter(product => 
      product.type === 'prize' || product.type === 'blindbox'
    );
  }

  return currentProducts;
});
</script>

<style scoped>
.product-page-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 2rem;
}
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}
</style>