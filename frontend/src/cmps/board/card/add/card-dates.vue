<template>
<h1>Hello Dates</h1>
</template>

<script>
export default {
  name:'card-dates',
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
