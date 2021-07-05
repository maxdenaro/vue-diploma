<template>
  <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ productsLength }}</span>
  </router-link>
</template>

<script>
/* eslint-disable space-before-function-paren */

export default {
  computed: {
    productsLength() {
      return this.$store.state.cartProducts.length
    }
  }
}
</script>
