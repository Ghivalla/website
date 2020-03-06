<template>
  <div class="wrapper">
    <CanvasWave />
    <div class="cta">
      <h1 class="name h1">{{ name }}</h1>
      <p>{{ status }}</p>
      <nuxt-link :to="cta.href" class="button">{{ cta.title }}</nuxt-link>
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
      jobPosition: state => state.profile.jobPosition,
      status: state => state.profile.status,
      cta: state => state.profile.cta
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

      &:focus
        outline: none
        border: 5px solid $secondary
        padding: 14px 21px 15px
</style>
