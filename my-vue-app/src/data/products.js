import { ref } from 'vue';

export const products = ref([
  { 
    id: 'gundam-rx-78-2', 
    name: '鋼彈 RX-78-2', 
    description: '地球聯邦軍的泛用量產型機動士，V作戰的核心。',
    price: 3200, 
    stock: 10,
    status: 'available',
    category_id: 'gundam'
  },
  { 
    id: 'one-piece-luffy',
    name: 'ONE PIECE 魯夫', 
    description: '草帽海賊團的船長，夢想是找到傳說中的大秘寶「ONE PIECE」。',
    price: 2200, 
    stock: 10,
    status: 'available',
    category_id: 'onepiece'
  },
  { 
    id: 'naruto-uzumaki',
    name: '火影忍者 鳴人', 
    description: '木葉忍者村的英雄，體內封印著九尾妖狐。',
    price: 2800, 
    stock: 10,
    status: 'available',
    category_id: 'naruto'
  },
  { 
    id: 'pokemon-pikachu',
    name: '寶可夢 皮卡丘', 
    description: '小智最親密的夥伴，擅長使用十萬伏特。',
    price: 2000, 
    stock: 10,
    status: 'available',
    category_id: 'pokemon'
  },
  { 
    id: 'demon-slayer-tanjiro',
    name: '鬼滅之刃 炭治郎', 
    description: '為了讓變成鬼的妹妹復原而加入鬼殺隊的少年。',
    price: 2400, 
    stock: 10,
    status: 'available',
    category_id: 'other'
  },
  { 
    id: 'aot-eren',
    name: '進擊的巨人 艾連', 
    description: '追求自由的少年，擁有變身為進擊的巨人的能力。',
    price: 2800, 
    stock: 10,
    status: 'available',
    category_id: 'other'
  },
  { 
    id: 'star-rail-yue',
    name: '崩壞星穹鐵道 歌月君', 
    description: '仙舟「羅浮」的持明族，丹鼎司的醫士。',
    price: 16500, 
    stock: 10,
    status: 'available',
    category_id: 'other'
  },
  { 
    id: 'batman-prime1',
    name: '蝙蝠俠 (Batman)', 
    description: '高譚市的黑暗騎士，以恐懼打擊罪犯。',
    price: 4500, 
    stock: 10,
    status: 'available',
    category_id: 'other'
  },
  { 
    id: 'dbz-goku',
    name: '七龍珠 悟空', 
    description: '來自《七龍珠》的主角，傳說中的超級賽亞人。',
    price: 3500, 
    stock: 10,
    status: 'available',
    category_id: 'dbz'
  }
]);