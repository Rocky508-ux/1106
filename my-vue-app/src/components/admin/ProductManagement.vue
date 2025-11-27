<template>
  <div class="admin-card">
    <div class="header">
      <h1>商品管理</h1>
      <button class="add-btn admin-btn" @click="openAddModal">新增商品</button>
    </div>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>圖片</th>
            <th>名稱</th>
            <th>價格</th>
            <th>庫存</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td><img :src="product.image" alt="產品圖片" class="product-thumb"></td>
            <td>{{ product.name }}</td>
            <td>NT$ {{ product.price.toLocaleString() }}</td>
            <td>{{ product.stock }}</td>
            <td class="actions">
              <button class="edit-btn admin-btn" @click="openEditModal(product)">編輯</button>
              <button class="delete-btn admin-btn" @click="deleteProduct(product.id)">刪除</button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">目前沒有商品</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Product Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditMode ? '編輯商品' : '新增商品' }}</h2>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label for="name">名稱:</label>
            <input type="text" id="name" v-model="editedProduct.name" required />
          </div>
          <div class="form-group">
            <label for="price">價格:</label>
            <input type="number" id="price" v-model.number="editedProduct.price" required />
          </div>
          <div class="form-group">
            <label for="stock">庫存:</label>
            <input type="number" id="stock" v-model.number="editedProduct.stock" required />
          </div>
          <div class="form-group">
            <label for="description">描述:</label>
            <textarea id="description" v-model="editedProduct.description"></textarea>
          </div>
          <div class="form-group">
            <label for="image">圖片 URL:</label>
            <input type="text" id="image" v-model="editedProduct.image" />
            <div v-if="editedProduct.image" class="image-preview">
              <p>預覽:</p>
              <img :src="editedProduct.image" alt="圖片預覽" style="max-width: 100px; max-height: 100px;">
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="admin-btn cancel-btn" @click="closeModal">取消</button>
            <button type="submit" class="admin-btn save-btn">儲存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { products } from '../../data/products.js';

const showModal = ref(false);
const isEditMode = ref(false);

const editedProduct = reactive({
  id: null, name: '', price: 0, stock: 0, description: '', image: ''
});

const generateUniqueId = () => 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

const openAddModal = () => {
  isEditMode.value = false;
  Object.assign(editedProduct, {
    id: null,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: 'https://via.placeholder.com/150', // Default placeholder image
  });
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditMode.value = true;
  Object.assign(editedProduct, product);
  showModal.value = true;
};

const saveProduct = () => {
  if (isEditMode.value) {
    const index = products.value.findIndex(p => p.id === editedProduct.id);
    if (index !== -1) {
      Object.assign(products.value[index], editedProduct);
    }
  } else {
    products.value.push({
      ...editedProduct,
      id: generateUniqueId(),
    });
  }
  closeModal();
};

const deleteProduct = (productId) => {
  if (confirm('確定要刪除此商品嗎？')) {
    const index = products.value.findIndex(p => p.id === productId);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.product-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.image-preview {
  margin-top: 10px;
}
</style>
