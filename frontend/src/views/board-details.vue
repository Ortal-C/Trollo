// Gets id from params

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
