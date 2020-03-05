<template>
  <section>
    <footer>
      <div class="items name">
        <span>{{ name + " " + surename }}</span
        ><br />
        <span>{{ jobPosition }}</span>
      </div>
      <div class="items">
        <SvgIcon bg="white" :icon="localisation" />
        <div>
          <span>{{ localisation.alt }}</span>
        </div>
      </div>
      <div class="items">
        <SvgIcon bg="white" :icon="mail" />
        <span>{{ mail.alt }}</span>
      </div>
      <div class="items social-media">
        <SocialMediaList />
      </div>
    </footer>
  </section>
</template>
<script>
import SvgIcon from "@/components/svg-icon";
import SocialMediaList from "@/components/social-media-list";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      mail: state => state.profile.mail,
      localisation: state => state.profile.localisation,
      name: state => state.profile.name,
      surename: state => state.profile.surename,
      jobPosition: state => state.profile.jobPosition
    })
  },
  components: { SvgIcon, SocialMediaList }
};
</script>
<style lang="sass" scoped>
section
  width: 100%
  margin: 0 auto
  position: fixed
  bottom: 0
  left: 0
  footer
    max-width: 700px
    width: 100%
    display: grid
    grid-template-columns: repeat(3,1fr)
    padding: 20px 0
    margin: 0 auto

    .items:not(:first-child)
      padding-left: 20px
      display: flex
      align-items: center
    .items:not(:last-child)
      border-right: 1px solid $sep

    .social-media
      display: none

@media screen and (max-width: 800px)
  section
    border-top: 1px solid $sep
    position: static
    footer
      grid-template-columns: 1fr
      padding: 40px 0

      .items
        justify-content: center
        text-align: center

      .items:not(:last-child)
        border-right: none
        padding-bottom: 20px

      .items:not(:first-child)
        padding-top: 20px

      .name
        display: none

      .social-media
        display: flex
</style>
