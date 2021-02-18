/* eslint-disable no-return-assign */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './modules/product'
// import axios from 'axios'
// import { API_BASE_URL } from '../config'

Vue.use(Vuex)

// const productModule = {
//   namespaced: true
// }

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    productsData: {},
    detailProductData: {},
    cartProducts: [],
    categoriesData: [],
    materialsData: [],
    seasonsData: [],
    isProductsLoading: false
  },
  modules: {
    productModule: productModule
  }
})
