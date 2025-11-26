import { ref } from 'vue';

export const products = ref([
  { 
    id: 'gundam-rx-78-2', 
    name: '鋼彈 RX-78-2', 
    Price: 3200, 
    category: 'gundam', 
    imageUrl: '/image/羅莉1.jpg',
    tag: 'new',
    series: '機動戰士系列',
    description: '地球聯邦軍的泛用量產型機動戰士，V作戰的核心。',
    type: 'model',
    stock: 15 
  },
  { 
    id: 'one-piece-luffy',
    name: 'ONE PIECE 魯夫', 
    Price: 2200, 
    category: 'onepiece', 
    tag: 'new',
    series: '海賊王系列',
    description: '草帽海賊團的船長，夢想是找到傳說中的大秘寶「ONE PIECE」。',
    type: 'figure',
    stock: 25
  },
  { 
    id: 'naruto-uzumaki',
    name: '火影忍者 鳴人', 
    Price: 2800, 
    category: 'naruto', 
    imageUrl: '/image/naruto_figure.jpg', 
    tag: '現貨', 
    series: '疾風傳系列',
    description: '木葉忍者村的英雄，體內封印著九尾妖狐。',
    type: 'figure',
    stock: 10
  },
  { 
    id: 'pokemon-pikachu',
    name: '寶可夢 皮卡丘', 
    Price: 2000, 
    category: 'pokemon', 
    imageUrl: '/image/pokemon_pika.jpg', 
    series: '精靈寶可夢',
    description: '小智最親密的夥伴，擅長使用十萬伏特。',
    type: 'prize',
    stock: 30
  },
  { 
    id: 'demon-slayer-tanjiro',
    name: '鬼滅之刃 炭治郎', 
    Price: 2400, 
    category: 'other', 
    imageUrl: '/image/kimetsu_tanjiro.jpg', 
    tag: '現貨', 
    series: '柱系列',
    description: '為了讓變成鬼的妹妹復原而加入鬼殺隊的少年。',
    type: 'figure',
    stock: 12
  },
  { 
    id: 'aot-eren',
    name: '進擊的巨人 艾連', 
    Price: 2800, 
    category: 'other', 
    imageUrl: '/image/aot_eren.jpg', 
    tag: '預購', 
    series: '最終季',
    description: '追求自由的少年，擁有變身為進擊的巨人的能力。',
    type: 'figure',
    stock: 5
  },
  { 
    id: 'star-rail-yue',
    name: '崩壞星穹鐵道 歌月君', 
    Price: 16500, 
    category: 'other', 
    imageUrl: '/image/star_rail_yue.jpg', 
    tag: '現貨', 
    series: 'Imagination 歌月君',
    description: '仙舟「羅浮」的持明族，丹鼎司的醫士。',
    type: 'figure',
    stock: 8
  },
  { 
    id: 'batman-prime1',
    name: '蝙蝠俠 (Batman)', 
    Price: 4500, 
    category: 'other', 
    imageUrl: '/image/batman.jpg', 
    tag: '預購', 
    series: 'Prime 1 Studio',
    description: '高譚市的黑暗騎士，以恐懼打擊罪犯。',
    type: 'figure',
    stock: 7
  },
  { 
    id: 'dbz-goku',
    name: '七龍珠 悟空', 
    Price: 3500, 
    category: 'dbz', 
    imageUrl: '/image/野獸.webp', 
    series: '超級賽亞人系列',
    description: '來自《七龍珠》的主角，傳說中的超級賽亞人。',
    type: 'blindbox',
    stock: 20
  }
]);
