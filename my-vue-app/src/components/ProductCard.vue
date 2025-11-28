<template>
  <div class="product-card" @click="navigateToDetail">
    <div class="product-image-container">
      <span v-if="product.tag" class="product-tag" :data-tag="product.tag">
        {{ getTagLabel(product.tag) }}
      </span>

      <img v-if="mainImage" :src="mainImage" :alt="product.name">
      <div v-else class="placeholder-image">Image not available</div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-actions">
        <p class="product-price-range">NT$ {{ product.price.toLocaleString() }}</p>
        <button class="buy-btn" @click.stop="$emit('add-to-cart', product)">加入購物車</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { productImages } from '../data/productImages.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['add-to-cart']);

const router = useRouter();

const getTagLabel = (tag) => {
  if (tag === 'new') return 'NEW';
  return tag;
};

const mainImage = computed(() => {
  const image = productImages.value.find(
    img => img.product_id === props.product.id && img.is_main
  );
  return image ? image.image_path : null;
});

function navigateToDetail() {
  router.push('/product/' + props.product.id);
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.product-image-container {
  position: relative;
  width: 100%;
  /* ★★★ 關鍵修改 1：改成 3:4 (直立長方形)，比較適合公仔照片 ★★★ */
  aspect-ratio: 3 / 4; 
  overflow: hidden;
  background-color: #fff; /* 改成白色背景，萬一有留白也比較融合 */
  border-bottom: 1px solid #f0f0f0;
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  /* 保持 cover (填滿)，但配合長方形格子，裁切會變少 */
  object-fit: cover; 
  /* ★★★ 關鍵修改 2：對齊上方 (優先顯示頭部) ★★★ */
  object-position: top center;
  
  display: block;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover .product-image-container img {
  transform: scale(1.05);
}

.placeholder-image {
  color: #999;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

.product-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.product-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.4;
  flex-grow: 1;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 12px;
  width: 100%;
}

.product-price-range {
  font-size: 1.1rem;
  font-weight: bold;
  color: #DB4437;
  margin: 0;
  white-space: nowrap;
}

.buy-btn {
  padding: 8px 16px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.buy-btn:hover {
  background-color: #3367d6;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* 手機版 RWD 優化 */
@media (max-width: 768px) {
  .product-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .product-price-range {
    align-self: flex-start;
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  .buy-btn {
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
}
</style>