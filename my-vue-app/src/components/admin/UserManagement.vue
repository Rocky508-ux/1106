<template>
  <div class="admin-card">
    <div class="header">
      <h1>用戶管理</h1>
      <button class="add-btn admin-btn" @click="openAddModal">新增用戶</button>
    </div>
    <div class="admin-table-wrapper">
      <table class="admin-table">
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
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.registeredDate }}</td>
            <td>
              <span :class="['status-badge', user.status]">{{ user.status === 'active' ? '啟用中' : '已停用' }}</span>
            </td>
            <td class="actions">
              <button class="history-btn admin-btn" @click="viewPurchaseHistory(user)">紀錄</button>
              <button class="edit-btn admin-btn" @click="openEditModal(user)">編輯</button>
              <button :class="['admin-btn', user.status === 'active' ? 'disable-btn' : 'enable-btn']" @click="toggleStatus(user)">
                {{ user.status === 'active' ? '停用' : '啟用' }}
              </button>
              <button class="delete-btn admin-btn" @click="deleteUser(user.id)">刪除</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">目前沒有用戶</td>
          </tr>
        </tbody>
      </table>
    </div>

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
          <div class="form-group">
            <label for="registeredDate">註冊日期:</label>
            <input type="date" id="registeredDate" v-model="editedUser.registeredDate" required />
          </div>
          <div class="modal-actions">
            <button type="button" class="admin-btn cancel-btn" @click="closeModal">取消</button>
            <button type="submit" class="admin-btn save-btn">儲存</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showHistoryModal" class="modal-overlay" @click.self="closeHistoryModal">
      <div class="modal-content" style="max-width: 800px;">
        <h2>{{ selectedUser?.name }} 的購買紀錄</h2>
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
                <td>{{ order.id }}</td>
                <td>{{ order.date }}</td>
                <td>NT$ {{ order.amount.toLocaleString() }}</td>
                <td>
                  <span :class="['status-badge', order.status]">{{ order.status }}</span>
                </td>
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
import { ref, reactive, computed } from 'vue';
import { users } from '../../data/users.js'; 
import { orders } from '../../data/orders.js'; 

const showModal = ref(false);
const isEditMode = ref(false);

const editedUser = reactive({
  id: null, name: '', email: '', registeredDate: '', status: 'active'
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
  Object.assign(editedUser, user);
  showModal.value = true;
};

const saveUser = () => {
  if (isEditMode.value) {
    const index = users.value.findIndex(u => u.id === editedUser.id);
    if (index !== -1) {
      Object.assign(users.value[index], editedUser);
    }
  } else {
    users.value.push({
      ...editedUser,
      id: generateUniqueId(),
    });
  }
  closeModal();
};

const deleteUser = (userId) => {
  if (confirm('確定要刪除此用戶嗎？此操作無法復原。')) {
    const index = users.value.findIndex(u => u.id === userId);
    if (index !== -1) {
      users.value.splice(index, 1);
    }
  }
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
/* Removed unused styles */
</style>