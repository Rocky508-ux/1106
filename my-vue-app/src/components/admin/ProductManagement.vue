<template>
  <div class="content-wrapper">
    <div class="product-management">
      <div class="header">
        <h1>商品管理</h1>
        <button class="add-btn" @click="openAddModal">新增商品</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名稱</th>
            <th>價格</th>
            <th>庫存</th>
            <th>分類</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>NT$ {{ product.Price.toLocaleString() }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.category }}</td>
            <td class="actions">
              <button class="edit-btn" @click="openEditModal(product)">編輯</button>
              <button class="delete-btn" @click="deleteProduct(product.id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Product Add/Edit Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>{{ isEditMode ? '編輯商品' : '新增商品' }}</h2>
          <form @submit.prevent="saveProduct">
            <div class="form-group">
              <label for="name">名稱:</label>
              <input type="text" id="name" v-model="editedProduct.name" required />
            </div>
            <div class="form-group">
              <label for="price">價格:</label>
              <input type="number" id="price" v-model="editedProduct.Price" required />
            </div>
            <div class="form-group">
              <label for="stock">庫存:</label>
              <input type="number" id="stock" v-model.number="editedProduct.stock" required />
            </div>
            <div class="form-group">
              <label for="category">分類:</label>
              <input type="text" id="category" v-model="editedProduct.category" required />
            </div>
            <div class="form-group">
              <label for="imageUpload">商品圖片:</label>
              <input type="file" id="imageUpload" @change="handleImageUpload" accept="image/*" />
              <div v-if="imagePreviewUrl" class="image-preview">
                <p>預覽:</p>
                <img :src="imagePreviewUrl" alt="Image Preview" />
              </div>
              <div v-else-if="isEditMode && editedProduct.imageUrl" class="image-preview">
                <p>目前圖片:</p>
                <img :src="editedProduct.imageUrl" alt="Current Image" />
              </div>
            </div>
            <div class="form-group">
              <label for="tag">標籤:</label>
              <input type="text" id="tag" v-model="editedProduct.tag" />
            </div>
            <div class="form-group">
              <label for="series">系列:</label>
              <input type="text" id="series" v-model="editedProduct.series" />
            </div>
            <div class="form-group">
              <label for="description">描述:</label>
              <textarea id="description" v-model="editedProduct.description"></textarea>
            </div>
            <div class="form-group">
              <label for="type">類型:</label>
              <input type="text" id="type" v-model="editedProduct.type" />
            </div>
            <div class="modal-actions">
              <button type="submit" class="save-btn">儲存</button>
              <button type="button" class="cancel-btn" @click="closeModal">取消</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '../../data/products.js';
import { ref } from 'vue';

export default {
  name: 'ProductManagement',
  setup() {
    return { products };
  },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      editedProduct: {},
      imagePreviewUrl: null,
      imageFile: null,
    };
  },
  methods: {
    generateUniqueId() {
      return 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },
    openAddModal() {
      this.isEditMode = false;
      this.editedProduct = {
        id: null,
        name: '',
        Price: 0,
        stock: 0,
        category: '',
        imageUrl: '',
        tag: '',
        series: '',
        description: '',
        type: '',
      };
      this.imagePreviewUrl = null;
      this.imageFile = null;
      this.showModal = true;
    },
    openEditModal(product) {
      this.isEditMode = true;
      this.editedProduct = { ...product };
      this.imagePreviewUrl = null;
      this.imageFile = null;
      this.showModal = true;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreviewUrl = URL.createObjectURL(file);
      }
    },
    saveProduct() {
      // If a new image was selected, its blob URL is used for the display
      if (this.imagePreviewUrl) {
          this.editedProduct.imageUrl = this.imagePreviewUrl;
      }

      if (this.isEditMode) {
        const index = this.products.findIndex(p => p.id === this.editedProduct.id);
        if (index !== -1) {
          this.products[index] = { ...this.editedProduct };
        }
      } else {
        this.editedProduct.id = this.generateUniqueId();
        this.products.push({ ...this.editedProduct });
      }
      this.closeModal();
    },
    deleteProduct(productId) {
      if (confirm('確定要刪除此商品嗎？')) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
          // If the image was a blob, revoke its URL to free up memory
          const product = this.products[index];
          if (product.imageUrl && product.imageUrl.startsWith('blob:')) {
            URL.revokeObjectURL(product.imageUrl);
          }
          this.products.splice(index, 1);
        }
      }
    },
    closeModal() {
      // Revoke the blob URL when the modal is closed to prevent memory leaks
      if (this.imagePreviewUrl) {
        URL.revokeObjectURL(this.imagePreviewUrl);
      }
      this.showModal = false;
    }
  },
  beforeUnmount() {
    // Clean up any remaining blob URLs when the component is destroyed
    this.products.forEach(product => {
      if (product.imageUrl && product.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(product.imageUrl);
      }
    });
  }
};
</script>

