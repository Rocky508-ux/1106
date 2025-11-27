<template>
  <div class="admin-card">
    <div class="header">
      <h1>訂單管理</h1>
    </div>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>顧客</th>
            <th>日期</th>
            <th>總金額</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.date }}</td>
            <td>NT$ {{ order.amount.toLocaleString() }}</td>
            <td>
              <select v-model="order.status" @change="updateStatus(order)" class="styled-select">
                <option value="處理中">處理中</option>
                <option value="已出貨">已出貨</option>
                <option value="已送達">已送達</option>
                <option value="已取消">已取消</option>
              </select>
            </td>
            <td class="actions">
              <button class="admin-btn view-btn" @click="viewOrder(order)">查看詳情</button>
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">目前沒有訂單</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showDetailModal" class="modal-overlay" @click.self="closeDetailModal">
      <div class="modal-content">
        <h2>訂單詳情 #{{ selectedOrder?.id }}</h2>
        <div class="order-details">
          <p><strong>顧客:</strong> {{ selectedOrder?.customer }}</p>
          <p><strong>日期:</strong> {{ selectedOrder?.date }}</p>
          <p><strong>總金額:</strong> NT$ {{ selectedOrder?.amount.toLocaleString() }}</p>
          <p><strong>狀態:</strong> <span :class="['status-badge', selectedOrder?.status]">{{ selectedOrder?.status }}</span></p>
          <h3>訂購商品:</h3>
          <ul class="order-items-list">
            <li v-for="item in selectedOrder?.items" :key="item.productId">
              {{ item.productName }} (x{{ item.quantity }}) - NT$ {{ item.price.toLocaleString() }}
            </li>
          </ul>
        </div>
        <div class="modal-actions">
          <button type="button" class="admin-btn cancel-btn" @click="closeDetailModal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { orders } from '../../data/orders.js'; // Import centralized orders data

const showDetailModal = ref(false);
const selectedOrder = ref(null);

const updateStatus = (order) => {
  console.log(`Order ${order.id} status updated to ${order.status}`);
  // In a real application, you would make an API call here
};

const viewOrder = (order) => {
  selectedOrder.value = order;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedOrder.value = null;
};
</script>

<style scoped>
.order-details p {
  margin: 8px 0;
  line-height: 1.6;
  display: flex; /* Align items vertically */
  align-items: center; /* Center badge vertically with text */
  gap: 10px;
}
.order-details h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
.order-items-list {
  list-style-type: none;
  padding-left: 0;
}
.order-items-list li {
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 5px;
}
</style>