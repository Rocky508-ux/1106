<template>
  <div class="order-management">
    <h1>訂單管理</h1>
    <table>
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
            <select v-model="order.status" @change="updateStatus(order)">
              <option value="處理中">處理中</option>
              <option value="已出貨">已出貨</option>
              <option value="已送達">已送達</option>
              <option value="已取消">已取消</option>
            </select>
          </td>
          <td class="actions">
            <button class="view-btn" @click="viewOrder(order)">查看詳情</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Order Detail Modal -->
    <div v-if="showDetailModal" class="modal-overlay">
      <div class="modal-content">
        <h2>訂單詳情 #{{ selectedOrder.id }}</h2>
        <p><strong>顧客:</strong> {{ selectedOrder.customer }}</p>
        <p><strong>日期:</strong> {{ selectedOrder.date }}</p>
        <p><strong>總金額:</strong> NT$ {{ selectedOrder.amount.toLocaleString() }}</p>
        <p><strong>狀態:</strong> {{ selectedOrder.status }}</p>
        <h3>訂購商品:</h3>
        <ul>
          <li v-for="item in selectedOrder.items" :key="item.productId">
            {{ item.productName }} (x{{ item.quantity }}) - NT$ {{ item.price.toLocaleString() }}
          </li>
        </ul>
        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="closeDetailModal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

const orders = ref([
  { 
    id: 'ORD001', 
    userId: 'user-1',
    customer: '張三', 
    date: '2024-11-25', 
    amount: 5400, 
    status: '已出貨',
    items: [
      { productId: 'gundam-rx-78-2', productName: '鋼彈 RX-78-2', quantity: 1, price: 3200 },
      { productId: 'one-piece-luffy', productName: 'ONE PIECE 魯夫', quantity: 1, price: 2200 },
    ]
  },
  { 
    id: 'ORD002', 
    userId: 'user-2',
    customer: '李四', 
    date: '2024-11-25', 
    amount: 2800, 
    status: '處理中',
    items: [
      { productId: 'naruto-uzumaki', productName: '火影忍者 鳴人', quantity: 1, price: 2800 },
    ]
  },
  { 
    id: 'ORD003', 
    userId: 'user-1',
    customer: '張三', 
    date: '2024-11-24', 
    amount: 4400, 
    status: '已送達',
    items: [
      { productId: 'pokemon-pikachu', productName: '寶可夢 皮卡丘', quantity: 1, price: 2000 },
      { productId: 'demon-slayer-tanjiro', productName: '鬼滅之刃 炭治郎', quantity: 1, price: 2400 },
    ]
  },
  { 
    id: 'ORD004', 
    userId: 'user-3',
    customer: '王五', 
    date: '2024-11-24', 
    amount: 2800, 
    status: '已取消',
    items: [
      { productId: 'aot-eren', productName: '進擊的巨人 艾連', quantity: 1, price: 2800 },
    ]
  },
]);

export { orders };

export default {
  name: 'OrderManagement',
  setup() {
    return { orders };
  },
  data() {
    return {
      showDetailModal: false,
      selectedOrder: null,
    };
  },
  methods: {
    updateStatus(order) {
      console.log(`Updating order ${order.id} status to ${order.status}`);
      // In a real application, you would make an API call here to update the order status
    },
    viewOrder(order) {
      this.selectedOrder = order;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
      this.selectedOrder = null;
    }
  }
};
</script>

<style scoped>
.order-management {
  padding: 20px;
  overflow-x: auto; /* Allow horizontal scrolling if table is too wide */
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* Ensure a minimum width for the table */
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
th:nth-child(1), td:nth-child(1) { min-width: 120px; } /* Order ID */
th:nth-child(2), td:nth-child(2) { min-width: 120px; } /* Customer */
th:nth-child(3), td:nth-child(3) { min-width: 120px; } /* Date */
th:nth-child(4), td:nth-child(4) { min-width: 120px; } /* Amount */
th:nth-child(5), td:nth-child(5) { min-width: 120px; } /* Status */
th:nth-child(6), td:nth-child(6) { min-width: 150px; } /* Actions */


.actions button {
  padding: 6px 12px; /* Adjusted padding */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}
.view-btn {
  background-color: #9b59b6;
  color: white;
}

/* Modal styles - copied from ProductManagement for consistency */
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

.modal-actions {
  text-align: right;
  margin-top: 20px;
}

.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  background-color: #95a5a6;
  color: white;
}
</style>
