<template>
  <div class="admin-login-container">
    <div class="login-box">
      <h2>管理者登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">帳號</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="input-group">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" class="login-button">登入</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleLogin() {
      // For demonstration purposes, we'll use a simple hardcoded login.
      // In a real application, this should be a call to an authentication API.
      if (this.username === 'admin' && this.password === 'password') {
        // Simulate a successful login by setting a flag in localStorage.
        localStorage.setItem('isAdminAuthenticated', 'true');
        this.$router.push('/admin');
      } else {
        this.error = '帳號或密碼錯誤';
      }
    }
  }
};
</script>

<style scoped>
.admin-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f9;
}

.login-box {
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2980b9;
}
</style>
