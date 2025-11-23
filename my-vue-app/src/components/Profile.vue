<script setup>
import { inject } from 'vue';

const isLoggedIn = inject('isLoggedIn');
</script>

<template>
  <div class="content-section">
    <h2 class="section-title">會員中心</h2>
    <div class="extra-block">
      <h4>會員資訊</h4>
      <p v-if="isLoggedIn">歡迎回來！</p>
      <p v-else>請先登入</p>
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

.extra-block {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h4 {
  color: #555;
  margin-bottom: 10px;
}
</style>
