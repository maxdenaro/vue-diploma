<template>
  <div class="sticky-footer">
    <Header />
    <router-view  />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/base/Header.vue'
import Footer from '@/components/base/Footer.vue'

export default {
  components: { Header, Footer }
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
