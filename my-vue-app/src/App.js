export default {
  name: 'GKShop',
  data() {
    return {
      currentPage: 'products',
      isLoggedIn: false,
      selectedCategory: '',
      filter: '',
      showTopUp: false,
      showTransactions: false,
      topUpAmount: 0,
      walletBalance: 15000,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        phone: '',
        birthday: '',
        password: '',
        confirmPassword: ''
      },
      // *** 修正: 加入 imageUrl, tag, series, minPrice, maxPrice 屬性 ***
      products: [
        { id: 1, name: '鋼彈 RX-78-2', minPrice: 2500, maxPrice: 3200, category: 'gundam', imageUrl: '/image/羅莉1.jpg', tag: '現貨', series: '機動戰士系列' },
        { id: 2, name: 'ONE PIECE 魯夫', minPrice: 1800, maxPrice: 2200, category: 'onepiece', imageUrl: '/image/羅莉.jpg', tag: '預購', series: '海賊王系列' },
        { id: 3, name: '火影忍者 鳴人', minPrice: 2200, maxPrice: 2800, category: 'naruto', imageUrl: '/image/naruto_figure.jpg', tag: '現貨', series: '疾風傳系列' },
        { id: 4, name: '寶可夢 皮卡丘', minPrice: 1500, maxPrice: 2000, category: 'pokemon', imageUrl: '/image/pokemon_pika.jpg', tag: '現貨', series: '精靈寶可夢' },
        { id: 5, name: '鬼滅之刃 炭治郎', minPrice: 2000, maxPrice: 2400, category: 'other', imageUrl: '/image/kimetsu_tanjiro.jpg', tag: '現貨', series: '柱系列' },
        { id: 6, name: '進擊的巨人 艾連', minPrice: 2300, maxPrice: 2800, category: 'other', imageUrl: '/image/aot_eren.jpg', tag: '預購', series: '最終季' },
        { id: 7, name: '崩壞星穹鐵道 歌月君', minPrice: 520, maxPrice: 16500, category: 'other', imageUrl: '/image/star_rail_yue.jpg', tag: '現貨', series: 'Imagination 歌月君' }, // 新增的商品，對應您的圖片
        { id: 8, name: '蝙蝠俠 (Batman)', minPrice: 3500, maxPrice: 4500, category: 'other', imageUrl: '/image/batman.jpg', tag: '預購', series: 'Prime 1 Studio' }, // 另一個來自參考圖的商品
        { id: 9, name: '七龍珠 悟空', minPrice: 2800, maxPrice: 3500, category: 'other', imageUrl: '/image/野獸.webp', tag: '現貨', series: '超級賽亞人系列' }
      ],
      orders: [
        { id: 'ORD001', totalAmount: 4300, status: '已完成', date: '2024-09-15' },
        { id: 'ORD002', totalAmount: 2200, status: '配送中', date: '2024-10-20' },
        { id: 'ORD003', totalAmount: 1500, status: '待付款', date: '2024-11-01' }
      ],
      transactions: [
        { id: 1, type: '儲值', amount: 5000, date: '2024-10-01' },
        { id: 2, type: '購買商品', amount: -2500, date: '2024-10-05' },
        { id: 3, type: '儲值', amount: 10000, date: '2024-10-15' },
        { id: 4, type: '購買商品', amount: -1800, date: '2024-10-20' }
      ]
    }
  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory) return this.products;
      return this.products.filter(p => p.category === this.selectedCategory);
    }
  },
  methods: {
    login() {
      alert('登入功能需串接後端 API');
      this.isLoggedIn = true;
      this.currentPage = 'products';
    },
    register() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('密碼不一致！');
        return;
      }
      alert('註冊功能需串接後端 API');
      this.currentPage = 'login';
    },
    logout() {
      this.isLoggedIn = false;
      this.currentPage = 'products';
    },
    addToCart(product) {
      alert(`已將 ${product.name} 加入購物車（需串接後端）`);
    },
    topUp() {
      if (this.topUpAmount > 0) {
        this.walletBalance += parseInt(this.topUpAmount);
        this.transactions.unshift({
          id: Date.now(),
          type: '儲值',
          amount: parseInt(this.topUpAmount),
          date: new Date().toISOString().split('T')[0]
        });
        alert(`成功儲值 NT$ ${this.topUpAmount}`);
        this.topUpAmount = 0;
        this.showTopUp = false;
      }
    },
    getStatusClass(status) {
      const map = {
        '已完成': 'status-completed',
        '配送中': 'status-shipping',
        '待付款': 'status-pending'
      };
      return map[status] || '';
    }
  }
}
