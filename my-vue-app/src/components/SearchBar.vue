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
  justify-content: center;
  padding: 10px;
}
.search-bar input {
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.search-bar button {
  padding: 10px 15px;
  margin-left: 8px;
  border: none;
  background-color: #333;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.search-bar button:hover {
  background-color: #555;
}
</style>
