// Board nav

<template>
	<section class="board-menu-container">
		<div class="board-menu" v-if="!changeBg">
			<header>
				<h3 class="title">Menu</h3>
				<a @click="closeMenu"><svg-close size="1rem" /></a>
			</header>
			<ul>
				<li @click="changeBg = !changeBg">
					<div class="icon bgc"></div>
					<h4>Change background</h4>
				</li>
				<li>
					<svg-archive class="icon" color="#838c91" />
					<h4>Archive</h4>
				</li>
				<hr />
				<li>
					<svg-activity class="icon" color="#838c91" />
					<h4>Activity</h4>
				</li>
				<div class="activity-preview" v-for="activity in board.activities" :key="activity.id">
					<img :src="activity.byMember.imgUrl" />
					<div class="activity-preview-content">
						<h4 style="display:inline;">{{ activity.byMember.fullname }}</h4>
						&#160;{{ activity.txt }}
						<!-- <p>{{ activity.createdAt }}</p> -->
					</div>
				</div>
			</ul>
		</div>
		<div v-else>
			<div class="board-menu">
				<header>
					<i class="fas fa-arrow-left" @click="changeBg = false" style="cursor: pointer" title="Back To Menu"></i>
					<h3>Change background</h3>
					<a @click="closeMenu"><svg-close size="1rem" /></a>
				</header>
				<div class="background-container">
					<h4 class="title">Colors</h4>
					<section class="color-palette">
						<div class="color" v-for="color in colors" :key="color" :value="color" :style="`background-color:${color}`" @click="updateStyle(color)"></div>
					</section>
					<h4 class="title">Images</h4>
					<board-imgs @updateStyle="updateStyle" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import svgActivity from '@/cmps/icons/activity.vue'
	import svgArchive from '@/cmps/icons/archive.vue'
	import svgClose from '@/cmps/icons/close.vue'
	import boardImgs from './board-imgs.vue'
	export default {
		name: 'board-menu',
		props: ['board'],
		data() {
			return {
				changeBg: false,
				colors: ['#eb3b5a', '#fa8231', '#f7b731', '#20bf6b', '#0fb9b1', '#45aaf2', '#4b7bec', '#a55eea', '#4b6584'],
			}
		},
		methods: {
			closeMenu() {
				this.$emit('close')
			},
			updateStyle(style) {
				this.$emit('updateStyle', style)
			},
		},
		components: {
			svgClose,
			svgArchive,
			svgActivity,
			boardImgs,
		},
	}
</script>