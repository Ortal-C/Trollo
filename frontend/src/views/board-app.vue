// Gets boards from store

<template>
  <div class="board-app">
    <ul v-for="board in boards" :key="board._id">
      <li class="board-preview" @click="openBoard(board._id)">
        <p>{{board.title}}</p>
      </li>
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
  methods: {
    openBoard(boardId) {
      this.$router.push('/board/'+boardId)
    }
  }
}
</script>