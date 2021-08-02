/* eslint-disable no-return-assign */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import productModule from './modules/productModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    productModule
  },
  state: {
    userAccessKey: null,
    detailProductData: {},
    cartProducts: [],
    cartProductsData: [],
    categoriesData: [],
    materialsData: [],
    seasonsData: []
  },
  getters: {
    cartTotalPrice(state, getters) {
      return state.cartProductsData.reduce((acc, item) => (item.product.price * item.quantity) + acc, 0)
    }
  },
  mutations: {
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    resetCart(state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    },
    deleteCartProduct(state, payLoad) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== payLoad.productId)
    },
    updateCartProductsAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId)

      if (item) {
        item.amount = amount
      }
    }
  },
  actions: {
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
      return axios
        .get(`${API_BASE_URL}/api/products/${id}`)
        .then((response) => {
          commit('loadDetailProd', response.data)
          return response.data
        })
    },
    loadCart(context) {
      axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },
    addProductToCart(context, { productId, colorId, sizeId, quantity }) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          colorId,
          sizeId,
          quantity
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then((response) => {
          console.log(response.data)
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },
    updateCartProductsQuantity(context, { productId, quantity }) {
      context.commit('updateCartProductsAmount', { productId, quantity })
      if (quantity < 1) {
        return
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId: productId,
          quantity: quantity
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    deleteCardProd(context, { productId }) {
      context.commit('deleteCartProduct', { productId })

      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            // eslint-disable-next-line object-shorthand
            basketItemId: productId
          },
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    }
  }
})
