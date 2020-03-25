<template>
  <div class="wrapper" :class="{reverse: reverse}">
    <img :src="image.src" :alt="image.alt" />
    <div class="content" v-bind:class="{'reverse': reverse}">
      <h2 class="h3">{{ title }}</h2>
      <p v-html="paragraph" />
    </div>
  </div>
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
    image: {
      type: Object,
      required: true
    },
    reverse: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style scoped lang="sass">
.wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-areas: "i c"
  padding-left: 50px
  padding-right: 50px
  img
    width: 100%
    max-width: 500px
    grid-area: i
  .content
    margin-left: 32px
    display: flex
    flex-direction: column
    justify-content: center
    grid-area: c
    .h3
      margin-bottom: 32px
.wrapper.reverse
  grid-template-areas: "c i"
  .content
    margin-left: 0
    margin-right: 32px
    .h3, p
      text-align: left

@media screen and (max-width: 1000px)
  .wrapper
    grid-template-columns: 1fr
    grid-template-areas: "i" "c"
    padding-left: 25px
    padding-right: 25px
    img
      margin: 0 auto 32px
    .content
      margin-left: 0
      .h3
        margin-bottom: 32px

  .wrapper.reverse
    grid-template-areas: "i" "c"
    .content
      margin-right: 0px
@media screen and (max-width: 600px)
  .wrapper
    padding-left: 0px
    padding-right: 0px

    .content
      p
        text-align: left
  .wrapper.reverse .content p
    text-align: left
</style>