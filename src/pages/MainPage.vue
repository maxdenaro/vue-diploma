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

      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :filt-materials.sync="filterMaterials"
        :filt-seasons.sync="filterSeasons"
      />

      <section class="catalog">

        <Preloader v-if="preloader" />

        <div class="no-products" v-if="!preloader && countProducts === 0">Товаров по выбранным фильтрам нет</div>
        <transition name="fade">
          <ProductList v-if="!preloader" :products="products" />
        </transition>

        <transition name="fade">
          <BasePagination v-if="!preloader" @change-page="page = $event" :page="page" :count="countProducts" :per-page="productsPerPage" />
        </transition>

      </section>
    </div>
  </main>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { mapActions, mapState } from 'vuex'
import declOfNum from '@/helpers/declOfNum'
import Preloader from '@/components/base/Preloader.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import ProductList from '@/components/product/ProductList.vue'
import ProductFilter from '@/components/product/ProductFilter.vue'

export default {
  data() {
    return {
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
  components: { ProductList, ProductFilter, BasePagination, Preloader },
  computed: {
    countProducts() {
      return this.productsData.pagination ? this.productsData.pagination.total : 0
    },
    ...mapState('productModule', {
      productsData: state => state.productsData,
      preloader: state => state.isProductsLoading
    }),
    products() {
      // временное решение, пока не готова апишка
      // eslint-disable-next-line arrow-body-style
      return this.productsData.items.map((item) => {
        return {
          title: item.title,
          price: item.price,
          id: item.id,
          colors: item.colors,
          mainImage: item.colors[0].gallery ? item.colors[0].gallery[0].file.url : 'img/no-product-image-available.png'
        }
      })
    },
    currentFilters() {
      return {
        categoryId: this.filterCategoryId,
        materialIds: this.filterMaterials,
        seasonIds: this.filterSeasons,
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo
      }
    }
  },
  methods: {
    ...mapActions('productModule', ['loadProducts']),
    paginate() {
      this.$emit('paginate', this.page)
    }
  },
  created() {
    this.loadProducts(this.currentFilters)
  },
  watch: {
    page() {
      this.loadProducts(this.currentFilters)
    },
    filterPriceFrom() {
      this.loadProducts(this.currentFilters)
    },
    filterPriceTo() {
      this.loadProducts(this.currentFilters)
    },
    filterCategoryId() {
      this.loadProducts(this.currentFilters)
    },
    filterMaterials() {
      this.loadProducts(this.currentFilters)
    },
    filterSeasons() {
      this.loadProducts(this.currentFilters)
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .no-products {
    padding: 30px;
    font-size: 18px;
    text-align: center;
  }
</style>
