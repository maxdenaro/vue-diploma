/* eslint-disable no-return-assign */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  state: {
    productsData: {},
    isProductsLoading: false
  },
  getters: {},
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
    }
  },
  mutations: {
    loadProd(state, products) {
      state.productsData = products
    },
    loaderOn(state) {
      state.isProductsLoading = true
    },
    loaderOff(state) {
      state.isProductsLoading = false
    }
  },
  namespaced: true
}
