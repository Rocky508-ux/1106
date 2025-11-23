<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  orders: Array,
});

function getStatusClass(status) {
  const map = {
    '已完成': 'status-completed',
    '配送中': 'status-shipping',
    '待付款': 'status-pending'
  };
  return map[status] || '';
}
</script>

<template>
  <div class="content-section">
    <h2 class="section-title">我的訂單</h2>
    <div class="order-list">
      <div class="order-item" v-for="order in orders" :key="order.id">
        <div class="order-header">
          <div>
            <h3>訂單編號: {{ order.id }}</h3>
            <p class="order-date">{{ order.date }}</p>
          </div>
          <span class="order-status" :class="getStatusClass(order.status)">
            {{ order.status }}
          </span>
        </div>
        <div class="order-total">
          總金額: <strong>NT$ {{ order.totalAmount.toLocaleString() }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-section {
  padding: 20px;
  text-align: center;
}

.section-title {
  color: #333;
  margin-bottom: 15px;
}

.order-list {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

.order-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-header h3 {
  font-size: 1.1em;
  color: #333;
  margin: 0;
}

.order-date {
  font-size: 0.9em;
  color: #777;
}

.order-status {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.85em;
  font-weight: bold;
  color: white;
}

.status-completed {
  background-color: #4CAF50; /* Green */
}

.status-shipping {
  background-color: #2196F3; /* Blue */
}

.status-pending {
  background-color: #FFC107; /* Amber */
  color: #333;
}

.order-total {
  text-align: right;
  font-size: 1em;
  color: #555;
  margin-top: 10px;
}

.order-total strong {
  color: #e44d26;
  font-size: 1.1em;
}
</style>
