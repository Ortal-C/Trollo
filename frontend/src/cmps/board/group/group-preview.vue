// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <div class="group-header">
      <!-- <h2 v-if="!isTitleClicked" @click="isTitleClicked = !isTitleClicked">{{ group.title }}</h2> -->
      <h2 v-if="!currEdit" @click="changeCurrEdit">{{ group.title }}</h2>
      <form action="" v-else @change="editGroup()" @submit.prevent="editGroup()" >
        <input type="text" v-model="title" :placeholder="group.title"/>
      </form>
      <button class="menu-btn" @click="toggleMenu">
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
      <div v-if="isOpen" class="dynamic-popover">
        <div class="popover-header">
        <h3>List actions</h3>
        </div>
        <svg
          class="close-popover"
          @click="toggleMenu"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 172 172"
          style="fill: #000000"
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#666666">
              <path
                d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"
              ></path>
            </g>
          </g>
        </svg>
        <div class="list-action" @click="copyGroup(group)">Copy list...</div>
        <div class="list-action" @click="addCard(group.id)">Add card...</div>
        <div class="list-action" @click="removeGroup(group.id)">
          <!-- <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 14 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M13 2H1v2h12V2zM0 4a1 1 0 0 0 1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2zm2 1h10v9H2V5zm2 3h6V7H4v1z"
            ></path>
          </svg> -->
          Archive this list
        </div>
      </div>
    </div>
    <ul>
      <Container
        :group-name="dndName"
        @drop="handleDrop(idx, $event)" 
        :get-child-payload="getChildPayload">
        <Draggable v-for="card in group.cards" :key="card.id">
          <card-preview :card="card" :group="group" @saveCard="saveCard" />
        </Draggable>
      </Container>
      <div
        class="card-add-container"
        @click="isAddClicked = !isAddClicked"
        v-if="!isAddClicked">
        <svg
          width="16"
          height="16"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
            fill="currentColor"
          ></path>
        </svg>
        <p class="card-add">Add a card</p>
      </div>
      <form @submit.prevent="addCard(group.id)" v-else>
        <textarea class="card-add-textarea" v-model="card.title" placeholder="Enter a title for this card..."></textarea>
        <div class="actions-container">
          <button class="btn-add">Add card</button>
          <svg
            class="btn-close icon"
            @click.prevent="closeTextarea()"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style="
              color: rgb(66, 82, 110);
              font-size: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <path
              d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
            ></path>
          </svg>
        </div>
      </form>
    </ul>
  </div>
</template>

<script>
import cardPreview from '../card/card-preview.vue'
import { boardService } from '@/services/board.service.js'
import { Container, Draggable } from 'vue-smooth-dnd';
export default {
  name: 'group-preview',
  props: ['group', 'dndName', 'idx'],
  data() {
    return {
      card: {
        title: '',
      },
      title: this.group.title,
      isAddClicked: false,
      // isTitleClicked: false,
      isOpen: false,
      tmpGroup: {},
      draggingCard: {
        lane: this.idx,
        index: -1,
        data: {}
      }
    };
  },
  created() {
    this.getEmptyCard();
  },
  methods: {
    changeCurrEdit(){
      this.$store.commit({type: 'setCurrEdit', currEdit:this.group.id})
    },
    getEmptyCard() {
      this.card = boardService.getEmptyCard();
    },
    saveGroup(group) {
      this.$emit('saveGroup', group)
    },
    removeGroup(groupId) {
      this.$emit('removeGroup', groupId);
    },
    copyGroup(group) {
      let copiedGroup = this.groupCopy()
      copiedGroup.id = ''
      this.$emit('copyGroup', copiedGroup)
    },
    addCard(groupId) {
      this.isOpen=false
      this.isAddClicked = !this.isAddClicked
      const title = this.card.title;
      if (!title) return;
      this.$emit('saveCard', { groupId, card: this.card });
      this.getEmptyCard();
      // this.isAddClicked = false;
    },
    closeTextarea() {
      this.isAddClicked = false;
    },
    editGroup() {
      let group = this.groupCopy();
      group.title= this.title
      if(!group.title)return
      this.$emit('saveGroup', group);
    this.$store.commit({type: 'setCurrEdit', currEdit:null})
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    saveCard(groupId, card){
      console.log('preview', groupId, card);
      this.$emit('saveCard', {groupId, card} );
    },
    // DND
    groupCopy() {
      return JSON.parse(JSON.stringify(this.group))
    },
    handleDrop(lane, dropResult) {
      const { removedIndex, addedIndex } = dropResult;
      if (removedIndex !== null ||addedIndex !== null) {
        this.$emit('handleDrop', { lane, dropResult });
      }
    },
    getChildPayload(index) {
      return this.group.cards[index]
    },
  },
  computed:{
    currEdit(){
      return this.group.id === this.$store.getters.currEdit
    }
  },
  components: {
    cardPreview,
    Container,
    Draggable,
  },
};
</script>