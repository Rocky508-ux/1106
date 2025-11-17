<template>
  <div class="product-list">
    <h1>產品列表</h1>
    <div v-for="product in products" :key="product.id" class="product-item">
      <h2>{{ product.name }}</h2>
      <img :src="product.image" :alt="product.name" class="product-image">
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        {
          id: 1,
          name: '野獸',
          image: '/image/野獸.webp',
          description: '這是一張關於野獸的圖片。'
        }
      ]
    };
  }
};
</script>

<style scoped>
.product-list {
  padding: 20px;
  text-align: center;
}

.product-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
