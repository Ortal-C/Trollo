// Gets id from params

<template>
  <div class="board">
    <h1>Board</h1>
    <pre>{{board}}</pre>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'board',
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
