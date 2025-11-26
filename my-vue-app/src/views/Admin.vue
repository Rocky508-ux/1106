<script>
import ProductManagement from '../components/admin/ProductManagement.vue';
import OrderManagement from '../components/admin/OrderManagement.vue';
import UserManagement from '../components/admin/UserManagement.vue';

export default {
  name: 'Admin',
  components: {
    ProductManagement,
    OrderManagement,
    UserManagement
  },
  data() {
    return {
      activeSection: 'dashboard',
      isSidebarOpen: false, // State to control sidebar on mobile
      recentOrders: [
        { id: 'ORD001', customer: '張三', date: '2024-11-25', amount: 1250, status: '已出貨' },
        { id: 'ORD002', customer: '李四', date: '2024-11-25', amount: 800, status: '處理中' },
        { id: 'ORD003', customer: '王五', date: '2024-11-24', amount: 3200, status: '已送達' },
        { id: 'ORD004', customer: '趙六', date: '2024-11-24', amount: 500, status: '已取消' },
      ]
    };
  },
  methods: {
    showSection(section) {
      this.activeSection = section;
      // Close sidebar on navigation in mobile view
      if (window.innerWidth <= 768) {
        this.isSidebarOpen = false;
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    logout() {
      localStorage.removeItem('isAdminAuthenticated');
      this.$router.push('/admin/login');
    }
  }
};
</script>

<template>
  <div class="admin-dashboard">
    <!-- Overlay for mobile sidebar -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="toggleSidebar"></div>

    <aside class="sidebar" :class="{ 'is-open': isSidebarOpen }">
      <div>
        <div class="sidebar-header">
          <h2 class="sidebar-title">管理選單</h2>
          <button class="close-btn" @click="toggleSidebar">&times;</button>
        </div>
        <nav class="sidebar-nav">
          <a href="#" @click.prevent="showSection('dashboard')" :class="{ active: activeSection === 'dashboard' }">後台總覽</a>
          <a href="#" @click.prevent="showSection('orders')" :class="{ active: activeSection === 'orders' }">訂單管理</a>
          <a href="#" @click.prevent="showSection('products')" :class="{ active: activeSection === 'products' }">商品管理</a>
          <a href="#" @click.prevent="showSection('users')" :class="{ active: activeSection === 'users' }">用戶管理</a>
        </nav>
      </div>
      <button @click="logout" class="logout-btn">登出</button>
    </aside>

    <main class="main-content">
            <header class="main-header">
              <button class="hamburger-btn" @click="toggleSidebar">&#9776;</button>
              <h1>後台管理</h1>
            </header>
            <div class="content-area">
              <div v-if="activeSection === 'dashboard'">
                <div class="stats-cards">
                  <div class="card">
                    <h3>總銷售額</h3>
                    <p>NT$ 1,234,567</p>
                  </div>
                  <div class="card">
                    <h3>總訂單數</h3>
                    <p>5,432</p>
                  </div>
                  <div class="card">
                    <h3>新用戶</h3>
                    <p>123</p>
                  </div>
                </div>
                <div class="recent-orders">
                  <h2>最近訂單</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>訂單編號</th>
                        <th>顧客</th>
                        <th>日期</th>
                        <th>總金額</th>
                        <th>狀態</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="order in recentOrders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>{{ order.customer }}</td>
                        <td>{{ order.date }}</td>
                        <td>NT$ {{ order.amount.toLocaleString() }}</td>
                        <td><span :class="['status', order.status.toLowerCase().replace(' ', '-')]">{{ order.status }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <ProductManagement v-if="activeSection === 'products'" />
              <OrderManagement v-if="activeSection === 'orders'" />
              <UserManagement v-if="activeSection === 'users'" />
            </div>
          </main>
        </div>
      </template>
      
      <style scoped>
      .admin-dashboard {
        display: flex;
        position: relative;
        min-height: 100vh;
      }
      
      /* --- Sidebar, Header, etc. (existing styles) --- */
      .sidebar {
        width: 240px;
        flex-shrink: 0;
        background-color: #2c3e50;
        color: #ecf0f1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.3s ease-in-out;
      }
      .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .sidebar-title { margin: 0; font-size: 1.5em; }
      .close-btn { display: none; font-size: 2rem; background: none; border: none; color: #ecf0f1; cursor: pointer; }
      .sidebar-nav a {
        display: block; color: #bdc3c7; text-decoration: none;
        padding: 12px 15px; border-radius: 4px; margin-bottom: 10px;
        transition: background-color 0.2s, color 0.2s;
      }
      .sidebar-nav a:hover { background-color: #34495e; color: #fff; }
      .sidebar-nav a.active { background-color: #1abc9c; color: #fff; }
      .logout-btn {
        width: 100%; padding: 12px; background-color: #e74c3c; color: #fff;
        border: none; border-radius: 4px; cursor: pointer;
        font-size: 16px; margin-top: 20px; transition: background-color 0.2s;
      }
      .logout-btn:hover { background-color: #c0392b; }
      .sidebar-overlay { display: none; }
      .main-content { flex-grow: 1; background-color: #f4f6f9; display: flex; flex-direction: column; }
      .main-header {
        display: none; background: #fff; padding: 0 20px; height: 60px;
        align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;
      }
      .hamburger-btn { font-size: 1.5rem; background: none; border: none; cursor: pointer; margin-right: 15px; }
      .main-header h1 { margin: 0; font-size: 1.5rem; }
      .content-area {
        padding: 30px;
        overflow-x: auto;
      }
      
      
      /* --- Dashboard Specific Styles (Restored) --- */
      .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }      
      .card {
        background-color: #fff;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        text-align: center;
      }
      .card h3 {
        margin: 0 0 10px;
        font-size: 1.1em;
        color: #555;
      }
      .card p {
        margin: 0;
        font-size: 2em;
        font-weight: 600;
        color: #2c3e50;
      }
      
      .recent-orders h2 {
        font-size: 1.5em;
        margin-bottom: 15px;
        color: #333;
      }
      .recent-orders table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      }
      .recent-orders th, .recent-orders td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      .recent-orders thead th {
        background-color: #f7f9fc;
        font-weight: 600;
      }
      .recent-orders tbody tr:hover {
        background-color: #f1f1f1;
      }
      .status {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.85em;
        color: #fff;
        text-align: center;
        white-space: nowrap;
      }
      .status.已出貨 { background-color: #3498db; }
      .status.處理中 { background-color: #f39c12; }
      .status.已送達 { background-color: #2ecc71; }
      .status.已取消 { background-color: #e74c3c; }
      
      
      /* --- RWD Media Query --- */
      @media (max-width: 768px) {
        .sidebar {
          position: fixed; top: 0; left: 0; height: 100%;
          transform: translateX(-100%); z-index: 1001; width: 250px;
        }
        .sidebar.is-open { transform: translateX(0); }
        .sidebar-overlay {
          display: block; position: fixed; top: 0; left: 0;
          width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .close-btn, .main-header { display: block; }
        .main-header { display: flex; }
        .content-area { padding: 20px; }
        .stats-cards { grid-template-columns: 1fr; } /* Stack cards on mobile */
      }
      </style>
      