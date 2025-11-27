import { ref } from 'vue';

// 注意這裡必須是 "export const orders"，不能只有 "const orders"
export const orders = ref([
  { 
    id: 'ORD001', 
    userId: 1, // 對應到 users table id
    customer: '張三', 
    date: '2024-11-25', 
    amount: 5400, 
    status: '已出貨',
    items: [
      { productId: 'gundam-rx-78-2', productName: '鋼彈 RX-78-2', quantity: 1, price: 3200 },
      { productId: 'one-piece-luffy', productName: 'ONE PIECE 魯夫', quantity: 1, price: 2200 },
    ]
  },
  { 
    id: 'ORD002', 
    userId: 2,
    customer: '李四', 
    date: '2024-11-25', 
    amount: 2800, 
    status: '處理中',
    items: [
      { productId: 'naruto-uzumaki', productName: '火影忍者 鳴人', quantity: 1, price: 2800 },
    ]
  },
  { 
    id: 'ORD003', 
    userId: 1,
    customer: '張三', 
    date: '2024-11-24', 
    amount: 4400, 
    status: '已送達',
    items: [
      { productId: 'pokemon-pikachu', productName: '寶可夢 皮卡丘', quantity: 1, price: 2000 },
      { productId: 'demon-slayer-tanjiro', productName: '鬼滅之刃 炭治郎', quantity: 1, price: 2400 },
    ]
  },
  { 
    id: 'ORD004', 
    userId: 3,
    customer: '王五', 
    date: '2024-11-24', 
    amount: 2800, 
    status: '已取消',
    items: [
      { productId: 'aot-eren', productName: '進擊的巨人 艾連', quantity: 1, price: 2800 },
    ]
  },
]);