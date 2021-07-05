<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" v-model="compColor" :value="color.id">
        <span class="colors__value" :style="{ background: color.code }">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
/* eslint-disable space-before-function-paren */

export default {
  props: {
    colors: Array,
    currentColor: {
      type: Number,
      default: 0
    }
  },
  computed: {
    compColor: {
      get() {
        return this.currentColor
      },
      set(value) {
        this.$emit('update:currentColor', value)
      }
    }
  }
}
</script>
