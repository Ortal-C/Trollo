// Gets each card

<template>
  <div class="card-preview" @click="cardDetails">
    <p>{{ card.title }}</p>
    <!-- ADD NEW CARD -->
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "card-preview",
  props: ["group", "card"],
  components: {},
  methods: {
    cardDetails() {
      this.$router.push("/board/b101/" + this.group.id + "/" + this.card.id);
      document.body.classList.add("details-open");
    },
  },
};
</script>