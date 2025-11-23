<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      placeholder="搜尋產品..."
    />
    <button @click="onSearch">搜尋</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
const emit = defineEmits(['search']);

const onInput = () => {
  // Emit search event on every input change for live search
  emit('search', query.value);
};

const onSearch = () => {
  emit('search', query.value);
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px; /* Added gap for spacing between input and button */
}

.search-bar input, .search-bar button {
  padding: 12px 20px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.search-bar input {
  width: 400px; /* You can adjust width as needed */
}

.search-bar button {
  background: #4285F4; /* Match login button color */
  color: white;
  cursor: pointer;
  border-color: #4285F4;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #3367d6; /* Darker blue on hover */
}
</style>
