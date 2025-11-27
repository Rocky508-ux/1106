<template>
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

  // **TODO**: Re-implement filtering based on the new data structure (e.g., status or category_id)
  // The old filtering logic based on 'tag' and 'type' is removed for now.

  return currentProducts;
});
</script>