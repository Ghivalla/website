<template>
  <div class="wrapper">
    <img
      src="../assets/images/ghivalla.svg"
      alt="drawing of Ghivalla"
      class="portrait"
    />
    <div class="about">
      <h1 class="title">{{ title }}</h1>
      <p>{{ article }}</p>
    </div>
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
  display: flex
  justify-content: space-between
  padding-top: 200px;

  .portrait
    max-width: 500px
    width: 100%
  .about
    padding: 0 48px
    .title
      font-size: 80px
      margin-bottom: 24px
</style>
