// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <button class="remove-btn" @click="removeGroup(group.id)">X</button>
    <h2>{{ group.title }}</h2>
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
      console.log('removing from preview', groupId);
    },
    addCard(groupId) {
      const title = this.card.title;
      if (!title) return;
      this.$emit('addCard', { groupId, card: this.card })
      console.log('preview', this.card, groupId)
      this.getEmptyCard();
    },

  },
  components: {
    cardPreview,
    Container,
    Draggable
  }
}
</script>