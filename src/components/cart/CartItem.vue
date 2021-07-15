<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.colors[0].gallery[0].file.url" width="120" height="120"
      alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{backgroundColor: item.color.color.code}"></i>
        {{ item.color.color.title }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ item.id }}
    </span>

    <BaseCounter :current-value.sync="quantity" class="product__counter" />

    <b class="product__price">
      {{ item.product.price | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapState, mapGetters } from 'vuex'
import BaseCounter from '@/components/base/BaseCounter.vue'
import numberFormat from '@/helpers/numberFormat'

export default {
  filters: { numberFormat },
  components: { BaseCounter },
  props: {
    item: Object
  },
  computed: {
    quantity: {
      get () {
        return this.item.quantity
      },
      set (value) {
        this.updateCartProductsQuantity({
          productId: this.item.product.id,
          quantity: this.item.quantity
        })
      }
    }
  },
  methods: {
    ...mapActions(['updateCartProductsQuantity'])
  }
}
</script>
