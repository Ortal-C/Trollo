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
    <button>menu</button>
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
    }
  },
  created() {
    this.board = this.$store.getters.board
  },
  methods: {
  toggleStar(){
    // this.$store.dispatch({type:"setIsStarred"})
    this.board.isStarred = !this.board.isStarred 
},
  },
  computed: {
    isStar(){
      return {"starred": this.board.isStarred}  
    },
  },
  components: {
  }
}
</script>