<template>
	<section class="app-header" ref="header">
		<section class="btn-header-container left">
			<button class="btn-header" @click="homePage">
				<svg-home />
			</button>
			<button class="btn-header boards-btn" @click="boards" title="Boards Templates">
				<svg-boards />Boards
			</button>
			<div class="logo">Trollo</div>
		</section>
		<section class="btn-header-container right">
			<button class="btn-header" title="Create new board">
				<svg-create />
			</button>
			<button class="btn-header" title="Notificaion">
				<svg-notification />
			</button>
			<div class="btn-header profile-avatar" @click="login" title="Login">
				<svg-login />
			</div>
		</section>
	</section>
</template>

<script>
	import svgHome from '@/cmps/icons/home.vue'
	import svgBoards from '@/cmps/icons/boards.vue'
	import svgCreate from '@/cmps/icons/create.vue'
	import svgNotification from '@/cmps/icons/notification.vue'
	import svgLogin from '@/cmps/icons/login.vue'

	export default {
		name: 'app-header',
		data() {
			return {
				routes: ['/', '/board', '/login', '/signup'],
			}
		},
		watch: {
			$route() {
				this.$refs.header.style.backgroundColor =
         			this.routes.includes(this.$route.path) ? 
         			'#4b6584' : '#00000031'
			},
		},
		methods: {
			homePage() {
				this.$router.push('/')
			},
			boards() {
				this.$router.push('/board')
			},
			login() {
				this.$router.push('/login')
			},
		},
		components:{
			svgHome, svgBoards, svgCreate, svgNotification, svgLogin
		}
	}
</script>