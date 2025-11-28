import { ref } from 'vue';

export const products = ref([
  { 
    id: 'gundam-rx-78-2', 
    name: '鋼彈 RX-78-2 Ver.Ka', 
    description: '由知名設計師 Katoki Hajime 監修，追求極致的機械結構與可動性。全機標誌採用水貼設計，還原度極高。',
    price: 3200, 
    stock: 10,
    status: 'available',
    category_id: 'gundam',
    tag: 'new',
    type: 'model',
    studio: 'Bandai Namco',
    scale: '1/100 (MG)',
    dimensions: 'H:18cm',
    material: 'PS, ABS, PVC',
    estimated_arrival: '現貨',
    // ★★★ 新增：特色條列 ★★★
    features: [
      '全身多處裝甲可展開，展示內部精細骨架',
      '附屬多樣武裝：光束步槍、超級火箭砲、光束軍刀',
      '核心戰機可變形並收納於腹部',
      'Ver.Ka 專屬水轉印貼紙，細節資訊量大增'
    ],
    // ★★★ 新增：個別商品注意事項 ★★★
    note: '本商品為組裝模型，需自行組裝。圖片為塗裝完成範例，實際商品可能略有不同。'
  },
  { 
    id: 'dbz-broly', 
    name: '七龍珠超 布羅利 (Broly) 傳說超級賽亞人', 
    description: '「我的力量...是不會枯竭的！」傳說中的超級賽亞人布羅利，以壓倒性的姿態登場。肌肉線條與氣場特效件完美呈現，SCC玩具屋熱門預購款。', 
    price: 18800, 
    stock: 3, 
    status: 'available', 
    category_id: 'dbz', 
    tag: '預購', 
    type: 'figure',
    studio: 'Deyin Studio',
    scale: '1/6',
    dimensions: 'H:45cm W:38cm D:30cm',
    material: '進口樹脂 + PU + 透明特效件',
    estimated_arrival: '2025年 第3季',
    features: [
      '雙頭雕配置：怒吼臉 / 邪笑臉',
      '地台內建 LED 發光機構，還原氣場爆發效果',
      '附屬替換手型 x2，可呈現不同戰鬥姿態',
      '全球限量 288 體，附獨立編號金屬銘牌'
    ],
    note: '預購商品發售日僅供參考，實際出貨以工作室進度為準。GK商品運送風險較高，建議開箱錄影。'
  },
  // ... (其他商品維持原樣，或您可以自己練習加內容) ...
  { 
    id: 'one-piece-luffy',
    name: 'ONE PIECE 魯夫', 
    description: '草帽海賊團的船長，夢想是找到傳說中的大秘寶「ONE PIECE」。',
    price: 2200, 
    stock: 10,
    status: 'available',
    category_id: 'onepiece',
    tag: 'new',
    type: 'figure'
  },
  { 
    id: 'naruto-uzumaki',
    name: '火影忍者 鳴人', 
    description: '木葉忍者村的英雄，體內封印著九尾妖狐。',
    price: 2800, 
    stock: 10,
    status: 'available',
    category_id: 'naruto',
    tag: '現貨',
    type: 'figure'
  },
  { 
    id: 'pokemon-pikachu',
    name: '寶可夢 皮卡丘', 
    description: '小智最親密的夥伴，擅長使用十萬伏特。',
    price: 2000, 
    stock: 10,
    status: 'available',
    category_id: 'pokemon',
    tag: null,
    type: 'prize'
  },
  { 
    id: 'demon-slayer-tanjiro',
    name: '鬼滅之刃 炭治郎', 
    description: '為了讓變成鬼的妹妹復原而加入鬼殺隊的少年。',
    price: 2400, 
    stock: 10,
    status: 'available',
    category_id: 'other',
    tag: '現貨',
    type: 'figure'
  },
  { 
    id: 'aot-eren',
    name: '進擊的巨人 艾連', 
    description: '追求自由的少年，擁有變身為進擊的巨人的能力。',
    price: 2800, 
    stock: 10,
    status: 'available',
    category_id: 'other',
    tag: '預購',
    type: 'figure'
  },
  { 
    id: 'star-rail-yue',
    name: '崩壞星穹鐵道 歌月君', 
    description: '仙舟「羅浮」的持明族，丹鼎司的醫士。',
    price: 16500, 
    stock: 10,
    status: 'available',
    category_id: 'other',
    tag: '現貨',
    type: 'figure'
  },
  { 
    id: 'batman-prime1',
    name: '蝙蝠俠 (Batman)', 
    description: '高譚市的黑暗騎士，以恐懼打擊罪犯。',
    price: 4500, 
    stock: 10,
    status: 'available',
    category_id: 'other',
    tag: '預購',
    type: 'figure'
  },
  { 
    id: 'dbz-goku',
    name: '七龍珠 悟空', 
    description: '來自《七龍珠》的主角，傳說中的超級賽亞人。',
    price: 3500, 
    stock: 10,
    status: 'available',
    category_id: 'dbz',
    tag: null,
    type: 'blindbox'
  }
]);