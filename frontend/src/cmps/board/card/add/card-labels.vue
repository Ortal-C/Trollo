<template>
  <section class="card-labels">
    <section
      class="labels-preview"
      v-for="label in board.labels"
      :key="label.id"
    >
      <div
        class="label-preview"
        :style="`--custom_color: ${label.color}; background-color:${label.color};`"
      >
        <h4>{{ label.title }}</h4>
        <button class="btn-check-lable" @click="toggleLabel(label.id)">
          ✔
        </button>
      </div>
      <button>✏</button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'card-labels',
  props: ['card'],
  data() {
    return {

    }
  },
  methods: {
    toggleLabel(labelId) {
      let cardLabelIds = this.card.labelsIds.slice()
      if (this.card.labelsIds.length === 0 || !this.card.labelsIds.includes(labelId)) {
        cardLabelIds.push(labelId)
      }
      else {
        const idx = cardLabelIds.findIndex(id=> id===labelId)
        cardLabelIds.splice(idx, 1);
      }

      console.log(cardLabelIds)
      // this.$emit("toggleStar", { ...this.board, isStarred: this.isStarred });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
  }
}
</script>

<style>
</style>