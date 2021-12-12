<template>
  <section class="card-cover" v-if="card">
    <h4>Size</h4>
    <div class="cover-options">
      <div class="header-cover-preview option" @click="updateSize('header')" title="header cover">
        <div class="header-section"></div>
        <div></div>
      </div>
      <div class="full-cover-preview option" @click="updateSize('full')" title="full cover"></div>
    </div>
    <button class="remove-cover" @click="removeCover">Remove cover</button>
    <h4 class="color-title">Color</h4>
    <div class="colors-container">
    <div v-for="color in colors" :key="color" :style="`background-color:${color}`" class="color" @click="updateColor(color)"></div>
    </div>
  </section>
</template>

<script>
export default {
  name:'card-cover',
  props: ['card'],
  data(){
    return{
      colors: ['#eb3b5a', '#fa8231', '#f7b731', '#20bf6b', '#0fb9b1', '#45aaf2', '#4b7bec', '#a55eea', '#4b6584', '#a5b1c2']
    }
  },
  computed:{
    board() {
      return this.$store.getters.board || null;
    },
    // card() {
    //   return this.$store.getters.currCard
    // },
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
      this.$emit('updateCard', card)
    },
    updateColor(color) {
      let card = this.cardCopy()
      if (!card.style.size) card.style.size = 'header'
      card.style.color = color
      this.$emit('updateCard', card)
    },
    removeCover() {
      let card = this.cardCopy()
      card.style = {size: '', color: ''}
      this.$emit('updateCard', card)
    }
  }
}
</script>