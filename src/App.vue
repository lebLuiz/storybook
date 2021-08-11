<template>
  <div id="app">

    <router-view class="content" />

  </div>
</template>

<script>

export default {
  name: 'App',

  computed: {
    optionHamburguerResponsive() {
      return this.$store.state.activeHamburguerOptions;
    },
  },

  watch: {
    optionHamburguerResponsive(newV, oldV) {
      if (newV != oldV && newV == true) window.document.body.style.overflowY = 'hidden';
      else window.document.body.style.overflowY = 'auto';
    }
  },
}
</script>

<style lang="scss" scoped>

</style>