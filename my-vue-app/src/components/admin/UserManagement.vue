<template>
  <div class="admin-card">
    <div class="header">
      <h1>用戶管理</h1>
      <button class="admin-btn add-btn" @click="openAddModal">新增用戶</button>
    </div>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <colgroup>
          <col style="width: 15%;" />
          <col style="width: 15%;" />
          <col style="width: 25%;" />
          <col style="width: 15%;" />
          <col style="width: 15%;" />
          <col style="width: 15%;" />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>名稱</th>
            <th>Email</th>
            <th>註冊日期</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td data-label="ID">{{ user.id }}</td>
            <td data-label="名稱">{{ user.name }}</td>
            <td data-label="Email">{{ user.email }}</td>
            <td data-label="註冊日期">{{ user.registeredDate }}</td>
            <td data-label="狀態">
              <span :class="['status-badge', user.status]">{{ user.status === 'active' ? '啟用中' : '已停用' }}</span>
            </td>
            <td data-label="操作" class="actions">
              <button class="admin-btn history-btn" @click="viewPurchaseHistory(user)">紀錄</button>
              <button class="admin-btn edit-btn" @click="openEditModal(user)">編輯</button>
              <button :class="['admin-btn', user.status === 'active' ? 'disable-btn' : 'enable-btn']" @click="toggleStatus(user)">
                {{ user.status === 'active' ? '停用' : '啟用' }}
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">目前沒有用戶</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditMode ? '編輯用戶' : '新增用戶' }}</h2>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label for="userName">名稱:</label>
            <input type="text" id="userName" v-model="editedUser.name" required />
          </div>
          <div class="form-group">
            <label for="userEmail">Email:</label>
            <input type="email" id="userEmail" v-model="editedUser.email" required />
          </div>
          <div class="modal-actions">
            <button type="button" class="admin-btn cancel-btn" @click="closeModal">取消</button>
            <button type="submit" class="admin-btn save-btn">儲存</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Purchase History Modal -->
    <div v-if="showHistoryModal" class="modal-overlay" @click.self="closeHistoryModal">
      <div class="modal-content" style="max-width: 800px;">
        <h2>{{ selectedUser.name }} 的購買紀錄</h2>
        <div v-if="userOrders.length" class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>訂單ID</th>
                <th>日期</th>
                <th>總金額</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in userOrders" :key="order.id">
                <td data-label="訂單ID">{{ order.id }}</td>
                <td data-label="日期">{{ order.date }}</td>
                <td data-label="總金額">NT$ {{ order.amount.toLocaleString() }}</td>
                <td data-label="狀態">{{ order.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else>該用戶沒有購買紀錄。</p>
        <div class="modal-actions">
          <button type="button" class="admin-btn cancel-btn" @click="closeHistoryModal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { orders } from '../../data/orders.js';
import { ref, computed, reactive } from 'vue';

const users = ref([
  { id: 'user-1', name: '張三', email: 'chang3@example.com', registeredDate: '2024-10-01', status: 'active' },
  { id: 'user-2', name: '李四', email: 'li4@example.com', registeredDate: '2024-10-15', status: 'active' },
  { id: 'user-3', name: '王五', email: 'wang5@example.com', registeredDate: '2024-11-01', status: 'disabled' },
]);

const showModal = ref(false);
const isEditMode = ref(false);

// Use `reactive` for the form-bound object
const editedUser = reactive({
  id: null, name: '', email: '', registeredDate: '', status: ''
});

const showHistoryModal = ref(false);
const selectedUser = ref(null);

const userOrders = computed(() => {
  if (!selectedUser.value) return [];
  return orders.value.filter(order => order.userId === selectedUser.value.id);
});

const generateUniqueId = () => 'user-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

const openAddModal = () => {
  isEditMode.value = false;
  // Reset properties of the reactive object
  Object.assign(editedUser, {
    id: null,
    name: '',
    email: '',
    registeredDate: new Date().toISOString().slice(0, 10),
    status: 'active'
  });
  showModal.value = true;
};

const openEditModal = (user) => {
  isEditMode.value = true;
  // Copy properties into the reactive object
  Object.assign(editedUser, user);
  showModal.value = true;
};

const saveUser = () => {
  if (isEditMode.value) {
    const index = users.value.findIndex(u => u.id === editedUser.id);
    if (index !== -1) {
      // Use Object.assign to update the existing reactive object in the array
      Object.assign(users.value[index], editedUser);
    }
  } else {
    users.value.push({
      ...editedUser,
      id: generateUniqueId()
    });
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
};

const toggleStatus = (user) => {
  user.status = user.status === 'active' ? 'disabled' : 'active';
};

const viewPurchaseHistory = (user) => {
  selectedUser.value = user;
  showHistoryModal.value = true;
};

const closeHistoryModal = () => {
  showHistoryModal.value = false;
  selectedUser.value = null;
};
</script>

<style scoped>
@import '../../assets/admin-table.css';

/* Styles for the purchase history modal table */
.modal-content .admin-table th,
.modal-content .admin-table td {
  padding: 10px 12px;
}
[data-label="Email"] {
  word-break: break-all;
}
</style>

