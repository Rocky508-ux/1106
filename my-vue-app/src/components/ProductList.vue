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
  display: flex; /* Enable flexbox for horizontal layout */
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: center; /* Center items horizontally */
  gap: 20px; /* Add space between items */
}

.product-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 0; /* Remove individual item margin-bottom as gap handles spacing */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 180px; /* 允許項目彈性成長/縮小，基本寬度為 180px */
  max-width: 100%; /* Ensure responsiveness on smaller screens */
  text-align: left; /* Align text within item to left */
}

.product-image {
  max-width: 100%; /* Image will fit within its parent .product-item */
  height: 200px; /* Set a fixed height for images */
  object-fit: contain; /* Ensure the entire image is visible without cropping */
  margin-top: 10px;
  border-radius: 4px;
}
</style>
