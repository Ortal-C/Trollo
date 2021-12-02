// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details" v-if="board" style="boardStyle">
    <board-nav />
    <section class="groups-container">
      <group-preview
        @removeGroup="removeGroup"
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
      />
      <div class="group-add" @click="addGroup()">Add another list</div>
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
      group: null,
    };
  },
  created() {
    const boardId = this.$route.params.boardId
    // this.group = boardService.getEmptyGroup();
    // const boardId = this.$route.params.boardId
    // const boardId = "b101";
    this.getEmptyGroup();
    this.$store.dispatch({ type: "loadBoard", boardId });
  },
  methods: {
    getEmptyGroup() {
      this.group = boardService.getEmptyGroup();
    },
    async addGroup() {
      const title = prompt("Group title:");
      this.group.title = title;
      if (!title) return;
      const board = { ...this.board, groups: [...this.groups, this.group] };
      //this.$store.dispatch({ type: "addGroup", title });
      await this.$store.dispatch({ type: "updateBoard", board });
      this.getEmptyGroup();
    },
    removeGroup(groupId) {
      const groups = this.groups.filter((group) => group.id !== groupId);
      this.$store.dispatch({ type: "removeGroup", groups });
      console.log(groups);
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    groups() {
      return this.$store.getters.board.groups;
    },
    boardStyle(){
      return this.$store.getters.board.style
    }
  },
  watch:{

  },
  components: {
    boardNav,
    groupPreview,
  },
};
</script>
