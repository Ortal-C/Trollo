<template>
  <section class="card-cover" v-if="card">
    <h4>Size</h4>
    <div class="cover-options">
      <div class="header-cover-preview option" @click="updateSize('header')">
        <div class="header-section"></div>
        <div></div>
      </div>
      <div class="full-cover-preview option" @click="updateSize('full')"></div>
    </div>
    <button class="remove-cover" @click="removeCover">Remove cover</button>
    <h4>Color</h4>
    <div class="colors-container">
    <div v-for="color in colors" :key="color" :style="`background-color:${color}`" class="color" @click="updateColor(color)"></div>
    </div>
  </section>
</template>

<script>
export default {

  name:'card-cover',
  // props: ['card'],
  data(){
    return{
      colors: ['#cc0033', '#ff8000', '#ffbf00', '#00cc00', '#0099cc', '#66d9ff', '#bf80ff', '#ff66ff', '#ff4da6'],
    }
  },
  computed:{
    board() {
      return this.$store.getters.board || null;
    },
    card() {
      return this.$store.getters.currCard
    },
    group() {
      return this.$store.getters.currGroup
    }
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    updateSize(size) {
      let card = this.cardCopy()
      card.style.size = size
      this.$store.dispatch({ type: "saveCard", payload: { groupId: this.group.id, card } });
    },
    updateColor(color) {
      let card = this.cardCopy()
      if (!card.style.size) card.style.size = 'header'
      card.style.color = color
      this.$store.dispatch({ type: "saveCard", payload: { groupId: this.group.id, card } });
    },
    removeCover() {
      let card = this.cardCopy()
      card.style = {size: '', color: ''}
      this.$store.dispatch({ type: "saveCard", payload: { groupId: this.group.id, card } });
    }
  }
}
</script>