<template>
  <div :aria-label="icon.description">
    <span v-if="icon" class="icon" :style="{ background: bg, '--icon': `url(${icon.src})` }"></span>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: Object,
      required: true
    },
    bg: {
      type: String,
      required: false
    }
  }
};
</script>
<style lang="sass" scoped>
.icon
  display: inline-block
  width: 25px
  height: 25px
  mask-size: contain
  mask-position: center
  mask-repeat: no-repeat
  mask-image: var(--icon)
  -webkit-mask-size: contain
  -webkit-mask-position: center
  -webkit-mask-image: var(--icon)
  -webkit-mask-repeat: no-repeat
  overflow: visible

  &:hover
    opacity: 0.5
</style>
