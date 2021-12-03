// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <div class="group-header">
      <h2 contenteditable="true">{{ group.title }}</h2>
      <button class="menu-btn" @click="openMenu">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button class="remove-btn" @click="removeGroup(group.id)">X</button>
    </div>
    <ul>
      <li v-for="card in group.cards" :key="card.id">
        <card-preview :card="card" :group="group" />
      </li>
       <p class="card-add" @click="isClicked=!isClicked" v-if="!isClicked"> + Add a card</p>
      <form @submit.prevent="addCard(group.id)" v-else>
           <textarea v-model="card.title" name="" id="" cols="36.5" rows="3" placeholder="Enter a title fot this card"></textarea>
           <button>Add card</button>
      </form>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import cardPreview from "../card/card-preview.vue";
export default {
  name: "group-preview",
  props: ["group"],
  data() {
    return {
      card: {
        title: "",
      },
      isClicked: false,
    };
  },
  created() {
    this.getEmptyCard();
  },
  methods: {
    getEmptyCard() {
      this.card = boardService.getEmptyCard();
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    addCard(groupId) {
      const title = this.card.title;
      if (!title) return;
      this.$emit("addCard", { groupId, card: this.card });
      this.getEmptyCard();
      this.isClicked=false
    },
    openMenu() {
      console.log("Open menu");
    },
  },
  components: {
    cardPreview,
  },
};
</script>