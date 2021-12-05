<template>
<section>
  <input type="text" placeholder="Search members">
  <h4>Board members</h4>
  <pre>{{board.members}}</pre>
</section>
</template>

<script>
export default {
  name:'card-members',
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