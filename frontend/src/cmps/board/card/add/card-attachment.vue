<template>
  <h1>Hello attachments</h1>
  
</template>

<script>
export default {

  name:'card-attachment',
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