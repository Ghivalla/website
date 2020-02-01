<template>
	<ul class="social-media">
      <li class="icon" v-for="media in socialMedia">
        <a :href="media.link.href">
          <SvgIcon bg="white" :icon="media.image" />
        </a>
      </li>
    </ul>
</template>
<script>
import SvgIcon from '@/components/svg-icon'
import Lang from '@/components/langSwitcher'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			socialMedia: state => state.profile.socialMedia,
		})
	},
	components: {SvgIcon, Lang},
}
</script>
<style lang="sass" scoped>
.social-media
	display: flex
	max-width: 200px
	position: fixed
	top: 40px
	right: 40px

	.icon:not(:last-child)
		margin-right: 12px
</style>