<template>
  <div class="cart-container">
    <div class="cart-header-row">
      <h2>我的購物車</h2>
      <button v-if="cartItems.length > 0" @click="openClearModal" class="clear-cart-btn">
        🗑️ 清空購物車
      </button>
    </div>

    <div v-if="!cartItems || cartItems.length === 0" class="cart-empty">
      <div class="empty-icon">🛒</div>
      <p>您的購物車是空的</p>
      <router-link to="/" class="empty-action-btn">去逛逛</router-link>
    </div>

    <div v-else>
      <div class="cart-table-wrapper">
        <table class="cart-table">
          <thead>
            <tr>
              <th class="th-product header-left">商品資訊</th>
              <th class="th-spec">規格</th>
              <th class="th-qty">數量</th>
              <th class="th-price">單價</th>
              <th class="th-subtotal">小計</th>
              <th class="th-action">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td class="td-product">
                <div class="product-info-row">
                  <div class="thumb-wrapper">
                    <img :src="getProductImage(item)" :alt="item.name" class="cart-thumb">
                  </div>
                  <div class="product-text">
                    <span class="product-name">{{ item.name }}</span>
                    <div class="mobile-meta">
                      <span class="mobile-spec" v-if="item.tag">{{ item.tag }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="td-spec">
                <span class="badge">{{ item.tag || '標準' }}</span>
              </td>
              <td class="td-qty">
                <div class="quantity-controls">
                  <button @click="$emit('update-quantity', item.id, -1)" :disabled="item.quantity <= 1">-</button>
                  <input type="text" :value="item.quantity" readonly />
                  <button @click="$emit('update-quantity', item.id, 1)">+</button>
                </div>
              </td>
              <td class="td-price">
                <div class="price-wrapper">
                  <span class="currency">NT$</span>
                  <span class="amount">{{ item.price?.toLocaleString() }}</span>
                </div>
              </td>
              <td class="td-subtotal">
                <div class="price-wrapper highlight">
                  <span class="currency">NT$</span>
                  <span class="amount">{{ (item.price * item.quantity).toLocaleString() }}</span>
                </div>
              </td>
              <td class="td-action">
                <button @click="$emit('remove-from-cart', item.id)" class="delete-btn" title="移除">
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-footer">
        <div class="cart-summary-box">
          <div class="summary-row">
            <span>共 {{ totalItems }} 件商品</span>
          </div>
          <div class="summary-row total">
            <span>總金額</span>
            <span class="total-price">NT$ {{ totalPrice.toLocaleString() }}</span>
          </div>
        </div>
        
        <div class="cart-actions">
          <router-link to="/" class="continue-shop-btn">← 繼續購物</router-link>
          <button @click="handleCheckout" class="checkout-btn">前往結帳</button>
        </div>
      </div>
    </div>

    <div v-if="showClearModal" class="confirm-overlay" @click.self="closeClearModal">
      <div class="confirm-box">
        <h3>確定要清空購物車嗎？</h3>
        <p>此動作無法復原，所有商品將被移除。</p>
        <div class="confirm-actions">
          <button class="modal-btn cancel" @click="closeClearModal">取消</button>
          <button class="modal-btn confirm" @click="confirmClearAction">確定清空</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'; // 加入 ref
import { productImages } from '../data/productImages.js';

const props = defineProps({
  cartItems: { type: Array, required: true, default: () => [] },
  isLoggedIn: { type: Boolean, required: true }
});

const emit = defineEmits(['remove-from-cart', 'require-login', 'update-quantity', 'clear-cart', 'show-notification']);

// ★★★ 新增：控制 Modal 顯示的狀態 ★★★
const showClearModal = ref(false);

const getProductImage = (item) => {
  if (item.imageUrl) return item.imageUrl;
  const foundImage = productImages.value.find(img => img.product_id === item.id && img.is_main);
  return foundImage ? foundImage.image_path : 'https://via.placeholder.com/100';
};

const totalPrice = computed(() => {
  if (!props.cartItems) return 0;
  return props.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const totalItems = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.quantity, 0);
});

