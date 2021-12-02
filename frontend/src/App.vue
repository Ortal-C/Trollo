<template>
  <div id="app">
    <div class="main-screen"></div>
    <app-header />
    <router-view/>
  </div>
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
export default {
  components: {
    appHeader
  }
}
</script>
