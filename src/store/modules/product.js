/* eslint-disable no-return-assign */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  namespaced: true,
  mutations: {
    loadProd(state, products) {
      state.productsData = products
    },
    loadCat(state, categories) {
      state.categoriesData = categories
    },
    loadMat(state, materials) {
      state.materialsData = materials
    },
    loadSeas(state, seasons) {
      state.seasonsData = seasons
    },
    loadDetailProd(state, product) {
      state.detailProductData = product
    },
    loaderOn(state) {
      state.isProductsLoading = true
    },
    loaderOff(state) {
      state.isProductsLoading = false
    }
  },
  actions: {
    loadProducts({ commit }, { page, limit, categoryId, minPrice, maxPrice, materialIds, seasonIds }) {
      commit('loaderOn')
      setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              categoryId: categoryId,
              materialIds: materialIds,
              seasonIds: seasonIds,
              page: page,
              limit: limit,
              minPrice: minPrice,
              maxPrice: maxPrice
            }
          })
          .then((response) => commit('loadProd', response.data))
          .then(() => commit('loaderOff'))
      }, 0)
    },
    loadCategories({ commit }) {
      setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/productCategories`)
          .then((response) => commit('loadCat', response.data.items))
      }, 0)
    },
    loadMaterials({ commit }) {
      setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/materials`)
          .then((response) => commit('loadMat', response.data.items))
      }, 0)
    },
    loadSeasons({ commit }) {
      setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/seasons`)
          .then((response) => commit('loadSeas', response.data.items))
      }, 0)
    },
    loadDetailProduct({ commit }, id) {
      setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products/${id}`)
          .then((response) => commit('loadDetailProd', response.data))
      }, 0)
    }
  }
}