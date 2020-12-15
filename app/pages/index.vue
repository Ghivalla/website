<template>
  <div class="wrapper full-page">
    <div class="cta">
      <h1 class="big-title">{{ name }}</h1>
      <h2 class="h2">{{ jobPosition }}</h2>
      <p>{{ status }}</p>
      <nuxt-link :to="cta.href" class="button">{{ cta.title }}</nuxt-link>
      <div ref="overlay" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import buildHead from "@/utils/seo";
import charming from "charming";
import { TweenMax, Expo, Quad } from "gsap";

export default {
  head() {
    return buildHead(this.indexPage.seo, this.$store);
  },
  async asyncData(ctx) {
    try {
      const indexPage = await ctx.store.dispatch("getEntries", {
        content_type: "page",
        id: "index-page"
      });
      return { indexPage };
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapState({
      img: state => state.profile.profilePicture.src,
      name: state => state.profile.name,
      surename: state => state.profile.surename,
      jobPosition: state => state.profile.jobPosition,
      status: state => state.profile.status,
      cta: state => state.profile.cta
    })
  }
};
</script>

<style lang="sass" scoped>
.letters
  position: fixed
  width: 100%
  .text
    fill: grey
.wrapper
  justify-content: center
  align-items: center
  display: flex
  width: 100vw

  .cta
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    h1.big-title
      font-size: calc(50px + 20 * ((100vw - 320px) / 680));
      line-height: 56px
      font-weight: 600
      margin-bottom: 25px

    .h2
      text-align: center

    p
      margin-bottom: 20px
      text-align: center

    .button
      height: 50px
      width: 150px
      display: flex
      justify-content: center
      align-items: center

@media screen and (max-width: 500px)
  .wrapper .cta
    h1.big-title
      margin-bottom: 16px
</style>
