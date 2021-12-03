// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <div class="group-header">
      <h2 contenteditable="true">{{ group.title }}</h2>
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
      <div v-if="isOpen" class="group-menu">
        <h3>List actions</h3>
        <svg
          class="close-svg"
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
        <div class="archive-group" @click="removeGroup(group.id)">
          <svg
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
          </svg>
          Archive
        </div>
      </div>
    </div>
    <ul>
      <Container
        :group-name="group.title"
        @drag-start="handleDragStart(group.title, $event)"
        @drop="handleDrop(group.title, $event)"
        :get-child-payload="getChildPayload"
      >
        <Draggable v-for="card in group.cards" :key="card.id">
          <card-preview :card="card" :group="group" />
        </Draggable>
      </Container>
      <div class="card-add-container" @click="isClicked = !isClicked" v-if="!isClicked">
      <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" fill="currentColor"></path></svg>
      <p class="card-add">Add a card</p>
      </div>
      <form @submit.prevent="addCard(group.id)" v-else>
        <textarea
          v-model="card.title"
          placeholder="Enter a title fot this card..."
        ></textarea>
        <div class="actions-container">
        <button class="btn-add">Add card</button>
        <svg class="btn-close icon" @click.prevent="closeTextarea()" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(66, 82, 110); font-size: 24px; display: flex; align-items: center; justify-content: center;"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path></svg>
        </div>
      </form>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import cardPreview from '../card/card-preview.vue'
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: 'group-preview',
  props: ['group'],
  data() {
    return {
      tmpGroup: {},
      card: {
        title: "",
      },
      isClicked: false,
      isOpen: false,
      draggingCard: {
        groupTitle: "",
        index: -1,
        cardData: {},
      },
    }
  },
  created() {
    this.groupCopy();
    this.getEmptyCard();
  },
  methods: {
    getEmptyCard() {
      this.card = boardService.getEmptyCard();
    },
    saveGroup(groupId) {
      this.$emit('saveGroup', groupId)
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    addCard(groupId) {
      const title = this.card.title;
      if (!title) return;
      this.$emit('addCard', { groupId, card: this.card })
      this.getEmptyCard();
      this.isClicked = false
    },
    closeTextarea(){
       this.isClicked = false 
    },
    toggleMenu() {
      console.log('Toggle menu');
      this.isOpen = !this.isOpen
    },
    // DND
    groupCopy() {
      this.tmpGroup = JSON.parse(JSON.stringify(this.group))
    },
    handleDragStart(groupTitle, dragResult) {
      this.groupCopy();
      const { payload, isSource } = dragResult
      if (isSource) {
        this.draggingCard = {
          groupTitle,
          index: payload.index,
          cardData: { ...this.tmpGroup.cards[payload.index] },
        }
      }
    },
    handleDrop(groupTitle, dropResult) {
      const { removedIndex, addedIndex } = dropResult;
      if (groupTitle === this.draggingCard.groupTitle && removedIndex === addedIndex) return;
      else {
        if (removedIndex !== null) {
          this.tmpGroup.cards.splice(removedIndex, 1);
        }
        if (addedIndex !== null) {
          this.tmpGroup.cards.splice(addedIndex, 0, this.draggingCard.cardData);
        }
        this.saveGroup(this.tmpGroup)
      }
    },
    getChildPayload(index) {
      return {
        index,
      }
    },

  },
  components: {
    cardPreview,
    Container,
    Draggable
  }
}
</script>