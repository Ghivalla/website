<template>
  <section class="wrapper">
    <h2 class="h1">{{ title }}</h2>
    <p>{{ paragraph }}</p>
    <nuxt-link :to="link.href" class="button">{{ link.title }}</nuxt-link>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    paragraph: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="sass" scoped>
.wrapper
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  border-top: 1px solid $sep

  .h1
    margin-bottom: 16px
  p
    margin-bottom: 20px

  .button
    height: 50px
    width: 150px
    display: flex
    justify-content: center
    align-items: center

@media screen and (max-width:800px)
  .wrapper
    margin-top: 64px
    padding-bottom: 64px
</style>