import { ref } from 'vue';

export const productImages = ref([
  { id: 1, product_id: 'gundam-rx-78-2', image_path: '/image/羅莉1.jpg', is_main: true },
  /* ★★★ 補上這一行 (如果沒有魯夫的圖，暫時先用別的頂替) ★★★ */
  { id: 2, product_id: 'one-piece-luffy', image_path: '/image/羅莉.jpg', is_main: true },
  
  { id: 3, product_id: 'naruto-uzumaki', image_path: '/image/naruto_figure.jpg', is_main: true },
  { id: 4, product_id: 'pokemon-pikachu', image_path: '/image/pokemon_pika.jpg', is_main: true },
  { id: 5, product_id: 'demon-slayer-tanjiro', image_path: '/image/kimetsu_tanjiro.jpg', is_main: true },
  { id: 6, product_id: 'aot-eren', image_path: '/image/aot_eren.jpg', is_main: true },
  { id: 7, product_id: 'star-rail-yue', image_path: '/image/star_rail_yue.jpg', is_main: true },
  { id: 8, product_id: 'batman-prime1', image_path: '/image/batman.jpg', is_main: true },
  { id: 9, product_id: 'dbz-goku', image_path: '/image/野獸.webp', is_main: true }
]);