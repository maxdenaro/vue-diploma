<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categoriesComp"
            :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <CheckboxList :checkbox-list-data="materialsComp" :current-check.sync="currentFiltMaterials" />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <CheckboxList :checkbox-list-data="seasonsData" :current-check.sync="currentFiltSeasons" />
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { mapActions, mapState } from 'vuex'
import CheckboxList from '@/components/base/CheckboxList.vue'

export default {
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: Number,
    filtMaterials: Array,
    filtSeasons: Array
  },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentFiltMaterials: [],
      currentFiltSeasons: []
    }
  },
  components: { CheckboxList },
  computed: {
    ...mapState({
      categoriesData: state => state.categoriesData,
      materialsData: state => state.materialsData,
      seasonsData: state => state.seasonsData
    }),
    categoriesComp() {
      // временное решение, пока не готова апишка
      return this.categoriesData.filter((item) => item.title !== 'test')
    },
    materialsComp() {
      // временное решение, пока не готова апишка
      return this.materialsData.filter((item) => item.title !== 'test')
    }
  },
  methods: {
    ...mapActions(['loadCategories', 'loadMaterials', 'loadSeasons']),
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom)
      this.$emit('update:priceTo', this.currentPriceTo)
      this.$emit('update:categoryId', this.currentCategoryId)
      this.$emit('update:filtMaterials', this.currentFiltMaterials)
      this.$emit('update:filtSeasons', this.currentFiltSeasons)
    },
    reset() {
      this.$emit('update:priceFrom', 0)
      this.$emit('update:priceTo', 0)
      this.$emit('update:categoryId', 0)
      this.$emit('update:filtMaterials', [])
      this.$emit('update:filtSeasons', [])
    }
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value
    },
    priceTo(value) {
      this.currentPriceTo = value
    },
    categoryId(value) {
      this.currentCategoryId = value
    },
    filtMaterials(value) {
      this.currentFiltMaterials = value
    },
    filtSeasons(value) {
      this.currentFiltSeasons = value
    }
  },
  created() {
    this.loadCategories()
    this.loadMaterials()
    this.loadSeasons()
  }
}
</script>
