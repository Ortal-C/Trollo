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
      <div class="group-add" @click="addGroup()">Add another list</div>
     <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { boardService } from "@/services/board.service.js";
import boardNav from "@/cmps/board/board-nav.vue";
import groupPreview from "@/cmps/board/group/group-preview.vue";
export default {
  name: "board-details",
  data() {
    return {
      group: null,
    };
  },
  async created() {
    const boardId = this.$route.params.boardId
    this.$store.dispatch({ type: "loadBoard", boardId });
    let board = await this.$store.dispatch({ type: "loadBoard", boardId });
    console.log(board);
    document.body.style.backgroundColor = board.style || '#ff0000'
    this.getEmptyGroup();
  },
  methods: {
    getEmptyGroup() {
      this.group = boardService.getEmptyGroup();
    },
    getBackgroundColor() {
      this.boardStyle()
    },
    async addGroup() {
      const title = prompt("Group title:");
      this.group.title = title;
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
      return this.$store.getters.board.style
    }
  },
  components: {
    boardNav,
    groupPreview,
  },
};
</script>