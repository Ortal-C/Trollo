// Gets boards from store

<template>
  <div class='board-app' v-if="boards">
    <div class="starred-boards">
      <h2>Starred boards</h2>
        <ul>
          <div v-for='board in boards' :key='board._id'>
            <li v-if="board.isStarred" class='board-preview board' @click='openBoard(board._id)' :style='`background-color:${board.style}`'>
              <p>{{board.title}}</p>
            </li>
             <!-- <li v-if="board.isStarred && board.style.length > 10" class='board-preview board' @click='openBoard(board._id)' :style='`background-image:${board.style}`'>
              <p>{{board.title}}</p>
            </li> -->
          </div>
        </ul>
    </div>
     <div class="workspace-boards">
      <h2>Workspace</h2>
        <ul>
          <div v-for='board in boards' :key='board._id'>
            <li v-if="!board.isStarred" class='board-preview board' @click='openBoard(board._id)' :style='`background-color:${board.style}`'>
              <p>{{board.title}}</p>
            </li>
          </div>
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
import {socketService} from '@/services/socket.service.js';
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
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.backgroundImage = "none";
    this.$store.dispatch({ type: "loadBoards" });
    socketService.on('boards-watch', this.updateBoards)
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  methods: {
    updateBoards(boards){
      this.$store.commit({type:'setBoards', boards})
    },
    openBoard(boardId) {
      this.$router.push("/board/" + boardId);
    },
    async createBoard() {
      if (!this.title) return;
      let board = boardService.getEmptyBoard();
      board.title = this.title;
      await this.$store.dispatch({type:'addBoard',board})
      socketService.emit('boards-watch',this.boards)
      this.isAdd = false;
    },
  },
};
</script>