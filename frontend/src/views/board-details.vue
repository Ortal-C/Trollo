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
            v-for="group in board.groups" :key="group.id"
            @addCard="addCard"
            @removeGroup="removeGroup" @saveGroup="saveGroup"
            :group="group" :dndName="dndName"/>
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
      tmpBoard:null,
      draggingGroup: {
          lane:'',
          index: -1,
          groupData: {},
        }
    };
  },
  async created() {
    const boardId = this.$route.params.boardId;
    this.$store.dispatch({ type: "loadBoard", boardId });
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
      // const title = prompt("Group title:");
      const title = this.group.title;
      // this.group.title = this.title;
      if (!title) return;
      await this.$store.dispatch({ type: "saveGroup", group: this.group });
      this.getEmptyGroup();
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    saveGroup(group) {
      this.$store.dispatch({ type: "saveGroup", group })
    },
    addCard({ groupId, card }) {
      this.$store.dispatch({ type: "addCard", payload: { groupId, card } });
    },

    // DND
    boardCopy() {
      this.tmpBoard = JSON.parse(JSON.stringify(this.board))
    },
    handleDragStart(dragResult) {
      this.boardCopy();
      const { payload, isSource } = dragResult
      if (isSource) {
        this.draggingGroup = {
          lane: this.dndName,
          index: payload.index,
          groupData: { ...this.tmpBoard.groups[payload.index] },
        }
      }
    },
    async handleDrop(dropResult) {
      const { removedIndex, addedIndex } = dropResult;
      if (this.dndName === this.draggingGroup.lane && removedIndex === addedIndex) return;
      else {
        if (removedIndex !== null) {
          this.tmpBoard.groups.splice(removedIndex, 1);
        }
        if (addedIndex !== null) {
          this.tmpBoard.groups.splice(addedIndex, 0, this.draggingGroup.groupData);
        }
      await this.$store.dispatch({ type: "updateBoard", board: this.tmpBoard });
      }
    },
    getChildPayload(index) {
      return {
        index,
      }
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
    dndName(){
      return 'Trollo';
    },
  },
  components: {
    boardNav,
    groupPreview,
    Container,
    Draggable
  },
};
</script>

<style>
  .group-container1{
    display: flex;
  }
</style>