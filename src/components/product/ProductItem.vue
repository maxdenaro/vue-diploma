<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="computedImage" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <BaseColorsList :colors="colors" :current-color.sync="currentColor" class="colors--black" />
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import BaseColorsList from '@/components/base/BaseColorsList'

export default {
  components: { BaseColorsList },
  data () {
    return {
      currentColor: this.product.colors[0].color.id
    }
  },
  props: {
    product: Object
  },
  filters: { numberFormat },
  computed: {
    colors () {
      return this.product.colors.map(c => c.color)
    },
    computedImage () {
      const color = this.product.colors.find(c => c.color.id === this.currentColor)
      return color.gallery[0].file.url
    }
  }
}
</script>
