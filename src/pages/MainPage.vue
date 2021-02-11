<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts | declOfNum(['товар', 'товара', 'товаров']) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">

      <ProductFilter />

      <section class="catalog">

        <ProductList :products="productsData.items" />

        <BasePagination />
      </section>
    </div>
  </main>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { mapActions } from 'vuex'
import declOfNum from '@/helpers/declOfNum'
import BasePagination from '@/components/base/BasePagination.vue'
import ProductList from '@/components/product/ProductList.vue'
import ProductFilter from '@/components/product/ProductFilter.vue'

export default {
  data() {
    return {
      productsData: [],
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterMaterials: [],
      filterSeasons: [],
      page: 1,
      productsPerPage: 12
    }
  },
  filters: { declOfNum },
  components: { ProductList, ProductFilter, BasePagination },
  computed: {
    countProducts() {
      // return this.productsData ? this.productsData.pagination.total : 0
      return 5
    }
  },
  methods: {
    ...mapActions(['loadProducts'])
  },
  created() {
    this.loadProducts(
      {
        categoryId: this.filterCategoryId,
        materialIds: this.filterMaterials,
        seasonIds: this.filterSeasons,
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo
      })
      .then((response) => {
        this.productsData = response.data
        console.log(this.productsData)
      })
  }
}
</script>
