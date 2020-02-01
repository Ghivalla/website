<template>
  <div class="wrapper">
    <h1 class="name">ABOUT</h1>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      img: state => state.profile.profilePicture.src,
      name: state => state.profile.name,
      surename: state => state.profile.surename,
      jobPosition: state => state.profile.jobPosition,
    })
  },
}
</script>

<style lang="sass" scoped>
.wrapper
  justify-content: center
  align-items: center
  display: flex

  .name
    font-size: 80px


</style>