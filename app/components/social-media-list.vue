<template>
  <ul class="social-media">
    <li class="icon" v-for="media in socialMedia" :key="media.title">
      <a :href="media.link.href" target="_blank">
        <SvgIcon bg="black" :icon="media.image" />
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
  display: flex
  justify-content: space-between
  max-width: 200px
  a
    padding: 5px

@media screen and (max-width: 1800px)
  .social-media
    position: static
    display: flex
</style>
