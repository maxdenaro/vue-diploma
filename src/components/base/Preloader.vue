<template>
  <div class="loader">
    <div class="block orange"></div>
    <div class="block blue"></div>
  </div>
</template>

<style lang="scss">

  .catalog {
    position: relative;
  }

  .loader {
    height: 100%;
    width: 100%;
    top: 150px;
    display: flex;
    position: absolute;
    justify-content: center;
  }

  .block {
    --sz: 40px;
    --tX: 0;
    --animation: 700ms cubic-bezier(0.3, 0.5, 0.4, 0.9) infinite alternate-reverse;
    --hm: 4.5vmin;
    height: var(--sz);
    width: var(--sz);
    background-image: var(--bg);
    border-radius: 50%;
    transform: translateX(var(--tX));
    mix-blend-mode: lighten;
  }

  .orange {
    --bg: linear-gradient(-50deg, #e02d71 0%, #222 100%);
    margin-right: var(--hm);
    animation: attract-orange var(--animation);
  }

  .blue {
    --bg: linear-gradient(50deg, #e02d71 0%, #fafafa 100%);
    margin-left: var(--hm);
    animation: attract-blue var(--animation);
  }

  @keyframes attract-orange {
    to {
      transform: translateX(calc(var(--sz) + calc(var(--hm) / 4)));
    }
  }

  @keyframes attract-blue {
    to {
      transform: translateX(calc(var(--sz) * -1 - calc(var(--hm) / 4)));
    }
  }

</style>
