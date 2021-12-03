// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <button class="remove-btn" @click="removeGroup(group.id)">X</button>
    <h2 contenteditable="true">{{ group.title }}</h2>
    <ul>
      <li v-for="card in group.cards" :key="card.id">
        <card-preview :card="card" :group="group" />
      </li>
     <form @submit.prevent="addCard(group.id)">
        <div class="card-add">
          <input
            v-model="card.title"
            type="text"
            placeholder="+ Add a card"
          />
        </div>
      </form>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import cardPreview from '../card/card-preview.vue'
export default {
  name: 'group-preview',
  props: ['group'],
  data(){
    return{
      card: {
        title: "",
      },
    }
  },
   created() {
       this.getEmptyCard();
  },
  methods: {
      getEmptyCard() {
      this.card = boardService.getEmptyCard();
    },
    removeGroup(groupId) {
      this.$emit('removeGroup', groupId)
    },
    addCard(groupId){
       const title = this.card.title;
      if (!title) return;
       this.$emit('addCard', {groupId, card:this.card})
       this.getEmptyCard();
    },
   
  },
  components: {
    cardPreview
  }
}
</script>