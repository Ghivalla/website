<template>
  <div class="wrapper full-page">
    <div class="left">
      <h1 class="h1">{{ article.title }}</h1>
      <div class="subtitle" v-html="convertMarkdownToHTML(article.fullDescription)" />
    </div>
    <div class="right">
      <ContactForm :content="contactForm" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContactForm from "@/components/form/contact-form";
import markdownMixin from "@/mixins/markdown";
import buildHead from "@/utils/seo";

export default {
  head() {
    return buildHead(this.contactPage.seo, this.$store);
  },
  computed: {
    article() {
      return this.contactPage.sections.find(
        section => section.tag === "contactForm"
      );
    }
  },
  async asyncData(ctx) {
    const contactPage = await ctx.store.dispatch("getEntries", {
      content_type: "page",
      id: "contact-page"
    });
    const contactForm = await ctx.store.dispatch("getEntries", {
      content_type: "form",
      id: "contact-form"
    });
    return { contactPage, contactForm };
  },
  components: { ContactForm },
  mixins: [markdownMixin]
};
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  justify-content: space-between
  align-items: flex-start
  background-image: url('../../assets/images/paperplane.svg')
  background-repeat: no-repeat
  background-size: contain
  background-position: center bottom
  .right
    width: calc(100%/2.3)
  .left
    width: calc(100%/2)
    .h1
      margin-bottom: 32px
    .subtitle /deep/
      margin: 15px 0
      p
        font-weight: 500
        &:not(:last-child)
          margin-bottom: 16px
      a
        color: $black

@media screen and (max-width: 1200px)
  .wrapper
    background-image: none
@media screen and (max-width: 1000px)
  .wrapper
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    background-position: center

    .left, .right
      width: 90%
      margin-bottom: 50px
@media screen and (max-width: 600px)
  h2
    margin-top: 10px
</style>
