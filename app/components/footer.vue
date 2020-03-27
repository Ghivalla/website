<template>
  <section>
    <footer>
      <div class="social-media">
        <SocialMediaList />
      </div>
      <div class="copy">
        <p>&copy; 2019 - {{ name }}</p>
      </div>
    </footer>
  </section>
</template>
<script>
import SocialMediaList from "@/components/social-media-list";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      mail: state => state.profile.mail,
      localisation: state => state.profile.localisation,
      name: state => state.profile.name
    })
  },
  components: { SocialMediaList }
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
    display: flex
    flex-direction: row-reverse
    justify-content: space-between
    padding: 40px
    margin: 0 auto
    .copy
      display: flex
      align-items: flex-start
      transform: rotate(-90deg)
      p
        font-size: 12px

@media screen and (max-width: 1800px)
  section
    width: 100%
    margin: 0 auto
    position: static
    border-top: 1px solid $sep
    footer
      flex-direction: column
      justify-content: center
      align-items: center
      padding: 40px
      margin: 0 auto
      .copy
        display: flex
        align-items: flex-end
        transform: rotate(0deg)

        p
          font-size: 14px
          color: $grey

@media screen and (max-width: 800px)
  section footer
    padding: 25px
</style>
