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
          <router-link class="breadcrumbs__link" :to="{name: 'main'}" v-if="detailProductData.category">
            {{ detailProductData.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ detailProductData.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics" v-if="detailProductData.colors">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="detailProductData.colors[0].gallery[0].file.url" :alt="detailProductData.title">
        </div>
        <ul class="pics__list" v-if="detailProductData.colors.length > 1">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg" srcset="img/product-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg" srcset="img/product-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ detailProductData.id }}</span>
        <h2 class="item__title">
          {{ detailProductData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <BaseCounter :current-value.sync="productQuantity" />

              <b class="item__price">
                {{ detailProductData.price | numberFormat}} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <BaseColorsList :colors="colors" :current-color.sync="currentColor" class="colors--black" />
                {{ colorId }}
              </fieldset>

              <fieldset class="form__block" v-if="detailProductData.sizes">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category">
                    <option :value="size.id" v-for="size in detailProductData.sizes" :key="size.id">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { mapActions, mapState } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import BaseCounter from '@/components/base/BaseCounter'
import BaseColorsList from '@/components/base/BaseColorsList'

export default {
  data() {
    return {
      productQuantity: 1,
      colorId: 0
    }
  },
  components: { BaseCounter, BaseColorsList },
  filters: { numberFormat },
  computed: {
    ...mapState({
      detailProductData: state => state.detailProductData
    }),
    colors() {
      return this.detailProductData.colors
    },
    currentColor: {
      get() {
        return this.detailProductData.colors ? this.detailProductData.colors[0].color.id : 0
      },
      set(value) {
        this.colorId = value
        console.log(value)
      }
    }
  },
  methods: {
    ...mapActions(['loadDetailProduct']),
    ...mapActions(['addProductToCart']),
    addToCart() {
      console.log(this.detailProductData)
      console.log(this.productQuantity)
      /* временный запрос */
      this.addProductToCart({
        productId: this.detailProductData.id,
        colorId: this.detailProductData.colors[0].color.id,
        sizeId: this.detailProductData.sizes[0].id,
        quantity: this.productQuantity
      })
    }
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadDetailProduct(this.$route.params.id)
      },
      immediate: true
    }
  }
}
</script>
