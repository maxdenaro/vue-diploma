/* eslint-disable no-return-assign */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '../config'

Vue.use(Vuex)

const productModule = {
  mutations: {
  },
  actions: {
    loadProducts(context, { page, limit, categoryId, minPrice, maxPrice, materialIds, seasonIds }) {
      return axios
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
        // .then((response) => this.products = response.data)
    }
  }
}

const cartModule = {
  mutations: {
  },
  actions: {
  }
}

const orderModule = {
  mutations: {
  },
  actions: {
  }
}

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    products: []
  },
  modules: {
    productModule: productModule,
    cartModule: cartModule,
    orderModule: orderModule
  }
})
