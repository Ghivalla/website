<template>
  <div class="wrapper">
    <CanvasWave />
    <div class="cta">
      <h1 class="name">{{ name }}</h1>
      <nuxt-link to="/" class="button">Hire Me</nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CanvasWave from "@/components/canvas-wave";
export default {
  computed: {
    ...mapState({
      img: state => state.profile.profilePicture.src,
      name: state => state.profile.name,
      surename: state => state.profile.surename,
      jobPosition: state => state.profile.jobPosition
    })
  },
  components: { CanvasWave }
};
</script>

<style lang="sass" scoped>
.wrapper
  justify-content: center
  align-items: center
  display: flex
  width: 100vw
  min-height: 100vh
  margin: 0px
  padding: 0px

  .cta
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: fixed
    top: 50%
    left: 50%
    margin-left: -150px
    margin-top: -70px
    max-width: 300px
    max-height: 140px

    .name
      font-size: 80px
      margin-bottom: 32px

    .button
      background-color: transparent
      border: 1px solid $white
      border-radius: 4px
      padding: 18px 25px 19px
      width: 150px
      text-align: center

      &:hover
        background-color: rgba(white,0.1)
</style>
