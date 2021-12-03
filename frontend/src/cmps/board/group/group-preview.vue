// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <div class="group-header">
    <h2 contenteditable="true">{{ group.title }}</h2>
    <button class="menu-btn" @click="openMenu">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clip-rule="evenodd"></path></svg>
    </button>
    <button class="remove-btn" @click="removeGroup(group.id)">X</button>
    </div>
    <ul>
      <Container group-name="trollo" @drag-start="handleDragStart" @drop="handleDrop" :get-child-payload="getChildPayload">
        <Draggable v-for="card in group.cards" :key="card.id">
          <card-preview :card="card" :group="group" />
        </Draggable>
      </Container>
      <form @submit.prevent="addCard(group.id)">
        <div class="card-add">
          <input v-model="card.title" type="text" placeholder="+ Add a card" />
        </div>
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
      draggingCard: {
        lane: "",
        index: -1,
        cardData: {},
      },
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
      this.$emit('removeGroup', groupId)
    },
    addCard(groupId) {
      const title = this.card.title;
      if (!title) return;
       this.$emit('addCard', {groupId, card:this.card})
       this.getEmptyCard();
    },
    openMenu() {
      console.log('Open menu');
    }
   
  },
  components: {
    cardPreview,
    Container,
    Draggable
  }
}
</script>