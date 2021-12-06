// Gets each card

<template>
  <section class="card-preview-container" v-if="card">
    <section
      class="card-preview"
      v-if="!isEdit"
      :style="{ backgroundColor }"
      @click="cardDetails"
    >
      <button class="edit-card" @click.stop="openEditCard">🖊</button>
      <div
        class="card-cover"
        v-if="card.style.size === 'header'"
        :style="`background-color:${card.style.color}`"
      ></div>
      <div class="card-content">
        <div class="card-labels" v-if="labels && card.style.size !== 'full'" @click.stop="toggleLabels" >
          <div class="card-label" v-for="label in labels" :key="label.id" :class="classLabel" :style="`background-color:${label.color}`" >
            <span v-if="openLabels">{{ label.title }}</span>
          </div>
        </div>
        <p class="card-title">{{ card.title }}</p>
        <div class="card-icons" v-if="card.style.size !== 'full'">
          <div class="card-info">
            <span v-html="desc">{{ desc }}</span>
            <span v-if="card.dueDate" title="This card is due later">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                style="fill: darkgray"
              >
                <path
                  d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"
                ></path>
              </svg>
            </span>
            <span v-if="card.attachments.length > 0" title="Attachments">
              <svg
                class="action-svg"
                stroke="currentColor"
                fill="none"
                stroke-width=""
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                ></path>
              </svg>
              {{card.attachments.length}}
            </span>
          </div>
          <div class="card-members">
            <span v-for="member in card.members" :key="member._id">
              <el-avatar :size="30" :src="member.imgUrl"></el-avatar>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-else>
      <div class="card-edit-container">
        <form @change="editCard(group.id)">
          <textarea type="text" v-model="title" :placeholder="card.title" />
          <div class="card-icons" v-if="card.style.size === 'full'">
            <div class="card-info">
              <span title="This card has a description">{{ desc }}</span>
            </div>
            <div class="card-members">
              <span v-for="member in card.members" :key="member._id"
                ><el-avatar :size="30" :src="member.imgUrl"></el-avatar
              ></span>
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
    // getLabels() {
    //   if (this.card.labelsIds.length) {
    //     const labels = this.$store.getters.board.labels
    //     this.labels = labels.filter(label => {
    //       return this.card.labelsIds.includes(label.id)
    //     });
    //   }
    // },
    toggleLabels() {
      console.log('Toggle');
      this.openLabels = !this.openLabels
      console.log(this.openLabels);
    }
  },
  watch: {
    // "card.labelsIds"() {
    //   this.getLabels()
    // }
  },
  created() {
    // this.getLabels()
  },
  computed: {
    desc() {
       return (this.card.description) ? `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g fill="#34495e"> <path d="M26.875,32.25c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,57.33333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,82.41667c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,107.5c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,132.58333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h78.83333c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532z" ></path> </g> </g> </svg>`
 : ''
    },
    backgroundColor() {
      if (this.card.style.size === 'full') return this.card.style.color
    },
    classLabel() {
      // if (this.openLabels) return 'red'
      return { 'open': this.openLabels, 'close': !this.openLabels }
      // else return 'blue'
    },
  }
};
</script>