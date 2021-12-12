<template>
	<section class="card-members" v-if="board && card">
		<input type="text" v-model="searchBy" placeholder="Search members" @input="searchMembers" />
		<h4>Board members</h4>
		<ul v-for="(member, idx) in members" :key="member._id">
			<li :title="member.fullname" @click="toggleMember(member)">
				<el-avatar :size="30" :src="member.imgUrl"></el-avatar>
				<span class="member-name">{{ member.fullname }}</span>
				<span v-if="card.members[idx] === member"><i class="fas fa-check"></i></span>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'card-members',
		props: ['card'],
		data() {
			return {
				searchBy: '',
				members: null,
			}
		},
		created() {
			this.members = this.board.members
		},
		computed: {
			board() {
				return this.$store.getters.board || null
			},
			groupId() {
				return this.$route.params.groupId
			},
			// card() {
			// 	return this.$store.getters.currCard
			// },
		},
		methods: {
			cardCopy() {
				return JSON.parse(JSON.stringify(this.card))
			},
			toggleMember(currMember) {
				let card = this.cardCopy()
				const member = card.members.find((member) => member._id === currMember._id)
				if (!member) {
					card.members.push(currMember)
				} else {
					const memberIdx = card.members.findIndex((member) => member._id === currMember._id)
					card.members.splice(memberIdx, 1)
				}
				this.$emit('updateCard', card)
			},
			searchMembers() {
				const members = this.board.members.filter(member => {
					return member.fullname.toLowerCase().includes(this.searchBy.toLowerCase())
				})
				this.members = members || this.board.members
			},
		},
	}
</script>
