// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details" v-if="board">
    <Container>
      <Draggable>
      </Draggable>
  </Container>
    <board-nav />
    <section class="groups-container">
        <group-preview
          @addCard="addCard"
          @removeGroup="removeGroup"
          v-for="group in board.groups"
          :key="group.id"
          :group="group"
        />
      <router-view></router-view>
      <form @submit.prevent="addGroup()">
        <div class="group-add">
          <input v-model="group.title" type="text" placeholder="Add list" />
        </div>
      </form>
    </section>
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
      await this.$store.dispatch({ type: "addGroup", group: this.group });
      this.getEmptyGroup();
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    addCard({ groupId, card }) {
      this.$store.dispatch({ type: "addCard", payload: { groupId, card } });
      console.log('details', groupId, card);
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
    Container,
    Draggable
  },
};
</script>