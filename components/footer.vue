<template>
	<footer>
		<div class="items">
			<span>{{name + ' ' + surename}}</span><br>
			<span>{{jobPosition}}</span>
		</div>
		<div class="items">
			<SvgIcon bg="white" :icon="localisation"/>
			<div>
				<span>{{localisation.alt}}</span>
			</div>
		</div>
		<div class="items">
			<SvgIcon bg="white" :icon="mail"/>
			<span>{{mail.alt}}</span>
		</div>
	</footer>
</template>
<script>
import SvgIcon from '@/components/svg-icon'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			mail: state => state.profile.mail,
			localisation: state => state.profile.localisation,
			name: state => state.profile.name,
			surename: state => state.profile.surename,
			jobPosition: state => state.profile.jobPosition,
		})
	},
	components: { SvgIcon },
}
</script>
<style lang="sass" scoped>
footer
	position: fixed
	bottom: 0px
	left: 50%
	margin-left: -350px
	max-width: 700px
	width: 100%
	display: grid
	grid-template-columns: repeat(3,1fr)
	padding: 20px 0

	.items:not(:first-child)
		padding-left: 20px
		display: flex
		align-items: center
	.items:not(:last-child)
		border-right: 1px solid $sep



</style>