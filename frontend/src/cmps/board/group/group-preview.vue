// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <button class="remove-btn" @click="removeGroup(group.id)">X</button>
    <h2>{{group.title}}</h2>
    <ul>
      <li v-for="card in group.cards" :key="card.id">
        <card-preview :card="card" />
      </li>
       <div class="card-add" @click="addCard()">Add another card</div>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import cardPreview from '../card/card-preview.vue'
export default {
  name: 'group-preview',
  props: ['group'],
  methods:{
 removeGroup(groupId){
          this.$emit('removeGroup', groupId)
          console.log('removing from preview', groupId);
      }
  },
  components: {
    cardPreview
  }
}
</script>