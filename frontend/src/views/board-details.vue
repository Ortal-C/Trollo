// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details" v-if="board">
    <board-nav />
    <section class="groups-container">
      <group-preview
        @removeGroup="removeGroup"
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
      />
      <form @submit.prevent="addGroup()">
        <div class="group-add">
          <input
            v-model="group.title"
            type="text"
            placeholder="Add another list"
          />
        </div>
      </form>
      <!-- <div class="group-add" @click="addGroup()">Add another list</div> -->
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { boardService } from "@/services/board.service.js";
import boardNav from "@/cmps/board/board-nav.vue";
import groupPreview from "@/cmps/board/group/group-preview.vue";
export default {
  name: "board-details",

  data() {
    return {
      group: {
        title: '',
      },
    };
  },
  async created() {
    const boardId = this.$route.params.boardId;
    this.$store.dispatch({ type: "loadBoard", boardId });
    this.getEmptyGroup();
    //  console.log(board);
    // this.board = this.$store.getters.board
    // console.log(this.$store.getters.board.style);
    // document.body.style.backgroundColor = this.boardStyle || '#ff0000'
    // console.log(document.body.style.backgroundColor)
    // if (this.board) {
    //   console.log(document.body.style)
    //   console.log(this.board.style)
    // }
  },
  methods: {
    getEmptyGroup() {
      this.group = boardService.getEmptyGroup();
    },
    async addGroup() {
      // const title = prompt("Group title:");
      const title = this.group.title
      // this.group.title = this.title;
      if (!title) return;
      await this.$store.dispatch({ type: "addGroup", group: this.group });
      this.getEmptyGroup();
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
    groups() {
      return this.$store.getters.board.groups;
    },
    boardStyle() {
      return this.$store.getters.board.style;
    },
  },
  components: {
    boardNav,
    groupPreview,
  },
};
</script>
<style scoped>
body {
  background-color: #ff0000;
}
/* this.boardStyle || '#ff0000' */
</style>