<template>
  <div class="sticky-footer">
    <Header />
    <router-view  />
    <Footer />
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
import Header from '@/components/base/Header.vue'
import Footer from '@/components/base/Footer.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: { Header, Footer },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }

    this.loadCart()
  }
}
</script>

<style>
  body {
    overflow-anchor: none;
  }

  .footer-bottom {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
  }
</style>
