// Board nav

<template>
	<section class="board-nav" v-if="board">
		<main class="nav">
			<section class="left-part">
				<div class="board-title">
					<h3 v-if="!isEdit" @click="isEdit = !isEdit">{{ board.title }}</h3>
					<form @submit.prevent="editBoardTitle" v-else @change="editBoardTitle">
						<input type="text" v-model="title" :placeholder="board.title" />
					</form>
				</div>
				<button :class="isStar" @click="toggleStar">
					<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
						></path>
					</svg>
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
						<svg class="close-popover" @click="isInviteOpen = false" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style="fill: #000000">
							<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
								<path d="M0,172v-172h172v172z" fill="none"></path>
								<g fill="#666666"><path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"></path></g>
							</g>
						</svg>
					</div>
					<ul v-for="user in users" :key="user._id">
						<li :title="user.fullname">
							<el-avatar :size="30" :src="user.imgUrl"></el-avatar>
							<span><b>{{ user.fullname }}</b></span>
							<span><i class="fas fa-check"></i></span>
						</li>
					</ul>
				</div>
			</section>
			<section class="right-part">
				<button @click="dashboard">Dashboard</button>
				<button style="margin: 0" @click="toggleMenu">Menu</button>
			</section>
		</main>
		<transition name="fade">
			<board-menu v-if="isMenuOpen" @close="toggleMenu" @updateStyle="updateStyle" :board="board" />
		</transition>
	</section>
</template>

<script>
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
				let board = this.boardCopy()
				board.title = this.title
				if (!board.title) return
				this.$emit('updateBoard', board)
				this.isEdit = false
			},
			toggleMenu() {
				this.isMenuOpen = !this.isMenuOpen
			},
			boardCopy() {
				return JSON.parse(JSON.stringify(this.board))
			},
			dashboard() {
				this.$router.push(`/board/${this.board._id}/dashboard`)
			},
		},
		computed: {
			isStar() {
				return {starred: this.isStarred}
			},
			board() {
				return this.$store.getters.board
			},
			users() {
				return this.$store.getters.users
			},
		},
		components: {
			boardMenu,
		},
	}
</script>
