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
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24" style="fill: darkgray" >
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"></path></svg>
            </span>
            <!-- <pre>{{card.attachments}}</pre> -->
            <!-- <span v-if="card.attachments.length" title="Attachments">
              <svg class="action-svg" stroke="currentColor" fill="none" stroke-width="" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" ></path> </svg> -->
              <!-- {{card.attachments.length}} -->
            <!-- </span> -->
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
             <div class="card-icons" v-if=" card.style.size === 'full'">
              <div class="card-info">
               <span title="This card has a description">{{desc}}</span>
              </div>
              <div class="card-members">
                <span v-for="member in card.members" :key="member._id"><el-avatar :size="30" :src="member.imgUrl"></el-avatar></span>
              </div>
             </div>
          </form>
          <button @click="editCard(group.id)">Save</button>
        </div>
        <div class="card-actions">
          <button @click="cardDetails">Open card</button>
          <button v-for="action in actions" :key="action.type" @click="action.isOpen = !action.isOpen"><span v-html="action.svg"></span> <p>{{action.title}}</p>
            <div v-if="action.isOpen" class="dynamic-popover">
              <div class="popover-header">
                <span class="popover-title"> {{ action.title }} </span>
                <span
                  v-html="getCloseSvg"
                  @click="action.isOpen = false"
                ></span>
              </div>
              <component :card="card" :is="`card-${action.type}`"></component>
            </div>
          </button>
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
      labels: [],
      actions: [
        // {
        //   title: 'Open card',
        //   type: 'open',
        //   isOpen: false,
        //   svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <circle fill="none" cx="12" cy="7" r="3"></circle> <path   d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" ></path> </svg>`,
        // },
        {
          title: 'Edit labels',
          type: 'labels',
          isOpen: false,
          svg: ` <svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path   d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z" ></path> </svg>`,
        },
        {
          title: 'Change members',
          type: 'members',
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <circle fill="none" cx="12" cy="7" r="3"></circle> <path   d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" ></path> </svg>`,
        },
        {
          title: 'Change cover',
          type: 'cover',
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M4 9C4 8.44772 4.44772 8 5 8H9C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9Z" fill="currentColor" ></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 3C1.79086 3 0 4.79086 0 7V17C0 19.2091 1.79086 21 4 21H20C22.2091 21 24 19.2091 24 17V7C24 4.79086 22.2091 3 20 3H4ZM20 5H4C2.89543 5 2 5.89543 2 7V14H22V7C22 5.89543 21.1046 5 20 5ZM22 16H2V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V16Z" fill="currentColor" ></path></svg>`,
        },
        {
          title: 'Move',
          type: 'move',
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`,
        },
        {
          title: 'Copy',
          type: 'copy',
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`,
        },
        {
          title: 'Edit date',
          type: 'dates',
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path   fill-rule="evenodd"   d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z"   clip-rule="evenodd" ></path> <path   fill-rule="evenodd"   d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"   clip-rule="evenodd" ></path> </svg>`,
        },
        {
          title: 'Archive',
          type: 'archive',
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 14 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" d="M13 2H1v2h12V2zM0 4a1 1 0 0 0 1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2zm2 1h10v9H2V5zm2 3h6V7H4v1z" ></path> </svg>`,
        },
      ],
    };
  },
  components: {},
  methods: {
    cardDetails() {
      if (this.isEdit = true) this.isEdit = false
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
    getLabels() {
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
    },
  },
  watch: {
    "card.labelsIds"() {
      this.getLabels()
    }
  },
  created() {
    this.getLabels()
  },
  computed: {
    desc() {
       return (this.card.description) ? `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g fill="#34495e"> <path d="M26.875,32.25c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,57.33333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,82.41667c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,107.5c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,132.58333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h78.83333c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532z" ></path> </g> </g> </svg>`
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