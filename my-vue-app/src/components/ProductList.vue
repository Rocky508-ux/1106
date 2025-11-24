<template>
  <div class="product-page-container">
    <template v-if="products.length > 0">
      <product-card
        v-for="product in products"
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
import ProductCard from './ProductCard.vue';

defineProps({
  products: {
    type: Array,
    required: true
  }
});

defineEmits(['add-to-cart']);
</script>

<style scoped>
.product-page-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>