<template>
  <section class="content-section">
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
  </section>
</template>

<script setup>
defineProps({
  orders: {
    type: Array,
    required: true
  }
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
