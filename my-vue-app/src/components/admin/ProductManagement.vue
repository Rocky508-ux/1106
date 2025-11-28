<template>
  <div class="admin-card">
    <div class="header">
      <button class="add-btn admin-btn" style="margin-left: auto;" @click="openAddModal">新增商品</button>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th style="width: 80px;">圖片</th>
            <th style="width: 150px;">名稱</th>
            <th>工作室</th>
            <th>分類</th>
            <th>標籤</th>
            <th>價格</th>
            <th>庫存</th>
            <th style="width: 140px;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <img :src="getProductMainImage(product.id)" alt="產品圖片" class="product-thumb">
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.studio || '-' }}</td>
            <td>{{ product.type }}</td>
            <td>
              <span v-if="product.tag" :class="['status-badge', getTagClass(product.tag)]">
                {{ product.tag }}
              </span>
            </td>
            <td>NT$ {{ product.price.toLocaleString() }}</td>
            <td>{{ product.stock }}</td>
            <td class="actions">
              <button class="edit-btn admin-btn" @click="openEditModal(product)">編輯</button>
              <button class="delete-btn admin-btn" @click="deleteProduct(product.id)">刪除</button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="8" style="text-align: center; padding: 20px;">目前沒有商品</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditMode ? '編輯商品' : '新增商品' }}</h2>
        <form @submit.prevent="saveProduct" class="product-form">
          <div class="form-section">
            <h3>📦 基本資訊</h3>
            <div class="form-row">
              <div class="form-group half">
                <label for="name">商品名稱 *</label>
                <input type="text" id="name" v-model="editedProduct.name" required placeholder="例如：海賊王 魯夫" />
              </div>
              <div class="form-group half">
                <label for="studio">工作室/品牌</label>
                <input type="text" id="studio" v-model="editedProduct.studio" placeholder="例如：Bandai, YZ Studio" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group third">
                <label for="price">價格 *</label>
                <input type="number" id="price" v-model.number="editedProduct.price" required />
              </div>
              <div class="form-group third">
                <label for="stock">庫存 *</label>
                <input type="number" id="stock" v-model.number="editedProduct.stock" required />
              </div>
              <div class="form-group third">
                <label for="estimated_arrival">預計出貨</label>
                <input type="text" id="estimated_arrival" v-model="editedProduct.estimated_arrival" placeholder="例如：2025 Q3" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label for="category">商品類型 (Type)</label>
                <select id="category" v-model="editedProduct.type" class="styled-select full-width">
                  <option value="figure">公仔 (Figure)</option>
                  <option value="model">組裝模型 (Model)</option>
                  <option value="prize">景品 (Prize)</option>
                  <option value="blindbox">盒玩 (Blindbox)</option>
                </select>
              </div>
              <div class="form-group half">
                <label for="tag">銷售標籤 (Tag)</label>
                <select id="tag" v-model="editedProduct.tag" class="styled-select full-width">
                  <option value="">無</option>
                  <option value="new">新品 (NEW)</option>
                  <option value="預購">預購</option>
                  <option value="現貨">現貨</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>📏 規格詳情 (選填)</h3>
            <div class="form-row">
              <div class="form-group third">
                <label for="scale">比例</label>
                <input type="text" id="scale" v-model="editedProduct.scale" placeholder="例如：1/6" />
              </div>
              <div class="form-group third">
                <label for="dimensions">尺寸</label>
                <input type="text" id="dimensions" v-model="editedProduct.dimensions" placeholder="例如：H:30cm" />
              </div>
              <div class="form-group third">
                <label for="material">材質</label>
                <input type="text" id="material" v-model="editedProduct.material" placeholder="例如：PVC, 樹脂" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="description">商品描述</label>
              <textarea id="description" v-model="editedProduct.description" rows="3"></textarea>
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
import { productImages } from '../../data/productImages.js';

const showModal = ref(false);
const isEditMode = ref(false);

const editedProduct = reactive({
  id: null, 
  name: '', 
  price: 0, 
  stock: 0, 
  description: '',
  studio: '',
  scale: '',
  dimensions: '',
  material: '',
  estimated_arrival: '',
  tag: '',
  type: 'figure'
});

// 輔助函式：取得主圖 (修復圖片顯示問題)
const getProductMainImage = (productId) => {
  const img = productImages.value.find(i => i.product_id === productId && i.is_main);
  return img ? img.image_path : 'https://via.placeholder.com/50';
};

const getTagClass = (tag) => {
  if (tag === 'new') return 'new-tag';
  if (tag === '預購') return 'preorder-tag';
  if (tag === '現貨') return 'instock-tag';
  return '';
};

const generateUniqueId = () => 'prod-' + Date.now().toString(36);

const openAddModal = () => {
  isEditMode.value = false;
  Object.assign(editedProduct, {
    id: null, name: '', price: 0, stock: 0, description: '',
    studio: '', scale: '', dimensions: '', material: '', estimated_arrival: '',
    tag: '', type: 'figure'
  });
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditMode.value = true;
  Object.assign(editedProduct, JSON.parse(JSON.stringify(product)));
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
      status: 'available'
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
/* (樣式部分保持不變) */
.product-thumb { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; }
.modal-content { max-width: 700px; }
.form-section { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #eee; }
.form-section:last-child { border-bottom: none; }
.form-section h3 { font-size: 1.1rem; color: #4285F4; margin-bottom: 15px; border-left: 4px solid #4285F4; padding-left: 10px; }
.form-row { display: flex; gap: 15px; margin-bottom: 15px; }
.form-group { margin-bottom: 0; }
.form-group.half { flex: 1; }
.form-group.third { flex: 1; }
.full-width { width: 100%; }
.new-tag { background-color: #DB4437; }
.preorder-tag { background-color: #fbbc05; color: #333; }
.instock-tag { background-color: #34A853; }
</style>