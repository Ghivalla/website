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
      height: 50px
      width: 150px
      display: flex
      justify-content: center
      align-items: center
</style>
