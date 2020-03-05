<template>
  <div class="wrapper">
    <h1 class="title h1">{{ title }}</h1>
    <div class="picture">
      <img src="../assets/images/ghivalla.svg" alt="drawing of Ghivalla" />
    </div>
    <p class="content">{{ article }}</p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      title: state => state.article.title,
      article: state => state.article.body
    })
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  display: grid
  grid-template-areas: "p t" "p c"
  grid-template-rows: 100px 1fr
  grid-template-columns: 500px 1fr
  gap: 25px
  margin-top: 80px

  .picture
    max-width: 500px
    width: 100%
    grid-area: p
  .title
    margin-bottom: 24px
    grid-area: t
    align-self: end
  .content
    grid-area: c

@media screen and (max-width: 900px)
  .wrapper
    grid-template-areas: "t" "p" "c"
    grid-template-rows: auto
    grid-template-columns: 1fr

    .picture
      width: 100%
      max-width: 600px

@media screen and (max-width: 900px)
  .wrapper
    padding-top: 50px
</style>
