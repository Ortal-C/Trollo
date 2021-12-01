// Board nav

<template>
  <div class="board-nav">
    <section>
      <select>
        <option value="board">Board</option>
        <option value="dashboard">Dashboard</option>
      </select>
      <div>{{ board.title }}</div>
      <button :class="isStar" @click="toggleStar">★</button>
      <div v-for="member in board.members" :key="member.id">
        <el-avatar :size="30" :src="member.imgUrl" />
      </div>
    </section>
    <button>Menu</button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'board-nav',
  props: {},
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      board: null,
      isStarred: null
    }
  },
    created() {
    // const boardId = this.$route.params.boardId
    const boardId = 'b101'
    this.board = this.$store.getters.board
    this.isStarred = this.board.isStarred
  },
  methods: {
    async toggleStar() {
      this.isStarred = !this.isStarred
      console.log('toggleStar:' ,{...this.board, isStarred});
      await this.$store.dispatch({ type: 'setBoard', board: this.board, isStarred: this.isStarred })
      // await this.$store.dispatch({ type: 'toggleStar', isStarred: this.isStarred })
    },
  },
  computed: {
    isStar() {
      return { "starred": this.isStarred }
    },
  },
  components: {
  }
}
</script>