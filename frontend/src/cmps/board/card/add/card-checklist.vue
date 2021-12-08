<template>
  <section class="card-checklist">
    <form action="" @submit.prevent="addChecklist()">
      <label for="checklist-checklist">checklist</label>
      <input type="text" v-model="checklist" placeholder="checklist" />
      <button class="btn-action-list" @click="addChecklist()">Add</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "card-checklist",
  props: ["card"],
  data() {
    return {
      checklist: "",
    };
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
    group() {
      return this.$store.getters.currGroup;
    },
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    addChecklist() {
      if (!this.checklist) return;
      let card = this.cardCopy();
      card.checklists.unshift(this.checklist);
      this.$emit("closeActionModal", "checklist");
      this.$emit("updateCard", card);
      this.checklist = "";
    },
  },
};
</script>

<style>
</style>