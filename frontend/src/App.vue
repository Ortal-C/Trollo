<template>
  <div id="app">
    <app-header />
    <div id="nav">
      <router-link to="/board/boardId">Board</router-link> |
      <router-link to="/board/boardId/groupId/cardId">Card</router-link> 
    </div>
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
