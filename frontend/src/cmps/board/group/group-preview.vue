// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <h2>{{group.title}}</h2>
    <ul>
      <li v-for="card in group.cards" :key="card.id">
        <card-preview :card="card" :group="group" />
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import cardPreview from '../card/card-preview.vue'
export default {
  name: 'group-preview',
  props: ['group'],
  components: {
    cardPreview
  }
}
</script>