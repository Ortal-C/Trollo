// Gets boards from store

<template>
  <div class="board-app">
    <h1>Board app</h1>
    <ul v-for="board in boards" :key="board._id">
      <router-link :to="'/board/'+board._id">{{board.title}}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'board-app',
  components: {
  },
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    }
  },
}
</script>