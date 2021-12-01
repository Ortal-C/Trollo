// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details" v-if="board">
    <board-nav />
    <section class="groups-container">
      <group-preview v-for="group in board.groups" :key="group.id" :group="group" />
      <div class="group-add" @click="addGroup()">Add another list</div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import boardNav from "@/cmps/board/board-nav.vue";
import groupPreview from "@/cmps/board/group/group-preview.vue";
export default {
  name: "board-details",
  components: {
    boardNav,
    groupPreview,
  },
  created() {
    // const boardId = this.$route.params.boardId
    const boardId = 'b101'
    console.log(boardId);
    this.$store.dispatch({ type: "loadBoard", boardId});
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    groups() {
      return this.$store.getters.board.groups;
    },
  },
  methods: {
    addGroup() {
      const title = prompt("Group title:");
      if(!title) return
       this.$store.dispatch({ type: "addGroup", title });
    },
  },
};
</script>
