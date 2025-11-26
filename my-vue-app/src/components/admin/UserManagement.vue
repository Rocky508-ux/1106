<template>
  <div class="content-wrapper">
    <div class="user-management">
      <div class="header">
        <h1>用戶管理</h1>
        <button class="add-btn" @click="openAddModal">新增用戶</button>
      </div>
      <table>
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
              <span :class="['status', user.status]">{{ user.status === 'active' ? '啟用中' : '已停用' }}</span>
            </td>
            <td class="actions">
              <button class="history-btn" @click="viewPurchaseHistory(user)">購買紀錄</button>
              <button class="edit-btn" @click="openEditModal(user)">編輯</button>
              <button :class="user.status === 'active' ? 'disable-btn' : 'enable-btn'" @click="toggleStatus(user)">
                {{ user.status === 'active' ? '停用' : '啟用' }}
              </button>
              <button class="delete-btn" @click="deleteUser(user.id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- User Add/Edit Modal -->
      <div v-if="showModal" class="modal-overlay">
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
              <button type="submit" class="save-btn">儲存</button>
              <button type="button" class="cancel-btn" @click="closeModal">取消</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Purchase History Modal -->
      <div v-if="showHistoryModal" class="modal-overlay">
        <div class="modal-content">
          <h2>{{ selectedUser.name }} 的購買紀錄</h2>
          <div v-if="userOrders.length">
            <table>
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
                  <td>{{ order.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else>該用戶沒有購買紀錄。</p>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeHistoryModal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orders } from './OrderManagement.vue';
import { ref, computed } from 'vue';

export default {
  name: 'UserManagement',
  setup() {
    const users = ref([
      { id: 'user-1', name: '張三', email: 'chang3@example.com', registeredDate: '2024-10-01', status: 'active' },
      { id: 'user-2', name: '李四', email: 'li4@example.com', registeredDate: '2024-10-15', status: 'active' },
      { id: 'user-3', name: '王五', email: 'wang5@example.com', registeredDate: '2024-11-01', status: 'disabled' },
    ]);

    const showModal = ref(false);
    const isEditMode = ref(false);
    const editedUser = ref({});
    
    const showHistoryModal = ref(false);
    const selectedUser = ref(null);

    const userOrders = computed(() => {
      if (!selectedUser.value) return [];
      return orders.value.filter(order => order.userId === selectedUser.value.id);
    });

    const generateUniqueId = () => 'user-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    
    const openAddModal = () => {
      isEditMode.value = false;
      editedUser.value = { id: null, name: '', email: '', registeredDate: new Date().toISOString().slice(0, 10), status: 'active' };
      showModal.value = true;
    };

    const openEditModal = (user) => {
      isEditMode.value = true;
      editedUser.value = { ...user };
      showModal.value = true;
    };

    const saveUser = () => {
      if (isEditMode.value) {
        const index = users.value.findIndex(u => u.id === editedUser.value.id);
        if (index !== -1) users.value[index] = { ...editedUser.value };
      } else {
        editedUser.value.id = generateUniqueId();
        users.value.push({ ...editedUser.value });
      }
      closeModal();
    };

    const deleteUser = (userId) => {
      if (confirm('確定要刪除此用戶嗎？此操作無法復原。')) {
        const index = users.value.findIndex(u => u.id === userId);
        if (index !== -1) users.value.splice(index, 1);
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const toggleStatus = (user) => {
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users.value[index].status = users.value[index].status === 'active' ? 'disabled' : 'active';
      }
    };
    
    const viewPurchaseHistory = (user) => {
      selectedUser.value = user;
      showHistoryModal.value = true;
    };

    const closeHistoryModal = () => {
      showHistoryModal.value = false;
      selectedUser.value = null;
    };

    return { 
      users,
      showModal,
      isEditMode,
      editedUser,
      showHistoryModal,
      selectedUser,
      userOrders,
      openAddModal,
      openEditModal,
      saveUser,
      deleteUser,
      closeModal,
      toggleStatus,
      viewPurchaseHistory,
      closeHistoryModal
    };
  }
};
</script>

<style scoped>
.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.user-management {
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
  min-width: 1000px; /* Minimum table width to prevent excessive cramping */
}

th, td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
  vertical-align: middle;
}

th {
  background-color: #f2f2f2;
  font-weight: 600;
}

/* Column-specific widths */
th:nth-child(1), td:nth-child(1) { min-width: 130px; } /* ID */
th:nth-child(2), td:nth-child(2) { min-width: 100px; } /* Name */
th:nth-child(3), td:nth-child(3) { min-width: 180px; word-break: break-all; } /* Email */
th:nth-child(4), td:nth-child(4) { min-width: 120px; } /* Date */
th:nth-child(5), td:nth-child(5) { min-width: 90px; text-align: center; } /* Status */
th:nth-child(6), td:nth-child(6) { min-width: 380px; } /* Actions - increased width */


.actions {
  display: flex;
  flex-wrap: nowrap; /* Ensure buttons stay in a single line */
  gap: 8px; /* Spacing between buttons */
  align-items: center;
}

.actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* Prevent text inside buttons from wrapping */
}

.edit-btn { background-color: #3498db; color: white; }
.delete-btn { background-color: #e74c3c; color: white; }

.status {
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 0.9em;
  font-weight: 500;
}

.status.active { background-color: #2ecc71; }
.status.disabled { background-color: #95a5a6; }

.history-btn { background-color: #1abc9c; color: white; }
.disable-btn { background-color: #f39c12; color: white; }
.enable-btn { background-color: #27ae60; color: white; }

/* Modal styles remain unchanged, just included for completeness */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.modal-content {
  background-color: #fff; padding: 30px; border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%; max-width: 900px; /* Increased modal width */
  max-height: 80vh; overflow-y: auto;
}
.modal-content h2 {
  margin-top: 0; margin-bottom: 25px; color: #333;
}
.form-group { margin-bottom: 15px; }
.form-group label {
  display: block; margin-bottom: 8px; font-weight: 600; color: #555;
}
.form-group input {
  width: calc(100% - 22px); padding: 10px; border: 1px solid #ccc;
  border-radius: 4px; font-size: 1em;
}
.modal-actions {
  text-align: right; margin-top: 30px;
}
.save-btn, .cancel-btn {
  padding: 10px 20px; border: none; border-radius: 4px;
  cursor: pointer; font-size: 1em; margin-left: 10px;
}
.save-btn { background-color: #3498db; color: white; }
.cancel-btn { background-color: #95a5a6; color: white; }
</style>