// 打開確認視窗
const openClearModal = () => {
  showClearModal.value = true;
};

// 關閉確認視窗
const closeClearModal = () => {
  showClearModal.value = false;
};

// 使用者按下「確定」後執行
const confirmClearAction = () => {
  emit('clear-cart');
  closeClearModal();
};

const handleCheckout = () => {
  if (props.isLoggedIn) {
    emit('show-notification', '正在前往結帳...');
  } else {
    emit('show-notification', '請先登入會員，才能進行結帳。');
    emit('require-login');
  }
};
</script>

<style scoped>
/* 原本的樣式保持不變 */
.cart-container { max-width: 1100px; margin: 40px auto; background-color: #fff; padding: 0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; min-height: 400px; display: flex; flex-direction: column; }
.cart-header-row { display: flex; justify-content: space-between; align-items: center; padding: 25px 30px; border-bottom: 1px solid #eee; background-color: #fff; flex-shrink: 0; }
.cart-header-row h2 { margin: 0; font-size: 1.6rem; color: #333; letter-spacing: 1px; }
.clear-cart-btn { background-color: #fff0f0; color: #d93025; border: 1px solid #ffcdd2; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 5px; }
.clear-cart-btn:hover { background-color: #ffebee; border-color: #ef9a9a; }
.cart-empty { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; width: 100%; }
.empty-icon { font-size: 5rem; margin-bottom: 20px; opacity: 0.2; }
.cart-empty p { font-size: 1.2rem; color: #666; margin-bottom: 30px; }
.empty-action-btn { display: inline-block; padding: 12px 35px; background: #333; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background 0.3s; }
.empty-action-btn:hover { background: #555; }
.cart-table-wrapper { overflow-x: auto; width: 100%; }
.cart-table { width: 100%; border-collapse: collapse; min-width: 900px; }
.cart-table th { background-color: #424242; color: #fff; padding: 15px; font-weight: 500; font-size: 0.95rem; text-align: center; letter-spacing: 0.5px; white-space: nowrap; }
.cart-table th.header-left { text-align: left; padding-left: 40px; }
.cart-table tbody tr:nth-child(even) { background-color: #fcfcfc; }
.cart-table tbody tr:hover { background-color: #f5f9ff; }
.cart-table td { padding: 20px 15px; border-bottom: 1px solid #eee; text-align: center; vertical-align: middle; color: #444; }
.td-product { width: 40%; min-width: 250px; text-align: left !important; padding-left: 40px !important; }
.td-spec { width: 10%; min-width: 80px; }
.td-qty { width: 15%; min-width: 120px; }
.td-price { width: 12%; min-width: 100px; }
.td-subtotal { width: 12%; min-width: 100px; }
.td-action { width: 8%; min-width: 50px; }
.product-info-row { display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 20px; text-align: left; }
.thumb-wrapper { width: 80px; height: 80px; border-radius: 6px; overflow: hidden; border: 1px solid #eee; background-color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cart-thumb { width: 100%; height: 100%; object-fit: contain; }
.product-text { display: flex; flex-direction: column; }
.product-name { font-weight: 700; font-size: 1.05rem; color: #333; line-height: 1.4; }
.mobile-meta { display: none; }
.spec-badge { color: #666; font-size: 0.85rem; background: #eee; padding: 4px 10px; border-radius: 12px; }
.quantity-controls { display: inline-flex; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background: #fff; }
.quantity-controls button { width: 32px; height: 32px; background: #fff; border: none; cursor: pointer; font-size: 1rem; color: #555; transition: background 0.2s; }
.quantity-controls button:hover:not(:disabled) { background: #f0f0f0; }
.quantity-controls button:disabled { color: #eee; cursor: not-allowed; }
.quantity-controls input { width: 40px; text-align: center; border: none; border-left: 1px solid #ddd; border-right: 1px solid #ddd; font-weight: bold; outline: none; font-size: 0.95rem; color: #333; }
.price-wrapper { display: flex; align-items: center; justify-content: center; gap: 4px; font-family: sans-serif; color: #666; white-space: nowrap; }
.price-wrapper.highlight { font-weight: bold; color: #d93025; }
.delete-btn { background: none; border: 1px solid transparent; width: 30px; height: 30px; border-radius: 50%; color: #bbb; cursor: pointer; transition: all 0.2s; font-size: 1.1rem; display: inline-flex; align-items: center; justify-content: center; }
.delete-btn:hover { color: #d93025; background-color: #fff0f0; border-color: #ffcdd2; }
.cart-footer { padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #eee; display: flex; flex-direction: column; align-items: flex-end; gap: 25px; }
.cart-summary-box { text-align: right; width: 100%; max-width: 350px; }
.summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: #666; }
.summary-row.total { font-size: 1.3rem; color: #333; font-weight: 700; border-top: 2px solid #ddd; padding-top: 15px; margin-top: 15px; align-items: center; }
.total-price { color: #d93025; font-size: 1.8rem; letter-spacing: -0.5px; }
.cart-actions { display: flex; align-items: center; gap: 30px; }
.continue-shop-btn { color: #555; text-decoration: none; font-size: 1rem; font-weight: 600; padding: 12px 25px; border: 1px solid #ccc; border-radius: 4px; transition: all 0.2s; background-color: #fff; }
.continue-shop-btn:hover { color: #333; border-color: #999; background-color: #f9f9f9; }
.checkout-btn { background-color: #333; color: white; border: none; padding: 16px 50px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; border-radius: 4px; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
.checkout-btn:hover { background-color: #000; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.2); }

/* ★★★ 新增：Modal 樣式 (自訂確認視窗) ★★★ */
.confirm-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑底 */
  z-index: 2000; /* 確保在最上層 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
  animation: fadeIn 0.2s ease-out;
}

.confirm-box h3 { margin-top: 0; color: #333; font-size: 1.4rem; }
.confirm-box p { color: #666; margin: 15px 0 25px; }

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.modal-btn {
  padding: 10px 25px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.modal-btn.cancel {
  background-color: #eee;
  color: #555;
}
.modal-btn.cancel:hover { background-color: #e0e0e0; }

.modal-btn.confirm {
  background-color: #d93025;
  color: #fff;
}
.modal-btn.confirm:hover { background-color: #b71c1c; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .cart-header-row { padding: 20px; flex-direction: row; }
  .clear-cart-btn { padding: 6px 10px; font-size: 0.85rem; }
  .cart-table { display: block; min-width: 0; }
  .cart-table thead { display: none; }
  .cart-table tbody, .cart-table tr, .cart-table td { display: block; width: 100%; text-align: left; }
  .cart-table tr { margin-bottom: 15px; border: 1px solid #eee; padding: 15px; background: #fff; position: relative; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
  .cart-table td { padding: 5px 0; border: none; display: flex; justify-content: space-between; align-items: center; }
  .td-product { width: 100%; padding-left: 0 !important; border-bottom: 1px solid #eee !important; padding-bottom: 10px !important; margin-bottom: 10px; }
  .td-spec, .td-price { display: none; }
  .td-qty { justify-content: flex-start; margin-bottom: 10px; }
  .td-subtotal { justify-content: flex-end; font-size: 1.2rem; width: 100%; }
  .td-action { position: absolute; top: 15px; right: 15px; width: auto; padding: 0; }
  .cart-footer { padding: 20px; align-items: stretch; }
  .cart-actions { flex-direction: column-reverse; gap: 15px; }
  .checkout-btn { width: 100%; }
  .continue-shop-btn { text-align: center; width: 100%; box-sizing: border-box; }
}
</style>