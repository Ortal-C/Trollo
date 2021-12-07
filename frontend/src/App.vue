<template>
  <div id="app">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <div class="main-screen" @click="removeClass"></div>
    <app-header />
    <router-view/>
  </div>
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
export default {
  components: {
    appHeader
  },
  methods: {
    removeClass() {
      document.body.classList.remove('details-open');
      this.$router.back()
    }
  }
}
</script>