<style scoped>
.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.product-management {

  padding: 20px;

  overflow-x: auto; /* Allow horizontal scrolling if table is too wide */

}



.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

}



.add-btn {

  background-color: #2ecc71;

  color: white;

  border: none;

  padding: 10px 15px;

  border-radius: 4px;

  cursor: pointer;

  white-space: nowrap;

}



table {

  width: 100%;

  border-collapse: collapse;

  min-width: 1000px; /* Ensure a minimum width for the table */

}



th, td {

  border: 1px solid #ddd;

  padding: 12px 15px; /* Increased padding for better spacing */

  text-align: left;

  vertical-align: middle;

  word-wrap: break-word;

}



th {

  background-color: #f2f2f2;

  font-weight: 600;

}



/* Specific column widths for better distribution */

th:nth-child(1), td:nth-child(1) { min-width: 120px; } /* ID */

th:nth-child(2), td:nth-child(2) { min-width: 180px; } /* Name */

th:nth-child(3), td:nth-child(3) { min-width: 100px; } /* Price */

th:nth-child(4), td:nth-child(4) { min-width: 80px; }  /* Stock */

th:nth-child(5), td:nth-child(5) { min-width: 120px; } /* Category */

th:nth-child(6), td:nth-child(6) { min-width: 200px; } /* Actions - ensure enough space for buttons */





.actions {

  display: flex;

  flex-wrap: nowrap; /* Prevent buttons from wrapping to next line */

  gap: 8px; /* Space between buttons */

  align-items: center;

}



.actions button {

  padding: 6px 12px; /* Adjusted padding */

  border: none;

  border-radius: 4px;

  cursor: pointer;

  white-space: nowrap; /* Prevent text inside buttons from wrapping */

}



.edit-btn {

  background-color: #3498db;

  color: white;

}



.delete-btn {

  background-color: #e74c3c;

  color: white;

}



/* Modal styles */

.modal-overlay {

  position: fixed;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 1000;

}



.modal-content {

  background-color: #fff;

  padding: 30px;

  border-radius: 8px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  width: 90%;

  max-width: 800px; /* Increased modal width */

  max-height: 80vh;

  overflow-y: auto;

}



.modal-content h2 {

  margin-top: 0;

  margin-bottom: 20px;

  color: #333;

}



.form-group {

  margin-bottom: 15px;

}



.form-group label {

  display: block;

  margin-bottom: 5px;

  font-weight: bold;

  color: #555;

}



.form-group input[type="text"],

.form-group input[type="number"],

.form-group textarea,

.form-group input[type="file"] {

  width: calc(100% - 22px); /* Account for padding and border */

  padding: 10px;

  border: 1px solid #ddd;

  border-radius: 4px;

  font-size: 1em;

}



.form-group textarea {

  resize: vertical;

  min-height: 80px;

}



.modal-actions {

  text-align: right;

  margin-top: 20px;

}



.save-btn, .cancel-btn {

  padding: 10px 20px;

  border: none;

  border-radius: 4px;

  cursor: pointer;

  font-size: 1em;

  margin-left: 10px;

}



.save-btn {

  background-color: #3498db;

  color: white;

}



.cancel-btn {

  background-color: #95a5a6;

  color: white;

}



.image-preview {

  margin-top: 10px;

}



.image-preview p {

  margin: 0 0 5px;

  font-weight: bold;

  font-size: 0.9em;

}



.image-preview img {

  max-width: 150px;

  max-height: 150px;

  border: 1px solid #ddd;

  border-radius: 4px;

}

</style>