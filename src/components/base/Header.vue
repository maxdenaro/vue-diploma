<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <span class="header__logo" v-if="pageRoute === 'main'">
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </span>
      <router-link :to="{name: 'main'}" class="header__logo" href="#" v-else>
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </router-link>

      <!-- <a class="header__logo" href="#">
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </a> -->

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <CartIndicator />
    </div>
  </header>
</template>

<script>
/* eslint-disable space-before-function-paren */
import CartIndicator from '@/components/cart/CartIndicator.vue'

export default {
  components: { CartIndicator },
  computed: {
    pageRoute() {
      return this.$route.name
    }
  }
}
</script>
