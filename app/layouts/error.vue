<template>
  <div class="wrapper full-page">
    <div class="container">
      <div class="title">
        <h1 class="h1">{{ page404.title }}</h1>
      </div>
      <p class="h3">{{ page404.description }}</p>
      <router-link :to="page404.link.href">
        {{
        page404.fullDescription
        }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      page404: state => state.navbar.page404
    })
  }
};
</script>
<style lang="sass" scoped>
.wrapper
  display: flex
  justify-content: center
  align-items: center
  .container
    width: 100%
    max-width: 700px
    text-align: center
    padding: 100px 20px
    background-color: $white
    .title
      margin-bottom: 16px
      display: flex
      justify-content: center
      align-items: center
      color: rgb(219,225,236)
      .h1
        font-size: 80px
        p
          margin-bottom: 32px

@media screen and (max-width: 500px)
  .wrapper
    .container
      max-height: 300px
      padding: 40px
      .title
        .h1
          font-size: 70px
</style>
