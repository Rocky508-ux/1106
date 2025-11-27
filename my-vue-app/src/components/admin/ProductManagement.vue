<template>
  <div class="admin-card">
    <div class="header">
      <h1>商品管理</h1>
      <button class="admin-btn add-btn" @click="openAddModal">新增商品</button>
    </div>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <colgroup>
          <col style="width: 20%;" />
          <col style="width: 30%;" />
          <col style="width: 15%;" />
          <col style="width: 10%;" />
          <col style="width: 25%;" />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>名稱</th>
            <th>價格</th>
            <th>庫存</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td data-label="ID">{{ product.id }}</td>
            <td data-label="名稱">{{ product.name }}</td>
            <td data-label="價格">NT$ {{ product.price.toLocaleString() }}</td>
            <td data-label="庫存">{{ product.stock }}</td>
            <td data-label="操作" class="actions">
              <button class="admin-btn edit-btn" @click="openEditModal(product)">編輯</button>
              <button class="admin-btn delete-btn" @click="deleteProduct(product.id)">刪除</button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="5" style="text-align: center; padding: 20px;">目前沒有商品</td>
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

// Use `reactive` for objects that will have their properties modified in a form
const editedProduct = reactive({
  id: null, name: '', price: 0, stock: 0, description: '', image: ''
});

const generateUniqueId = () => 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

const openAddModal = () => {
  isEditMode.value = false;
  // Reset the properties of the reactive object
  Object.assign(editedProduct, {
    id: null,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: 'https://via.placeholder.com/150',
  });
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditMode.value = true;
  // Copy the properties of the selected product into the reactive object
  Object.assign(editedProduct, product);
  showModal.value = true;
};

const saveProduct = () => {
  if (isEditMode.value) {
    const index = products.value.findIndex(p => p.id === editedProduct.id);
    if (index !== -1) {
      // Use Object.assign to update the existing reactive object in the array
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
@import '../../assets/admin-table.css';

/* Add any component-specific styles here if needed */
[data-label="ID"] {
  font-family: monospace;
  font-size: 0.9em;
  color: #555;
}
</style>