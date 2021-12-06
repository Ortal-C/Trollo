<template>
  <div id="app">
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
