// Board nav

<template>
	<section class="board-nav" v-if="board">
		<nav class="nav">
			<section class="left-part">
				<div class="board-title">
					<h3 v-if="!isEdit" @click="isEdit = !isEdit">{{ board.title }}</h3>
					<form @submit.prevent="editBoardTitle" v-else @change="editBoardTitle">
						<input type="text" v-model="title" :placeholder="board.title" />
					</form>
				</div>
				<button @click="toggleStar">
					<svg-star :color="isStarred ? 'gold' : 'White'" />
				</button>
				<section class="members-container">
					<div v-for="member in board.members" :key="member.id" class="member">
						<el-avatar :size="30" :src="member.imgUrl"></el-avatar>
					</div>
				</section>
				<button @click="isInviteOpen = !isInviteOpen">Invite</button>
				<div v-if="isInviteOpen" class="dynamic-popover">
					<div class="popover-header">
						<h3>Invite members</h3>
						<div class="close-svg" @click="isInviteOpen = false">
							<svg-close size="14px"/>
						</div>
					</div>
					<ul v-for="user in users" :key="user._id">
						<li :title="user.fullname">
							<el-avatar :size="30" :src="user.imgUrl"></el-avatar>
							<h4 style="display: inline;">{{ user.fullname }}</h4>
							<span><i class="fas fa-check"></i></span>
						</li>
					</ul>
				</div>
			</section>
			<section class="right-part">
				<button @click="dashboard">Dashboard</button>
				<button style="margin: 0;" @click="toggleMenu">Menu</button>
			</section>
		</nav>
		<transition name="fade">
			<board-menu v-if="isMenuOpen" @close="toggleMenu" @updateStyle="updateStyle" :board="board" />
		</transition>
	</section>
</template>

<script>
	import svgStar from '@/cmps/icons/star.vue'
	import svgClose from '@/cmps/icons/close.vue'
	import boardMenu from '@/cmps/board/board-menu.vue'
	// @ is an alias to /src
	export default {
		name: 'board-nav',
		props: {},
		data() {
			return {
				isMenuOpen: false,
				isStarred: null,
				isEdit: false,
				isInviteOpen: false,
				title: '',
				style: null,
				colors: ['#cc0033', '#ff8000', '#ffbf00', '#00cc00', '#66d9ff', '#0099cc', '#bf80ff', '#ff66ff', '#ff4da6'],
			}
		},
		created() {
			this.isStarred = this.board.isStarred
			this.style = this.board.style
			this.title = this.board.title
		},
		methods: {
			toggleStar() {
				this.isStarred = !this.isStarred
				this.$emit('updateBoard', {...this.board, isStarred: this.isStarred})
			},
			updateStyle(style) {
				const tmpBoard = {...this.board, style}
				this.$emit('updateBoard', tmpBoard)
			},
			editBoardTitle() {
				let board = JSON.parse(JSON.stringify(this.board));
				board.title = this.title
				if (!board.title) return
				this.$emit('updateBoard', board)
				this.isEdit = false
			},
			toggleMenu() {
				this.isMenuOpen = !this.isMenuOpen
			},
			dashboard() {
				this.$router.push(`/board/${this.board._id}/dashboard`)
			},
		},
		computed: {
			board() {
				return this.$store.getters.board
			},
			users() {
				return this.$store.getters.users
			},
		},
		components: {
			svgStar, svgClose,
			boardMenu,
		},
	}
</script>