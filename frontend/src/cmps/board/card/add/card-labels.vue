<template>
<section>
  <h1>Hello labels</h1>
  <pre>{{board.labels}}</pre>
</section>
</template>

<script>
export default {
  name:'card-labels',
  props: ['card'],
  data(){
    return{

    }
  },
  computed:{
    board() {
      return this.$store.getters.board || null;
    },
  }
}
</script>

<style>

</style>