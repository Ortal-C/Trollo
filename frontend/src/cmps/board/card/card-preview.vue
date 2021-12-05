// Gets each card

<template>
  <div class="card-container">
    <div v-if="!isEdit" class="card-preview" @click="cardDetails">
        <p>{{ card.title }}</p>
    <span>{{desc}}</span>
        <button class="edit-card" @click.stop="openEditCard">🖊</button>
    </div>
    <div class="card-edit-container" v-else>
      <form @change="editCard(group.id)">
        <textarea type="text" v-model="title" :placeholder="card.title" />
      </form>
      <button @click="editCard(group.id)">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-preview',
  props: ['group', 'card'],
  data() {
    return {
      isEdit: false,
      title: this.card.title,
    };
  },
  components: {},
  methods: {
    cardDetails() {
      this.$router.push('/board/b101/' + this.group.id + '/' + this.card.id);
      document.body.classList.add('details-open');
    },
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    openEditCard() {
      this.isEdit = true;
      document.body.classList.add('details-open');
    },
    editCard(groupId) {
      document.body.classList.remove('details-open');
      this.isEdit = false;
      let card = this.cardCopy();
      card.title = this.title;
      if (!card.title) return;
      this.$emit('saveCard', groupId, card);
    },
  },
  computed:{
    desc(){
      if(this.card.description) return '🍔'
      else return ''
    }
  }
};
</script>