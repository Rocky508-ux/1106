import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ShoppingCart from './components/ShoppingCart.vue'

const app = createApp(App);

app.component('shopping-cart', ShoppingCart);

app.mount('#app');
