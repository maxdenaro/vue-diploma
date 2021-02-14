<template>
  <div class="content container not-found">
    <h1>Ничего не найдено</h1>
    <router-link class="breadcrumbs__link back-link" :to="{name: 'main'}">
      Назад к каталогу
    </router-link>
    <img src="img/travolta.gif" class="not-found__image">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .not-found {
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .not-found__image {
    margin-top: 100px;
  }
</style>
