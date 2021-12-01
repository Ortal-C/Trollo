// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <h1>Group preview</h1>
    <ul>
      <li v-for="card in group.cards" :key="card.id">
        <card-preview :card="card" />
      </li>
    </ul>
    <pre>{{group}}</pre>
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