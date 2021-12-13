// Gets each card

<template>
  <section class="card-preview-container" v-if="card">
    <section class="card-preview" v-if="!isEdit" :style="backgroundColor" @click="cardDetails">
      <button class="edit-card" @click.stop="openEditCard"><i class="far fa-edit"></i></button>
      <div class="card-cover" v-if="card.style.size === 'header'" :style="card.style.color.includes('cloudinary') ? `background: url(${card.style.color}); background-size: cover; height: 224px;` : `background-color:${card.style.color}`"></div>
      <div class="card-content">
        <div class="card-labels" v-if="labels && card.style.size !== 'full'" @click.stop="toggleLabels" >
          <div class="card-label" v-for="label in labels" :key="label.id" :class="classLabel" :style="`background-color:${label.color}`" >
            <span >{{ label.title }}</span>
          </div>
        </div>
        <p class="card-title">{{ card.title }}</p>
        <div class="card-icons" v-if="card.style.size !== 'full'">
          <div class="card-info">
            <span v-if="card.checklists.length"><i class="far fa-check-square"></i></span>
            <span v-if="card.description"><i class="fas fa-align-left"></i></span>
             <span v-if="card.comments.length"><i class="far fa-comment-alt"></i></span>
            <span v-if="card.dueDate " :title="`This card is ${card.isDone ? 'complete' : 'due later'}`">
              <i class="far fa-clock"><i v-if="card.isDone" class="fas fa-check"/></i>
            </span>
                  
            <span v-if="card.attachments.length" title="Attachments">
              <i class="fas fa-paperclip"></i>{{card.attachments.length}}
            </span>
          </div>
          <div class="card-members">
            <span v-for="member in card.members" :key="member._id">
              <el-avatar :size="28" :src="member.imgUrl"></el-avatar>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-else>
       <div class="card-edit-container">
          <form @change="editCard(group.id)">
            <div class="card-labels" v-if=" card.style.size === 'full' && card.labelsIds.length" @click.stop="toggleLabels">
              <div class="card-label" v-for="label in labels" :key="label.id" :style="`background-color:${label.color}`">
                <span v-if="openLabels">{{ label.title }}</span>
              </div>
            </div>
            <textarea type="text" v-model="title" :placeholder="card.title" />
             <div class="card-icons" v-if=" card.style.size === 'full'">
              <div class="card-info">
               <span v-if="card.description"><i class="fas fa-align-left"></i></span>
              </div>
              <div class="card-members">
                <span v-for="member in card.members" :key="member._id">
                  <el-avatar :size="28" :src="member.imgUrl"></el-avatar>
                </span>
              </div>
             </div>
            </form>
            <button @click="editCard(group.id)">Save</button>
        </div>
        <div class="card-actions">
          <div class="action-div" @click="cardDetails">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M28.66667,28.66667c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v14.33333v21.5v50.16667c0,7.91917 6.41417,14.33333 14.33333,14.33333h114.66667c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-50.16667v-21.5v-14.33333c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM28.66667,43h114.66667v14.33333h-114.66667zM28.66667,78.83333h114.66667v50.16667h-114.66667z"></path></g></g></svg>
            Open card
          </div>
          <div v-for="action in actions" :key="action.type">
            <div class="action-div" @click="action.isOpen = !action.isOpen">
              <span v-html="action.fa"></span>
              {{ action.title }}
            </div>
            <div v-if="action.isOpen" class="dynamic-popover">
              <div class="popover-header">
                <span class="popover-title">{{ action.title }}</span>
                <span v-html="getCloseSvg" @click="action.isOpen = false"
                  @keydown.esc="action.isOpen = false" ></span>
              </div>
              <component :card="card" :is="`card-${action.type}`" 
                @closeActionModal="closeActionModal" @updateCard="updateCard" >
              </component>
            </div>
          </div>
          <!-- <div class="action-div" @click="removeCard(group.id, card.id)">
            <i class="fas fa-archive"></i>
            Move
          </div> -->
          <div class="action-div" @click="cloneCard(card)">
            <i class="far fa-copy"></i>
            Copy
          </div>
          <div class="action-div" @click="removeCard(group.id, card.id)">
            <i class="fas fa-archive"></i>
            Archive
          </div>
        </div>
    </section>
  </section>
