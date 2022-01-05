// Gets each group // v-for card in cards to card-preview, send card prop

<template>
	<div class="group-preview">
		<div class="group-header">
			<h2 v-if="!currEdit" @click="changeCurrEdit">{{ group.title }}</h2>
			<form v-else @submit.prevent="editGroup()" @keydown.esc="editGroup()">
				<input type="text" v-model="title" :placeholder="group.title" autofocus />
			</form>
			<button class="menu-btn" @click="toggleMenu">
				<svg-menu color="#6b778c" />
			</button>
			<div v-if="isOpen" class="dynamic-popover">
				<div class="popover-header">
					<h3>List actions</h3>
					<div class="close-svg" @click="toggleMenu"><svg-close color="#6b778c" size="14px"/></div>
				</div>
				<div class="list-action" @click="cloneGroup(group)">Copy list...</div>
				<div class="list-action" @click="addCard(group.id)">Add card...</div>
				<div class="list-action" @click="removeGroup(group.id)">Archive this list</div>
			</div>
		</div>
		<ul class="smooth-dnd-container">
			<Container group-name="trolloCard" drag-class="ghost" drop-class="ghost-drop" :drop-placeholder="dropPlaceholderOptions" @drop="handleCardDrop(idx, $event)" :get-child-payload="getChildPayload">
				<Draggable v-for="card in group.cards" :key="card.id">
					<card-preview :card="card" :group="group" @saveCard="saveCard" />
				</Draggable>
			</Container>
			<div class="card-add-container" @click="isAddClicked = !isAddClicked" v-if="!isAddClicked">
				<button class="card-add">
					<svg-create color="#5e6c84" size="16px"/>
					<p>Add a card</p>
				</button>
			</div>
			<form @submit.prevent="addCard(group.id)" v-else>
				<textarea class="card-add-textarea" v-model="cardTitle" placeholder="Enter a title for this card..."></textarea>
				<div class="actions-container">
					<button class="btn-add">Add card</button>
					<div @click.prevent="closeTextarea()" class="btn-close icon"><svg-close color="#42526e" size="18px"/></div>
				</div>
			</form>
		</ul>
	</div>
</template>

<script>
	import cardPreview from '../card/card-preview.vue'
	import {boardService} from '@/services/board.service.js'
	import {Container, Draggable} from 'vue-smooth-dnd'
	import svgMenu from '@/cmps/icons/menu.vue'
	import svgClose from '@/cmps/icons/close.vue'
	import svgCreate from '@/cmps/icons/create.vue'
	export default {
		name: 'group-preview',
		props: ['group', 'idx'],
		data() {
			return {
				title: this.group.title,
				isAddClicked: false,
				isOpen: false,
				cardTitle: '',
				dropPlaceholderOptions: {
					className: 'drop-preview',
					animationDuration: '150',
					showOnTop: false,
				},
			}
		},
		created() {
			this.getEmptyCard()
		},
		methods: {
			changeCurrEdit() {
				this.$store.commit({type: 'setCurrEdit', currEdit: this.group.id})
			},
			saveGroup(group) {
				this.$emit('saveGroup', group)
			},
			removeGroup(groupId) {
				this.$emit('removeGroup', groupId)
			},
			cloneGroup(group) {
				const copiedGroup = {...group, id: ''}
				this.$emit('saveGroup', copiedGroup)
			},
			editGroup() {
				let group = JSON.parse(JSON.stringify(this.group))
				group.title = this.title
				if (!group.title) return
				this.$emit('saveGroup', group)
				this.$store.commit({type: 'setCurrEdit', currEdit: null})
			},
			getEmptyCard() {
				this.card = boardService.getEmptyCard()
			},
			addCard(groupId) {
				this.isOpen = false
				this.isAddClicked = !this.isAddClicked
				const title = this.cardTitle
				if (!title) return
				this.$emit('saveCard', {groupId, card: this.card})
				this.getEmptyCard()
			},
			saveCard({groupId, card}) {
				this.$emit('saveCard', {groupId, card})
			},
			closeTextarea() {
				this.isAddClicked = false
			},
			toggleMenu() {
				this.isOpen = !this.isOpen
			},
			// DND
			handleCardDrop(lane, dropResult) {
				const {removedIndex, addedIndex} = dropResult
				if (removedIndex !== null || addedIndex !== null) {
					this.$emit('handleCardDrop', {lane, dropResult})
				}
			},
			getChildPayload(index) {
				return this.group.cards[index]
			},
		},
		computed: {
			currEdit() {
				return this.group.id === this.$store.getters.currEdit
			},
		},
		components: {
			cardPreview,
			Container,
			Draggable,
			svgMenu,svgClose,svgCreate
		},
	}
</script>