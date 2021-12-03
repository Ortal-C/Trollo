// Board nav

<template>
  <section class="board-nav">
    <section>
      <select>
        <option value="board">Board</option>
        <option value="dashboard">Dashboard</option>
      </select>
      <div class="board-title">
        <h3>{{ board.title }}</h3>
      </div>
      <button :class="isStar" @click="toggleStar">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
          ></path>
        </svg>
      </button>
      <div v-for="member in board.members" :key="member.id">
        <el-avatar :size="30" :src="member.imgUrl"></el-avatar>
      </div>
      <button>Invite</button>
      <!-- <el-avatar title="Add new member" :size="30">➕</el-avatar> -->
    </section>
    <select v-model="style" @change="updateStyle">
      <option v-for="color in colors" :key="color" :value="color">
        {{ color }}
      </option>
    </select>
    <button @click="toggleMenu">Menu</button>
    <transition name="fade">
      <board-menu v-if="isMenuOpen" @close="toggleMenu" />
    </transition>
  </section>
</template>

<script>
import boardMenu from "@/cmps/board/board-menu.vue";
// @ is an alias to /src
export default {
  name: 'board-nav',
  props: {},
  data() {
    return {
      //circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      board: null,
      isMenuOpen: false,
      isStarred: null,
      style: null,
      colors: [
        '#cc0033',
        '#ff8000',
        '#ffbf00',
        '#00cc00',
        '#66d9ff',
        '#0099cc',
        '#bf80ff',
        '#ff66ff',
        '#ff4da6',
      ]
    }
  },
  created() {
    // const boardId = this.$route.params.boardId
    // const boardId = 'b101'
    this.board = this.$store.getters.board
    this.isStarred = this.board.isStarred
    this.style = this.board.style
  },
  methods: {
    console() {
      console.log(this.style)
    },
    async toggleStar() {
      this.isStarred = !this.isStarred
      await this.$store.dispatch({ type: 'updateBoard', board: { ...this.board, isStarred: this.isStarred } })
    },
    async updateStyle() {
      await this.$store.dispatch({ type: 'updateBoard', board: { ...this.board, style: this.style } })
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  },
  computed: {
    isStar() {
      return { "starred": this.isStarred }
    },
  },
  components: {
    boardMenu,
  }
}
</script>