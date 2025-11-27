-- ==========================================
-- 1. 建立資料庫 (如果不存在) & 切換使用
-- ==========================================
-- 建議使用 utf8mb4 以支援 Emoji 符號
CREATE DATABASE IF NOT EXISTS rc_toy_shop DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rc_toy_shop;

-- ==========================================
-- 2. 清除舊表格 (開發階段用，避免 FK 衝突)
-- ==========================================
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- 3. 建立資料表 (Table Schema)
-- ==========================================

-- (1) 使用者資料表 (Users)
-- 用來儲存會員與管理員資訊
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- 實際專案請存加密後的 Hash
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    birthday DATE,
    role ENUM('ADMIN', 'USER') DEFAULT 'USER', -- 區分權限：管理員或一般會員
    status ENUM('ACTIVE', 'DISABLED') DEFAULT 'ACTIVE', -- 帳號狀態
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (2) 商品資料表 (Products)
-- 儲存商品基本資訊、價格、庫存與分類
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY, -- 對應前端使用的字串 ID (如 'gundam-rx-78-2')
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    stock INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'available', -- 商品狀態 (上架/下架)
    category_id VARCHAR(50), -- 分類 (gundam, onepiece...)
    tag VARCHAR(20),         -- 標籤 (new, 預購, 現貨) - 對應前端顯示標籤
    type VARCHAR(20),        -- 類型 (model, figure, prize, blindbox) - 對應前端篩選
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- (3) 商品圖片資料表 (Product Images)
-- 支援一個商品擁有多張圖片
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    image_path VARCHAR(255) NOT NULL, -- 儲存圖片路徑 (如 /image/xxx.jpg)
    is_main BOOLEAN DEFAULT FALSE,    -- 是否為封面主圖
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- (4) 訂單主表 (Orders)
-- 儲存訂單的總體資訊
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- 自訂訂單編號 (如 'ORD001')
    user_id INT NOT NULL,
    total_amount INT NOT NULL,
    status VARCHAR(20) DEFAULT '處理中', -- 訂單狀態
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- (5) 訂單明細表 (Order Items)
-- 儲存每張訂單買了哪些商品
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255), -- 冗餘備份：避免商品改名或刪除後，歷史訂單無法顯示
    quantity INT NOT NULL,
    price INT NOT NULL, -- 購買當下的單價 (防止商品事後漲價影響歷史紀錄)
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ==========================================
-- 4. 插入測試資料 (Mock Data)
-- ==========================================

-- (1) 使用者資料
-- 密碼暫時為明文，之後後端接 Spring Security 時需改為 BCrypt 加密字串
INSERT INTO users (id, name, email, password, phone, birthday, role, status, created_at) VALUES 
(1, '張三', 'chang3@example.com', '123456', '0912345678', '1990-01-01', 'USER', 'ACTIVE', '2024-10-01'),
(2, '李四', 'li4@example.com', '123456', '0923456789', '1992-05-20', 'USER', 'ACTIVE', '2024-10-15'),
(3, '王五', 'wang5@example.com', '123456', '0934567890', '1988-11-11', 'USER', 'DISABLED', '2024-11-01'),
(4, 'Admin', 'admin@rc.com', 'admin123', '0900000000', '2000-01-01', 'ADMIN', 'ACTIVE', NOW()),
(5, 'User', 'user@example.com', '123456', '0911222333', '1995-05-05', 'USER', 'ACTIVE', NOW());

-- (2) 商品資料
INSERT INTO products (id, name, description, price, stock, status, category_id, tag, type) VALUES
('gundam-rx-78-2', '鋼彈 RX-78-2', '地球聯邦軍的泛用量產型機動士，V作戰的核心。', 3200, 10, 'available', 'gundam', 'new', 'model'),
('one-piece-luffy', 'ONE PIECE 魯夫', '草帽海賊團的船長，夢想是找到傳說中的大秘寶「ONE PIECE」。', 2200, 10, 'available', 'onepiece', 'new', 'figure'),
('naruto-uzumaki', '火影忍者 鳴人', '木葉忍者村的英雄，體內封印著九尾妖狐。', 2800, 10, 'available', 'naruto', '現貨', 'figure'),
('pokemon-pikachu', '寶可夢 皮卡丘', '小智最親密的夥伴，擅長使用十萬伏特。', 2000, 10, 'available', 'pokemon', NULL, 'prize'),
('demon-slayer-tanjiro', '鬼滅之刃 炭治郎', '為了讓變成鬼的妹妹復原而加入鬼殺隊的少年。', 2400, 10, 'available', 'other', '現貨', 'figure'),
('aot-eren', '進擊的巨人 艾連', '追求自由的少年，擁有變身為進擊的巨人的能力。', 2800, 10, 'available', 'other', '預購', 'figure'),
('star-rail-yue', '崩壞星穹鐵道 歌月君', '仙舟「羅浮」的持明族，丹鼎司的醫士。', 16500, 5, 'available', 'other', '現貨', 'figure'),
('batman-prime1', '蝙蝠俠 (Batman)', '高譚市的黑暗騎士，以恐懼打擊罪犯。', 4500, 3, 'available', 'other', '預購', 'figure'),
('dbz-goku', '七龍珠 悟空', '來自《七龍珠》的主角，傳說中的超級賽亞人。', 3500, 8, 'available', 'dbz', NULL, 'blindbox');

-- (3) 商品圖片資料
INSERT INTO product_images (product_id, image_path, is_main) VALUES
('gundam-rx-78-2', '/image/羅莉1.jpg', TRUE),
('naruto-uzumaki', '/image/naruto_figure.jpg', TRUE),
('pokemon-pikachu', '/image/pokemon_pika.jpg', TRUE),
('demon-slayer-tanjiro', '/image/kimetsu_tanjiro.jpg', TRUE),
('aot-eren', '/image/aot_eren.jpg', TRUE),
('star-rail-yue', '/image/star_rail_yue.jpg', TRUE),
('batman-prime1', '/image/batman.jpg', TRUE),
('dbz-goku', '/image/野獸.webp', TRUE);

-- (4) 訂單資料
INSERT INTO orders (id, user_id, total_amount, status, order_date) VALUES
('ORD001', 1, 5400, '已出貨', '2024-11-25 10:30:00'),
('ORD002', 2, 2800, '處理中', '2024-11-25 14:20:00'),
('ORD003', 1, 4400, '已送達', '2024-11-24 09:15:00'),
('ORD004', 3, 2800, '已取消', '2024-11-24 18:45:00');

-- (5) 訂單明細資料
INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES
('ORD001', 'gundam-rx-78-2', '鋼彈 RX-78-2', 1, 3200),
('ORD001', 'one-piece-luffy', 'ONE PIECE 魯夫', 1, 2200),
('ORD002', 'naruto-uzumaki', '火影忍者 鳴人', 1, 2800),
('ORD003', 'pokemon-pikachu', '寶可夢 皮卡丘', 1, 2000),
('ORD003', 'demon-slayer-tanjiro', '鬼滅之刃 炭治郎', 1, 2400),
('ORD004', 'aot-eren', '進擊的巨人 艾連', 1, 2800);