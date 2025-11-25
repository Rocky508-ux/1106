<script setup>
import { ref } from 'vue';
import apiClient from '../services/api'; // 引入我們剛才建立的 api service

const emit = defineEmits(['login-success']);

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = ''; // 重置錯誤訊息
  try {
    // 向後端 /login 端點發送 POST 請求
    const response = await apiClient.post('/login', {
      email: email.value,
      password: password.value,
    });

    // 假設後端回傳的資料結構是 { token: '...' }
    const token = response.data.token;

    // 登入成功
    console.log('登入成功，取得 Token:', token);
    
    // 將 Token 存到 localStorage
    localStorage.setItem('authToken', token);

    // 發出登入成功事件
    emit('login-success');

  } catch (error) {
    // 處理登入失敗的情況
    console.error('登入失敗:', error);
    if (error.response && error.response.data) {
      // 顯示後端回傳的錯誤訊息
      errorMessage.value = error.response.data.message || '登入失敗，請檢查您的帳號或密碼。';
    } else {
      errorMessage.value = '發生未知錯誤，請稍後再試。';
    }
  }
};
</script>

<template>
  <div class="login-page-container">
    <h2>登入</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">密碼:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登入</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-page-container {
  width: 90%;
  max-width: 400px;
  margin: 50px auto;
  padding: 40px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369f72;
}

.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
}
</style>
