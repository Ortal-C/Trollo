<template>
  <h1>Hello cover</h1>
  
</template>

<script>
export default {

  name:'card-cover',
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