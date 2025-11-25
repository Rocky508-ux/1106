import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 導入 router

const app = createApp(App);

app.use(router); // 讓應用程式使用 router

app.mount('#app');
