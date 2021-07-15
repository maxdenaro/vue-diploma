<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title" v-if="products.length">
          Корзина
        </h1>
        <h1 class="content__title" v-else>
          Корзина
        </h1>
        <span class="content__info">
          {{ products.length | declOfNum(['товар', 'товара', 'товаров'])}}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.id" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapState, mapGetters } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import declOfNum from '@/helpers/declOfNum'
import CartItem from '@/components/cart/CartItem.vue'

export default {
  filters: { numberFormat, declOfNum },
  components: { CartItem },
  computed: {
    ...mapState({
      products: state => state.cartProductsData
    }),
    ...mapGetters({
      totalPrice: 'cartTotalPrice'
    })
  }
}
</script>
