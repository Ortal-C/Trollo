// Gets boards from store

<template>
  <div class='board-app' v-if="boards">
    <div class="starred-boards">
      <h2>Starred boards</h2>
        <ul>
          <li v-for='board in boards' :key='board._id' v-if="board.isStarred" class='board-preview board' @click='openBoard(board._id)' :style='`background-color:${board.style}`'>
          <p>{{board.title}}</p>
        </li>
      </ul>
    </div>
     <div class="workspace-boards">
      <h2>Workspace</h2>
        <ul>
          <li v-for='board in boards' :key='board._id' v-if="!board.isStarred" class='board-preview board' @click='openBoard(board._id)' :style='`background-color:${board.style}`'>
          <p>{{board.title}}</p>
          </li>
          <li v-if="!isAdd" class='board-add board' @click='isAdd = true'>Add new board</li>
          <li class="create-board board" v-if="isAdd">
            <form @submit.prevent="createBoard">
              <input type="text" placeholder="Enter board title" v-model="title">
              <button>Create</button>
            </form>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { boardService } from "@/services/board.service.js";
export default {
  name: "board-app",
  data() {
    return {
      isAdd: false,
      title: "",
    };
  },
  components: {},
  created() {
    this.$store.dispatch({ type: "loadBoards" });
    document.body.style.backgroundColor = "#ffffff";
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  methods: {
    openBoard(boardId) {
      this.$router.push("/board/" + boardId);
    },
    async createBoard() {
      if (!this.title) return;
      let board = boardService.getEmptyBoard();
      board.title = this.title;
      await boardService.add(board);
      this.isAdd = false;
    },
  },
};
</script>