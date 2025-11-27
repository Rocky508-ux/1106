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
      isSidebarOpen: false,
      recentOrders: [
        { id: 'ORD001', customer: '張三', date: '2024-11-25', amount: 1250, status: '已出貨' },
        { id: 'ORD002', customer: '李四', date: '2024-11-25', amount: 800, status: '處理中' },
        { id: 'ORD003', customer: '王五', date: '2024-11-24', amount: 3200, status: '已送達' },
        { id: 'ORD004', customer: '趙六', date: '2024-11-24', amount: 500, status: '已取消' },
      ]
    };
  },
  computed: {
    currentTitle() {
      switch (this.activeSection) {
        case 'dashboard': return '後台總覽';
        case 'products': return '商品管理';
        case 'orders': return '訂單管理';
        case 'users': return '用戶管理';
        default: return '後台管理';
      }
    },
    activeView() {
      switch (this.activeSection) {
        case 'products': return 'ProductManagement';
        case 'orders': return 'OrderManagement';
        case 'users': return 'UserManagement';
        default: return null;
      }
    }
  },
  methods: {
    showSection(section) {
      this.activeSection = section;
       if (window.innerWidth <= 768) {
        this.isSidebarOpen = false;
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    logout() {
      console.log('Logout clicked');
      this.$router.push('/admin/login');
    }
  }
};
</script>

<template>
  <div class="admin-dashboard">
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="toggleSidebar"></div>
    <aside class="sidebar" :class="{ 'is-open': isSidebarOpen }">
      <div>
        <div class="sidebar-header">
          <h2 class="sidebar-title">管理選單</h2>
           <button class="close-btn" @click="toggleSidebar">&times;</button>
        </div>
        <nav class="sidebar-nav">
          <a href="#" @click.prevent="showSection('dashboard')" :class="{ active: activeSection === 'dashboard' }">後台總覽</a>
          <a href="#" @click.prevent="showSection('products')" :class="{ active: activeSection === 'products' }">商品管理</a>
          <a href="#" @click.prevent="showSection('orders')" :class="{ active: activeSection === 'orders' }">訂單管理</a>
          <a href="#" @click.prevent="showSection('users')" :class="{ active: activeSection === 'users' }">用戶管理</a>
        </nav>
      </div>
      <button @click="logout" class="logout-btn">登出</button>
    </aside>

    <main class="main-content">
      <header class="main-header">
         <button class="hamburger-btn" @click="toggleSidebar">&#9776;</button>
        <h1>{{ currentTitle }}</h1>
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
          <div class="recent-orders admin-card">
            <h2>最近訂單</h2>
            <div class="admin-table-wrapper">
              <table class="admin-table">
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
                    <td>
                      <span :class="['status-badge', order.status]">{{ order.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Use dynamic component to render the selected view -->
        <keep-alive>
            <component :is="activeView" :key="activeSection" v-if="activeView" />
        </keep-alive>
      </div>
    </main>
  </div>
</template>
      
<style scoped>
:root {
  --sidebar-width: 250px;
}

.admin-dashboard {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f4f6f9;
}
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
}
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.sidebar-title { margin: 0; font-size: 1.5em; }
.close-btn { 
  display: none; 
  font-size: 2rem; 
  background: none; 
  border: none; 
  color: #ecf0f1; 
  cursor: pointer;
}
.sidebar-nav a {
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: background-color 0.2s, color 0.2s;
}
.sidebar-nav a:hover { background-color: #34495e; color: #fff; }
.sidebar-nav a.active { background-color: #1abc9c; color: #fff; font-weight: 500; }
.logout-btn {
  width: 100%;
  padding: 12px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.2s;
}
.logout-btn:hover { background-color: #c0392b; }
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.main-header {
  background: #fff;
  padding: 0 20px;
  height: 60px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: 10;
  display: none; /* Hidden by default on desktop */
}
.hamburger-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 15px;
}
.main-header h1 { margin: 0; font-size: 1.5rem; }
.content-area {
  padding: 30px;
  overflow-y: auto;
  flex-grow: 1;
}
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}
.card {
  background-color: #fff;
  padding: 25px;
  border-radius: var(--admin-border-radius);
  box-shadow: var(--admin-card-shadow);
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
  color: var(--admin-dark-color);
}
.recent-orders.admin-card {
  padding: 25px;
}
.recent-orders h2 {
  margin-top: 0;
  margin-bottom: 20px;
}
.status-badge.處理中 { background-color: var(--admin-warning-color); }
.status-badge.已出貨 { background-color: var(--admin-primary-color); }
.status-badge.已送達 { background-color: var(--admin-success-color); }
.status-badge.已取消 { background-color: var(--admin-danger-color); }

/* Responsive (RWD) Styles */
.sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
  .sidebar.is-open ~ .main-content .sidebar-overlay {
    display: block;
  }
  .close-btn, .main-header {
    display: flex;
  }
}
</style>
