import { ref } from 'vue';

export const users = ref([
  { id: 'user-1', name: '張三', email: 'chang3@example.com', registeredDate: '2024-10-01', status: 'active' },
  { id: 'user-2', name: '李四', email: 'li4@example.com', registeredDate: '2024-10-15', status: 'active' },
  { id: 'user-3', name: '王五', email: 'wang5@example.com', registeredDate: '2024-11-01', status: 'disabled' },
]);
