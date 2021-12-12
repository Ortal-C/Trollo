<template>
	<div class="card-dates" v-if="card">
		<form @submit.prevent="onDueDate()">
			<el-calendar v-model="value" :first-day-of-week="firstDayOfTheWeek"></el-calendar>
			<el-button type="primary" title="Save changes" @click="onDueDate()">Save</el-button>
			<el-button type="info" title="Discard" @click="discardChanges()">Discard</el-button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'card-dates',
		props: ['card'],
		data() {
			return {
				value: '',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now()
					},
					shortcuts: [
						{
							text: 'Today',
							onClick(picker) {
								picker.$emit('pick', new Date())
							},
						},
						{
							text: 'Tomorrow',
							onClick(picker) {
								const date = new Date()
								date.setTime(date.getTime() + 3600 * 1000 * 24)
								picker.$emit('pick', date)
							},
						},
						{
							text: 'In one week',
							onClick(picker) {
								const date = new Date()
								date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
								picker.$emit('pick', date)
							},
						},
						{
							text: 'In a month',
							onClick(picker) {
								const date = new Date()
								date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
								picker.$emit('pick', date)
							},
						},
					],
				},
			}
		},
		created() {
			this.value = Date(this.card.dueDate) || ''
		},
		methods: {
			cardCopy() {
				return JSON.parse(JSON.stringify(this.card))
			},
			discardChanges() {
				this.$emit('closeActionModal', 'dates')
			},
			async onDueDate() {
				let tmpCard = this.cardCopy()
				tmpCard.dueDate = this.value
				// await this.$store.dispatch({type: 'saveCard', payload: {groupId: this.groupId, card: tmpCard}})
				this.$notify({title: 'Saved!', type: 'success'})
				this.$emit('updateCard', tmpCard)
				this.$emit('closeActionModal', 'dates')
			},
		},
		computed: {
			firstDayOfTheWeek() {
				return parseInt(7)
			},
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
		watch: {
			value(newVal, oldVal) {
				// console.log('value has changed!');
			},
		},
	}
</script>
