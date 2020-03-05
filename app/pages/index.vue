<template>
  <div class="wrapper">
    <CanvasWave />
    <div class="cta">
      <h1 class="name h1">{{ name }}</h1>
      <p>Currently looking for job opportunities</p>
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

  .cta
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    .name
      margin-bottom: 16px
    p
      margin-bottom: 20px

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
