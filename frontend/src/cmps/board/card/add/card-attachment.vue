<template>
	<div class="card-attachment">
		<form @submit.prevent="onUpload($event)">
			<label>
				Attach a link
				<input v-model="attachment.url" type="url" placeholder="Pase any link here..." @change="attachment.type = 'link'" />
			</label>
			<label>
				Upload image or video from computer
				<input type="file" id="upload" @change="attachment.type = 'upload'" />
			</label>
			<label>
				Attachment name (optional)
				<input type="text" v-model="attachment.title" />
			</label>
			<el-button type="primary" @click="onUpload($event)">Attach</el-button>
		</form>
	</div>
</template>

<script>
	import {utilService} from '@/services/util.service.js'
	export default {
		name: 'card-attachment',

		data() {
			return {
				attachment: {
					type: '',
					url: '',
					title: 'Attachment',
					createdAt: Date.now(),
					isEdit: false,
				},
				isLoading: false,
			}
		},
		methods: {
			cardCopy() {
				return JSON.parse(JSON.stringify(this.card))
			},
			async onUpload(ev) {
				let tmpCard = this.cardCopy()
				if (this.attachment.type === 'link') {
					tmpCard.attachments.push(this.attachment)
				} else {
					const res = await utilService.upload(ev)
					tmpCard.attachments.push({...this.attachment, type: res.type, url: res.url})
					this.$notify({title: 'Finished!', type: 'success'})
				}
				await this.$store.dispatch({type: 'saveCard', payload: {groupId: this.groupId, card: tmpCard}})
			},
		},
		computed: {
			board() {
				return this.$store.getters.board || null
			},
			groupId() {
				return this.$route.params.groupId
			},
			card() {
				return this.$store.getters.currCard
			},
		},
	}
</script>
