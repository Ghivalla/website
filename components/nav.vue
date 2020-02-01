<template>
	<nav class="navigation">
		<ul>
			<li
				class="link h3"
				:class="{ 'selected' : link.title.toLowerCase() === currentPage}"
				v-for="link in navbar"
				@click="changePage(link.title)"
			>
				<nuxt-link :to="link.href">
					{{link.title.toUpperCase()}}
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>
<script>
import { mapState } from 'vuex'
export default {
	data() {
		return { currentPage : '' }
	},
	computed: {
		...mapState({
			navbar: state => state.navbar.navigation,
		})
	},
	methods: {
		changePage(page) {
			this.currentPage = page.toLowerCase()
		}
	},
	mounted() {
		let pathArray = this.$route.path.substring(1).replace(/\/$/, '').split('/')
		let route = pathArray[0] === 'fr' ? pathArray[1] : pathArray[0]
		this.currentPage = route ? route : this.navbar[0].title.toLowerCase()
	}
}
</script>
<style lang="sass" scoped>
.navigation
	position: fixed
	top: 40px
	left: 40px

	.link
		padding-left: 16px

	.link a
		color: rgba($white,0.4)

	.selected a, .link a:hover
		transition: all 0.5s
		color: $white

</style>