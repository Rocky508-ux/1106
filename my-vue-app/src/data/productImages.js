import { ref } from 'vue';

// 這裡模擬資料庫裡的圖片資料表
export const productImages = ref([
  // 鋼彈的多張圖片 (第一張 is_main: true 是主圖)
  { id: 1, product_id: 'gundam-rx-78-2', image_path: '/image/羅莉1.jpg', is_main: true },
  { id: 101, product_id: 'gundam-rx-78-2', image_path: '/image/羅莉.jpg', is_main: false }, // 側面
  { id: 102, product_id: 'gundam-rx-78-2', image_path: '/image/naruto_figure.jpg', is_main: false }, // 背面 (暫用其他圖代替)
  
  // 布羅利的多張圖片
  { id: 10, product_id: 'dbz-broly', image_path: '/image/image_fe8cff.jpg', is_main: true },
  { id: 110, product_id: 'dbz-broly', image_path: '/image/野獸.webp', is_main: false }, // 側面 (暫用其他圖代替)
  
  // 其他商品維持單張
  { id: 2, product_id: 'one-piece-luffy', image_path: '/image/羅莉.jpg', is_main: true },
  { id: 3, product_id: 'naruto-uzumaki', image_path: '/image/naruto_figure.jpg', is_main: true },
  { id: 4, product_id: 'pokemon-pikachu', image_path: '/image/pokemon_pika.jpg', is_main: true },
  { id: 5, product_id: 'demon-slayer-tanjiro', image_path: '/image/kimetsu_tanjiro.jpg', is_main: true },
  { id: 6, product_id: 'aot-eren', image_path: '/image/aot_eren.jpg', is_main: true },
  { id: 7, product_id: 'star-rail-yue', image_path: '/image/star_rail_yue.jpg', is_main: true },
  { id: 8, product_id: 'batman-prime1', image_path: '/image/batman.jpg', is_main: true },
  { id: 9, product_id: 'dbz-goku', image_path: '/image/野獸.webp', is_main: true }
]);