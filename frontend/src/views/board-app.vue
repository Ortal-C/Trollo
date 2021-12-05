// Gets boards from store

<template>
  <div class="board-app">
    <ul v-for="board in boards" :key="board._id">
      <section v-if="board.isStarred">
        <h2>Starred boards</h2>
        <li class="board-preview" @click="openBoard(board._id)" :style="`background-color:${board.style}`">
          <p>{{board.title}}</p>
        </li>
      </section>
      <section v-else>
        <h2>Workspace</h2>
        <li class="board-preview" @click="openBoard(board._id)" :style="`background-color:${board.style}`">
          <p>{{board.title}}</p>
        </li>
      </section>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'board-app',
  components: {
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' });
    document.body.style.backgroundColor = '#ffffff';
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  methods: {
    openBoard(boardId) {
      this.$router.push('/board/'+boardId)
    }
  }
}
</script>