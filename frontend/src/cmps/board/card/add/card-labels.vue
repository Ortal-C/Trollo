<template>
  <section class="card-labels">
    <section class="labels-preview" v-for="label in board.labels" :key="label.id" >
      <div class="label-preview" @click="toggleLabel(label.id)" :style="`--custom_color: ${label.color}; background-color:${label.color};`" >
        <h4>{{ label.title }}</h4>
        <!-- <button class="labelClass" > ✔</button> -->
      </div>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 172 172" style=" fill:rgba(9, 30, 66, 0.212);"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M131.96744,14.33333c-1.83467,0 -3.66956,0.70211 -5.06706,2.09961l-91.06706,91.06706c0,0 7.2025,0.03583 10.75,3.58333c3.5475,3.5475 3.47135,10.63802 3.47135,10.63802c0,0 7.30015,0.13348 10.86198,3.69531c3.56183,3.56183 3.58333,10.75 3.58333,10.75l91.06706,-91.06706c2.80217,-2.80217 2.80217,-7.33911 0,-10.13412l-18.53255,-18.53255c-1.3975,-1.3975 -3.23239,-2.09961 -5.06706,-2.09961zM131.96744,31.63411l8.39844,8.39844l-7.51661,7.5166l-8.39844,-8.39844zM114.31673,49.28483l8.39844,8.39844l-54.91178,54.91179c-1.79883,-1.23267 -3.69363,-2.1668 -5.55697,-2.88347c-0.70233,-1.849 -1.62314,-3.72331 -2.84147,-5.51498zM26.30111,121.83333l-4.80111,28.66667l28.66667,-4.80111z"></path></g></g></svg>
      </button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'card-labels',
  data() {
    return {
    }
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async toggleLabel(labelId) {
      let card = this.cardCopy()
      const label = card.labelsIds.find(id=> id===labelId)
      if (!label) card.labelsIds.push(labelId)
      else {
        const idx = card.labelsIds.findIndex(id=> id===labelId)
        card.labelsIds.splice(idx, 1);
      }
      await this.$store.dispatch({ type: "saveCard", payload: { groupId: this.groupId, card } });

    },
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    card() {
      return this.$store.getters.currCard
    },
    labelClass(){
      return {'btn-check-lable': false}
    },
  }
}
</script>

<style>
</style>