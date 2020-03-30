<template>
  <ul class="social-media">
    <li class="icon" v-for="media in socialMedia" :key="media.title">
      <a :href="media.link.href" target="_blank" :aria-label="media.link.title">
        <SvgIcon bg="#000000" :icon="media.image" />
      </a>
    </li>
  </ul>
</template>
<script>
import SvgIcon from "@/components/svg-icon";
import Lang from "@/components/langSwitcher";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      socialMedia: state => state.profile.socialMedia
    })
  },
  components: { SvgIcon, Lang }
};
</script>
<style lang="sass" scoped>
.social-media
  position: static
  display: flex
  flex-direction: column

  .icon:not(:last-child)
    margin-bottom: 16px

@media screen and (max-width: 1800px)
  .social-media
    flex-direction: row
    margin-bottom: 32px
    .icon:not(:last-child)
      margin-right: 32px
      margin-bottom: 0px
@media screen and (max-width: 800px)
  .social-media
    margin-bottom: 16px
</style>
