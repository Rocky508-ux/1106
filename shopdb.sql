-- 清除舊資料庫（確保乾淨）
DROP DATABASE IF EXISTS shopdb;

-- 建立資料庫
CREATE DATABASE shopdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopdb;

---------------------------------------------------------
-- 1. users（使用者）＋ role 欄位
---------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(20),
    role ENUM('user','admin') DEFAULT 'user',
    status ENUM('active','disabled') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password_hash, phone, role) VALUES
('AdminUser', 'admin@example.com', 'adminhash', '0999123456', 'admin'),
('Alice', 'alice@example.com', 'hash1', '0912345678', 'user'),
('Bob', 'bob@example.com', 'hash2', '0987654321', 'user'),
('Charlie', 'charlie@example.com', 'hash3', '0922334455', 'user');

---------------------------------------------------------
-- 2. categories（商品分類）
---------------------------------------------------------
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    parent_id INT NULL
);

INSERT INTO categories (name) VALUES
('gundam'),
('onepiece'),
('naruto'),
('pokemon'),
('other'),
('dbz');

---------------------------------------------------------
-- 3. products（商品）
---------------------------------------------------------
CREATE TABLE products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    category_id INT,
    tag VARCHAR(50),
    series VARCHAR(255),
    description TEXT,
    type VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO products (id, name, price, category_id, tag, series, description, type) VALUES
('gundam-rx-78-2', '鋼彈 RX-78-2', 3200, 1, 'new', '機動戰士系列', '地球聯邦軍的泛用量產型機動戰士，V作戰的核心。', 'model'),
('one-piece-luffy', 'ONE PIECE 魯夫', 2200, 2, 'new', '海賊王系列', '草帽海賊團的船長，夢想是找到傳說中的大秘寶「ONE PIECE」。', 'figure'),
('naruto-uzumaki', '火影忍者 鳴人', 2800, 3, '現貨', '疾風傳系列', '木葉忍者村的英雄，體內封印著九尾妖狐。', 'figure'),
('pokemon-pikachu', '寶可夢 皮卡丘', 2000, 4, NULL, '精靈寶可夢', '小智最親密的夥伴，擅長使用十萬伏特。', 'prize'),
('demon-slayer-tanjiro', '鬼滅之刃 炭治郎', 2400, 5, '現貨', '柱系列', '為了讓變成鬼的妹妹復原而加入鬼殺隊的少年。', 'figure'),
('aot-eren', '進擊的巨人 艾連', 2800, 5, '預購', '最終季', '追求自由的少年，擁有變身為進擊的巨人的能力。', 'figure'),
('star-rail-yue', '崩壞星穹鐵道 歌月君', 16500, 5, '現貨', 'Imagination 歌月君', '仙舟「羅浮」的持明族，丹鼎司的醫士。', 'figure'),
('batman-prime1', '蝙蝠俠 (Batman)', 4500, 5, '預購', 'Prime 1 Studio', '高譚市的黑暗騎士，以恐懼打擊罪犯。', 'figure'),
('dbz-goku', '七龍珠 悟空', 3500, 6, NULL, '超級賽亞人系列', '來自《七龍珠》的主角，傳說中的超級賽亞人。', 'blindbox');

---------------------------------------------------------
-- 4. product_images（圖片）
---------------------------------------------------------
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(100),
    image_path VARCHAR(255),
    is_main BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO product_images (product_id, image_path) VALUES
('gundam-rx-78-2', '/image/羅莉1.jpg'),
('naruto-uzumaki', '/image/naruto_figure.jpg'),
('pokemon-pikachu', '/image/pokemon_pika.jpg'),
('demon-slayer-tanjiro', '/image/kimetsu_tanjiro.jpg'),
('aot-eren', '/image/aot_eren.jpg'),
('star-rail-yue', '/image/star_rail_yue.jpg'),
('batman-prime1', '/image/batman.jpg'),
('dbz-goku', '/image/野獸.webp');

---------------------------------------------------------
-- 5. orders（訂單）
---------------------------------------------------------
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount INT,
    order_status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    shipping_fee INT DEFAULT 60,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (user_id, total_amount, order_status, payment_method) VALUES
(1, 3200, 'paid', 'credit_card'),
(2, 5700, 'shipped', 'linepay');

---------------------------------------------------------
-- 6. order_items（訂單明細）★ 放最後，避免 FK 出錯
---------------------------------------------------------
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id VARCHAR(100),
    quantity INT,
    price INT,
    subtotal INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(1, 'gundam-rx-78-2', 1, 3200, 3200),
(2, 'one-piece-luffy', 1, 2200, 2200),
(2, 'naruto-uzumaki', 1, 2800, 2800),
(2, 'pokemon-pikachu', 1, 2000, 2000);

