<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="90"
          fill="#DBE1EC"
          viewBox="0 0 48 48"
        >
          <path
            d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
          ></path>
        </svg>
        <h1 class="h1">{{ page404.title }}</h1>
      </div>
      <p class="h3">{{ page404.description }}</p>
      <router-link :to="page404.link.href">{{
        page404.fullDescription
      }}</router-link>
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
  },
  mounted() {
    console.log(this.page404);
  }
};
</script>
<style lang="sass" scoped>
.wrapper
    min-height: 100vh
    width: 100%
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
    .wrapper .container
        max-height: 300px
        padding: 40px
        .title
            .h1
                font-size: 70px
</style>
