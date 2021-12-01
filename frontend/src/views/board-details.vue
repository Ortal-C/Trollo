// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details">
    <h1>Board details</h1>
    <pre>{{board}}</pre>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'board-details',
  components: {
  },
  created() {
    this.$store.dispatch({type: 'loadBoard'})
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  }
}
</script>
