// Gets id from params, render currBoard
// v-for group in groups group-preview, send group prop

<template>
  <div class="board-details" v-if="board">
    <h1>Board details</h1>
    <board-nav />
    <section class="groups-container">
    <group-preview v-for="group in board.groups" :key="group.id" :group="group"/>
    </section>
    <!-- <pre>{{board}}</pre> -->
  </div>
</template>

<script>
// @ is an alias to /src
import boardNav from '@/cmps/board/board-nav.vue'
import groupPreview from '@/cmps/board/group/group-preview.vue'
export default {
  name: 'board-details',
  components: {
    boardNav,
    groupPreview
  },
  created() {
    this.$store.dispatch({type: 'loadBoard'})
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    groups() {
      return this.$store.getters.board.groups
    }
  }
}
</script>
