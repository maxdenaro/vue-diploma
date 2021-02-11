<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<script>
import ProductItem from '@/components/product/ProductItem.vue'

export default {
  props: {
    products: Array
  },
  components: {
    ProductItem
  }
}
</script>
