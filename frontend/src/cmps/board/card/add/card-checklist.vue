<template>
  <section class="card-checklist">
    <form action="" @submit.prevent="addChecklist()">
      <label for="checklist-checklist">checklist</label>
      <input type="text" v-model="checklistTitle" placeholder="Checklist name..." />
      <button class="btn-action-list" @click="addChecklist()">Add</button>
    </form>
  </section>
</template>

<script>
import { utilService } from "@/services/util.service.js";
export default {
  name: "card-checklist",
  props: ["card"],
  data() {
    return {
      checklistTitle:'',
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
      if (!this.checklistTitle) return;
      let card = this.cardCopy();
      card.checklists.push({id: utilService.makeId(), title:this.checklistTitle, items:[], doneCount:0});
      this.$emit('closeActionModal', 'checklist');
      this.$emit('updateCard', card);
      this.checklistTitle = '';
    },
  },
};
</script>

<style>
</style>