// Gets id from params, render currBoard // v-for group in groups group-preview, send group prop

<template>
	<div class="board-details" v-if="board">
		<board-nav @updateBoard="updateBoard" />
		<section class="groups-container" v-dragscroll.x="true">
			<!-- <Container class="groups-container"
        :group-name='dndName' @drop="handleDrop"
        :get-child-payload="getChildPayload" > -->
			<!-- <Draggable> -->
			<group-preview v-for="(group, idx) in board.groups" :key="idx" @saveCard="saveCard" @saveGroup="saveGroup" @removeGroup="removeGroup" @copyGroup="copyGroup" @handleDrop="handleDrop" :group="group" :idx="idx" :dndName="dndName" />
			<!-- </Draggable> -->
			<router-view></router-view>
			<div class="group-add" @click="isAddGroup = !isAddGroup" v-if="!isAddGroup">
				<svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" fill="currentColor"></path></svg>
				<p>Add another list</p>
			</div>
			<div class="add-group-container" v-else>
				<form @submit.prevent="addGroup">
					<input v-model="group.title" placeholder="Enter list title..." />
					<div class="actions-container">
						<button class="btn-add">Add List</button>
						<svg class="btn-close icon" @click.prevent="closeInput" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(66, 82, 110); font-size: 24px; display: flex; align-items: center; justify-content: center">
							<path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
						</svg>
					</div>
				</form>
			</div>
			<!-- </Container> -->
		</section>
	</div>
</template>

<script>
	import {boardService} from '@/services/board.service.js'
	import {socketService} from '@/services/socket.service.js'
	import boardNav from '@/cmps/board/board-nav.vue'
	import groupPreview from '@/cmps/board/group/group-preview.vue'
	import {Container, Draggable} from 'vue-smooth-dnd'
	export default {
		name: 'board-details',
		data() {
			return {
				group: {
					title: '',
				},
				tmpBoard: null,
				isAddGroup: false,
			}
		},
		async created() {
			const boardId = this.$route.params.boardId
			let board = await this.$store.dispatch({type: 'loadBoard', boardId})
			socketService.emit('board id', boardId)
			socketService.on('board-watch', this.setBoard)
			// document.body.style.backgroundColor = board.style
			this.updateBackground()
			this.getEmptyGroup()
		},
		methods: {
			async updateBoard(board) {
				await this.$store.dispatch({type: 'updateBoard', board})
				socketService.emit('board-watch', board)
			},
			setBoard(board) {
				this.$store.commit({type: 'setBoard', board})
			},
			getEmptyGroup() {
				this.group = boardService.getEmptyGroup()
				// socketService.emit('board-watch', this.board)
			},
			async addGroup() {
				const title = this.group.title
				if (!title) return
        		await this.$store.dispatch({type: 'saveGroup', group: this.group})
				socketService.emit('board-watch', this.board)
				this.getEmptyGroup()
				this.isAddGroup = false
			},
			async removeGroup(groupId) {
				await this.$store.dispatch({type: 'removeGroup', groupId})
				socketService.emit('board-watch', this.board)
			},
			async saveGroup(group) {
				await this.$store.dispatch({type: 'saveGroup', group})
				socketService.emit('board-watch', this.board)
			},
			async copyGroup(group) {
				await this.$store.dispatch({type: 'saveGroup', group})
				socketService.emit('board-watch', this.board)
			},
			async saveCard({groupId, card}) {
				await this.$store.dispatch({type: 'saveCard', payload: {groupId, card}})
				socketService.emit('board-watch', this.board)
			},
			closeInput() {
				this.isAddGroup = false
			},
			// DND
			boardCopy() {
				this.tmpBoard = JSON.parse(JSON.stringify(this.board))
			},
			async handleDrop({lane, dropResult}) {
				const {removedIndex, addedIndex, payload} = dropResult
				if (removedIndex !== null || addedIndex != null) {
					if (!this.tmpBoard) this.boardCopy()
					if (removedIndex !== null) {
						this.tmpBoard.groups[lane].cards.splice(removedIndex, 1)
					}
					if (addedIndex !== null) {
						this.tmpBoard.groups[lane].cards.splice(addedIndex, 0, payload)
						await this.$store.dispatch({type: 'updateBoard', board: this.tmpBoard})
						socketService.emit('board-watch', this.board)
						this.tmpBoard = null
					}
				}
			},
			getChildPayload(index) {
				return { index }
			},
			updateBackground() {
				if (this.board.style.length > 10) {
					document.body.style.backgroundImage = `url("${this.board.style}")`
					document.body.style.backgroundColor = 'none'
					document.body.style.backgroundPosition = 'center'
					document.body.style.backgroundRepeat = 'no-repeat'
					document.body.style.backgroundSize = 'cover'
				}
				else {
					document.body.style.backgroundColor = this.board.style
					document.body.style.backgroundImage = 'none'
				}
			}
		},
		computed: {
			board() {
				return this.$store.getters.board
			},
			groups() {
				return this.$store.getters.board.groups
			},
			dndName() {
				return 'Trollo'
			},
		},
		watch: {
			board() {
				this.updateBackground()
			},
		},
		components: {
			boardNav,
			groupPreview,
			Container,
			Draggable,
		},
	}
</script>
