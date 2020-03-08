<template>
  <div class="wrapper">
    <h1 class="title h1">{{ article.title }}</h1>
    <div class="picture">
      <img src="../assets/images/ghivalla.svg" alt="drawing of Ghivalla" />
    </div>
    <div class="content">
      <div v-html="convertMarkdownToHTML(article.fullDescription)" />
      <SocialMedia />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SocialMedia from "@/components/social-media-list";
import markdownMixin from "@/mixins/markdown";
import buildHead from "@/utils/seo";

export default {
  head() {
    return buildHead(this.aboutPage.seo, this.$store);
  },
  computed: {
    article() {
      return this.aboutPage.sections.find(section => section.tag === "AboutMe");
    }
  },
  async asyncData(ctx) {
    const aboutPage = await ctx.store.dispatch("getEntries", {
      content_type: "page",
      id: "about-me-page"
    });
    return { aboutPage };
  },
  components: { SocialMedia },
  mixins: [markdownMixin]
};
</script>

<style lang="sass" scoped>
.wrapper
  display: grid
  grid-template-areas: "p t" "p c"
  grid-template-rows: 100px 1fr
  grid-template-columns: 500px 1fr
  gap: 25px
  column-gap: 100px
  margin-top: 60px

  .picture
    max-width: 300px
    width: 100%
    grid-area: p
  .h1
    margin-bottom: 32px
    grid-area: t
    align-self: end
  .content /deep/
    grid-area: c
    display: flex
    flex-direction: column
    justify-content: space
    div p
      margin-bottom: 16px
      &:last-child
        margin-bottom: 64px
@media screen and (max-width: 1800px)
  .wrapper
    column-gap: 150px
    grid-template-columns: auto 1fr
@media screen and (max-width: 800px)
  .wrapper
    grid-template-areas: "t" "p" "c"
    grid-template-rows: auto
    grid-template-columns: 1fr
    padding-top: 50px

    .picture
      width: 100%
      max-width: 300px
      margin-left: auto
@media screen and (max-width: 600px)
  .wrapper
    .picture
      max-width: 250px
</style>
