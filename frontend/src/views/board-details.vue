// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details" v-if="board">
    <board-nav />
    <section class="groups-container">
      <!-- <Container class="groups-container"
        :group-name='dndName' @drag-start="handleDragStart" @drop="handleDrop"
        :get-child-payload="getChildPayload" >
        <Draggable> -->
      <group-preview
        v-for="(group, idx) in board.groups"
        :key="group.id"
        @removeGroup="removeGroup"
        @saveGroup="saveGroup"
        @saveCard="saveCard"
        @handleDrop="handleDrop"
        :group="group"
        :idx="idx"
        :dndName="dndName"
      />
      <!-- </Draggable> -->
      <router-view></router-view>
      <form @submit.prevent="addGroup()">
        <div class="group-add">
          <input v-model="group.title" type="text" placeholder="Add list" />
        </div>
      </form>
    </section>
    <!-- </Container> -->
  </div>
</template>

<script>
import { boardService } from "@/services/board.service.js";
import boardNav from "@/cmps/board/board-nav.vue";
import groupPreview from "@/cmps/board/group/group-preview.vue";
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: "board-details",
  data() {
    return {
      group: {
        title: "",
      },
      tmpBoard: null,
    };
  },
  async created() {
    const boardId = this.$route.params.boardId;
    // this.$store.dispatch({ type: "loadBoard", boardId });
    let board = await this.$store.dispatch({ type: "loadBoard", boardId });
    document.body.style.backgroundColor = board.style || "#ff0000";
    this.getEmptyGroup();
  },
  methods: {
    getEmptyGroup() {
      this.group = boardService.getEmptyGroup();
    },
    getBackgroundColor() {
      this.boardStyle();
    },
    async addGroup() {
      const title = this.group.title;
      if (!title) return;
      await this.$store.dispatch({ type: "saveGroup", group: this.group });
      this.getEmptyGroup();
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    saveGroup(group) {
      this.$store.dispatch({ type: "saveGroup", group });
    },
    saveCard({ groupId, card }) {
      this.$store.dispatch({ type: "saveCard", payload: { groupId, card } });
    },

    // DND
    boardCopy() {
      this.tmpBoard = JSON.parse(JSON.stringify(this.board));
    },
    handleDragStart(dragResult) {
      // const { payload, isSource } = dragResult
      // if (isSource) {
      //   this.draggingGroup = {
      //     lane: this.dndName,
      //     index: payload.index,
      //     groupData: { ...this.tmpBoard.groups[payload.index] },
      //   };
      // }
    },
    async handleDrop({ lane, dropResult }) {
      const { removedIndex, addedIndex, payload } = dropResult
      if (removedIndex !== null || addedIndex != null) {
        if (!this.tmpBoard) this.boardCopy();
        if (removedIndex !== null) {
          this.tmpBoard.groups[lane].cards.splice(removedIndex, 1);
        }
        if (addedIndex !== null) {
          this.tmpBoard.groups[lane].cards.splice(addedIndex, 0, payload);
          await this.$store.dispatch({ type: "updateBoard", board: this.tmpBoard })
          this.tmpBoard = null;
        }
      }
    },
    getChildPayload(index) {
      return {
        index,
      };
    },
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
    groups() {
      return this.$store.getters.board.groups;
    },
    dndName() {
      return 'Trollo';
    },
  },
  watch: {
    board() {
      document.body.style.backgroundColor = this.board.style;
    },
  },
  components: {
    boardNav,
    groupPreview,
    Container,
    Draggable,
  },
};
</script>