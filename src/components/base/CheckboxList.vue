<template>
  <ul class="check-list">
    <li class="check-list__item" v-for="checkboxContent in checkboxListData" :key="checkboxContent.id">
      <label class="check-list__label">
        <input class="check-list__check sr-only" type="checkbox" name="collection" v-model="compCheck" :value="checkboxContent.id">
        <span class="check-list__desc">
          {{ checkboxContent.title }}
          <span>({{ checkboxContent.productsCount }})</span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
/* eslint-disable space-before-function-paren */

export default {
  props: {
    checkboxListData: Array,
    currentCheck: Array
  },
  computed: {
    compCheck: {
      get() {
        return this.currentCheck
      },
      set(value) {
        this.$emit('update:currentCheck', value)
      }
    }
  }
}
</script>
