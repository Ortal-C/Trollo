// Gets each card

<template>
  <section class="card-preview-container" v-if="card">
    <section class="card-preview" v-if="!isEdit" :style="{backgroundColor}" @click="cardDetails">
       <button class="edit-card" @click.stop="openEditCard">🖊</button>
      <div class="card-cover" v-if="card.style.size === 'header'" :style="`background-color:${card.style.color}`"></div>
      <div class="card-content">
        <div class="card-labels" v-if="labels && card.style.size !== 'full'" @click.stop="toggleLabels">
          <div class="card-label" v-for="label in labels" :key="label.id" :class="classLabel" :style="`background-color:${label.color}`">
            <span v-if="openLabels">{{label.title}}</span>
          </div>
        </div>
        <div class="card-title">
        <p>{{card.title}}</p>
        </div>
        <div class="card-icons" v-if=" card.style.size !== 'full'">
          <div class="card-info">
            <span>{{desc}}</span>
          </div>
          <div class="card-members">
          <span v-for="member in card.members" :key="member._id"><el-avatar :size="30" :src="member.imgUrl"></el-avatar></span>
          </div>
        </div>
      </div>
    </section>

    <section v-else>
       <div class="card-edit-container">
          <form @change="editCard(group.id)">
            <textarea type="text" v-model="title" :placeholder="card.title" />
             <div class="card-icons" v-if=" card.style.size === 'full'">
              <div class="card-info">
               <span>{{desc}}</span>
              </div>
              <div class="card-members">
                <span v-for="member in card.members" :key="member._id"><el-avatar :size="30" :src="member.imgUrl"></el-avatar></span>
              </div>
             </div>
          </form>
          <button @click="editCard(group.id)">Save</button>
        </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'card-preview',
  props: ['group', 'card'],
  data() {
    return {
      openLabels: false,
      isEdit: false,
      title: this.card.title,
      labels: []
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
    getLabels(){
      if (this.card.labelsIds.length) {
      const labels = this.$store.getters.board.labels
      this.labels = labels.filter(label => {
      return this.card.labelsIds.includes(label.id)
      });
      }
    },
    toggleLabels() {
      console.log('Toggle');
      this.openLabels = !this.openLabels
      console.log(this.openLabels);
    }
  },
  watch:{
    "card.labelsIds"(){
      this.getLabels()
    }
  },
    created(){
    this.getLabels()
  },
  computed: {
    desc() {
      if (this.card.description) return '🍔'
      else return ''
    },
    backgroundColor() {
      if (this.card.style.size === 'full') return this.card.style.color
    },
    classLabel() {
      // if (this.openLabels) return 'red'
      return {'open': this.openLabels, 'close': !this.openLabels}
      // else return 'blue'
    },
  }
};
</script>