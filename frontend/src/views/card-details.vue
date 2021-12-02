// Details and edit, gets cardId from params

<template>
  <div class="card-details" v-if="card">
    <div class="card-details-header">
      <div class="card-details-header-content">
        <h2>{{card.title}}</h2>
        <!-- should be input -->
        <p>In list {{group.title}}</p>
      </div>
      <router-link :to="'/board/'+this.board._id">✖</router-link>
    </div>
    <div class="card-details-main-container">
      <div class="card-details-main">
        <div class="card-details-desc">
          <h2>Description</h2>
          <textarea placeholder="Add a more detailed description..."></textarea>
        </div>
        <div class="card-details-activity">
          <h2>Activity</h2>
          <!-- fix margin -->
          <div class="details-btn">Show details</div>
        </div>
          <textarea placeholder="Write a comment..."></textarea>
      </div>
      <div class="card-details-sidebar">
        <div class="add-to-card">
          <h3>Add to card</h3>
          <div>Members</div>
          <div>Labels</div>
          <div>Checklist</div>
          <div>Dates</div>
          <div>Attachment</div>
          <div>Cover</div>
        </div>
      </div>
    </div>
    <!-- <pre v-if="card">{{card.title}}</pre> -->
  </div>
</template>

<script>
import { boardService } from '../services/board.service.js';
export default {
  name: 'card-details',
  data() {
    return {
      card: null,
      group: null,
      board: null
    }
  },
  components: {
  },
  created() {
    console.log(this.boardId, this.groupId, this.cardId);
    if (this.cardId) {
        boardService.getById(this.boardId)
        .then(board => {
          this.board = board
          const group = board.groups.find(group => group.id === this.groupId)
          this.group =  group
          const card = group.cards.find(card => card.id === this.cardId)
          this.card = card
        })
      }
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    cardId() {
      return this.$route.params.cardId;
    },
  }
}
</script>