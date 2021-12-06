<template>
  <section class="card-members" v-if="board">
    <input type="text" placeholder="Search members">
    <h4>Board members</h4>
    <ul v-for="member in board.members" :key="member._id">
      <li :title="member.fullname" @click="toggleMember(member)">
        <el-avatar :size="30" :src="member.imgUrl"></el-avatar>
        <span class="member-name">{{member.fullname}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name:'card-members',
  data() {
    return {
    }
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    card() {
      return this.$store.getters.currCard
    }
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async toggleMember(currMember) {
      let card = this.cardCopy()
      const member = card.members.find(member => member._id === currMember._id)
      if (!member) card.members.push(currMember)
      else {
        const memberIdx = card.members.findIndex(member => member._id === currMember._id)
        card.members.splice(memberIdx, 1)
      }
      await this.$store.dispatch({ type: "saveCard", payload: { groupId: this.groupId, card } });
    },
  },
}
</script>