<template>
  <h1>Hello checklist</h1>
  
</template>

<script>
export default {

  name:'card-checklist',
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