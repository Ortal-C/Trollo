// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <div class="group-header">
    <h2 contenteditable="true">{{ group.title }}</h2>
    <button class="menu-btn" @click="toggleMenu">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clip-rule="evenodd"></path></svg>
    </button>
    <div v-if="isOpen" class="group-menu">
      <h3>List actions</h3>
      <svg class="close-svg" @click="toggleMenu" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"></path></g></g></svg>
      <div>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 14 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13 2H1v2h12V2zM0 4a1 1 0 0 0 1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2zm2 1h10v9H2V5zm2 3h6V7H4v1z"></path></svg>
      Archive</div>
    </div>
    <button class="remove-btn" @click="removeGroup(group.id)">X</button>
    </div>
    <ul>
      <Container
        group-name="trollo"
        @drag-start="handleDragStart"
        @drop="handleDrop"
        :get-child-payload="getChildPayload"
      >
        <Draggable v-for="card in group.cards" :key="card.id">
          <card-preview :card="card" :group="group" />
        </Draggable>
      </Container>
      <p class="card-add" @click="isClicked = !isClicked" v-if="!isClicked">
        + Add a card
      </p>
      <form @submit.prevent="addCard(group.id)" v-else>
        <textarea
          v-model="card.title"
          name=""
          id=""
          cols="36.5"
          rows="3"
          placeholder="Enter a title fot this card"
        ></textarea>
        <button>Add card</button>
      </form>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import cardPreview from '../card/card-preview.vue'
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: 'group-preview',
  props: ['group'],
  data() {
    return {
      card: {
        title: "",
      },
      isClicked: false,
      draggingCard: {
        lane: "",
        index: -1,
        cardData: {},
      },
      isOpen: false
    }
  },
  created() {
    this.getEmptyCard();
  },
  methods: {
    handleDragStart(dragResult){
      const {payload, isSource} = dragResult
      console.log(payload.index);
    },
    handleDrop(){

    },
    getChildPayload(index){
      return{
        index,
      }
    },
    getEmptyCard() {
      this.card = boardService.getEmptyCard();
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    addCard(groupId) {
      const title = this.card.title;
      if (!title) return;
      this.$emit("addCard", { groupId, card: this.card });
      this.getEmptyCard();
      this.isClicked=false
    },
    toggleMenu() {
      console.log('Toggle menu');
      this.isOpen = !this.isOpen
    }
   
  },
  components: {
    cardPreview,
    Container,
    Draggable
  }
}
</script>