</template>

<script>
import cardMembers from "@/cmps/board/card/add/card-members.vue";
import cardLabels from "@/cmps/board/card/add/card-labels.vue";
import cardChecklist from "@/cmps/board/card/add/card-checklist.vue";
import cardDates from "@/cmps/board/card/add/card-dates.vue";
import cardAttachment from "@/cmps/board/card/add/card-attachment.vue";
import cardCover from "@/cmps/board/card/add/card-cover.vue";

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
        {
          title: 'Edit labels',
          type: 'labels',
          isOpen: false,
          fa: `<i class="fas fa-tag"></i>`
        },
        {
          title: 'Change members',
          type: 'members',
          isOpen: false,
          fa: `<i class="far fa-user"></i>`
        },
        {
          title: 'Change cover',
          type: 'cover',
          isOpen: false,
          fa: `<svg class="action-svg" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M4 9C4 8.44772 4.44772 8 5 8H9C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9Z" fill="currentColor" ></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 3C1.79086 3 0 4.79086 0 7V17C0 19.2091 1.79086 21 4 21H20C22.2091 21 24 19.2091 24 17V7C24 4.79086 22.2091 3 20 3H4ZM20 5H4C2.89543 5 2 5.89543 2 7V14H22V7C22 5.89543 21.1046 5 20 5ZM22 16H2V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V16Z" fill="currentColor" ></path></svg>`,
        },        
        {
          title: 'Edit date',
          type: 'dates',
          isOpen: false,
          fa: `<i class="far fa-clock"></i>`
        },
        {
          title: 'Move',
          type: 'move',
          isOpen: false,
          fa: `<i class="fas fa-arrow-right"></i>`
        }
      ],
    };
  },
  watch: {
    'card.labelsIds'() {
      this.getLabels();
    },
  },
  created() {
    if (this.card) this.getLabels();
  },
  methods: {
    closeActionModal(type) {
      let action = this.actions.find((action) => action.type === type);
      if (action) action.isOpen = false;
    },
    updateCard(card) {
      console.log('in updateCard > cardPrev', this.group.id, card) 
      this.$emit('saveCard', { groupId:this.group.id, card});
    },  
    cardDetails() {
      if (this.isEdit = true) this.isEdit = false;
      this.$router.push(`/board/${this.board._id}/` + this.group.id + '/' + this.card.id);
      document.body.classList.add('details-open');
    },
		cloneCard(card) {
			const copiedCard = {...card, id: ''}
			this.$emit('saveCard', {groupId: this.group.id , card: copiedCard})
      document.body.classList.remove('details-open');
      this.isEdit = false;
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
      if (!card.title || card.title === this.title) return;
      card.title = this.title;
      this.$emit('saveCard', groupId, card);
    },
    async removeCard(groupId, cardId) {
      await this.$store.dispatch({ type: "removeCard", payload: { groupId, cardId }});
      this.isEdit = false;
      document.body.classList.remove('details-open');
    },
    getLabels() {
      if (this.card.labelsIds.length) {
        const labels = this.$store.getters.board.labels;
        this.labels = labels.filter(label => this.card.labelsIds.includes(label.id));
      }
    },
    toggleLabels() {
        this.$nextTick(() => {
          const labels = document.querySelectorAll('.card-label')
          labels.forEach(label => {
              label.classList.toggle('open')
              label.classList.toggle('close')
            })
        })
        this.openLabels = !this.openLabels
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    backgroundColor() {
      if (this.card.style.size === 'full') return `background-color: ${this.card.style.color}; height: 52px; padding-top: 18px; font-weight: 600;`
    },
    classLabel() {
      return { open: this.openLabels, close: !this.openLabels };
    },
    getCloseSvg() {
      return `<svg class="close-popover" @click="action.isOpen = false" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g fill="#666666"> <path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z" ></path> </g> </g> </svg>`;
    },
  },
  components: {
    cardMembers,
    cardLabels,
    cardChecklist,
    cardDates,
    cardAttachment,
    cardCover,
  },
};
</script>