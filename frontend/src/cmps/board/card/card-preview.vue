// Gets each card

<template>
  <div class="card-container">
    <button class="edit-card" @click="isEdit = !isEdit">🖊</button>
    <div v-if="!isEdit" class="card-preview" @click="cardDetails">
        <p>{{ card.title }}</p>
      <!-- ADD NEW CARD -->
    </div>
    <form action="" v-else @submit.prevent="editCard(group.id)">
      <input  type="text" v-model="title" :placeholder="card.title" />
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "card-preview",
  props: ["group", "card"],
  data() {
    return {
      isEdit: false,
      title: "",
    };
  },
  components: {},
  methods: {
    cardDetails() {
      this.$router.push("/board/b101/" + this.group.id + "/" + this.card.id);
      document.body.classList.add("details-open");
    },
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    editCard(groupId) {
      this.isEdit = false;
      let card = this.cardCopy();
      card.title = this.title;
      if (!card.title) return;
      this.$emit("saveCard", groupId, card);
    },
   
  },
};
</script>