<template>
  <div class="wrapper">
    <div class="left">
      <h1 class="h1">{{article.title}}</h1>
      <div class="subtitle">
        <p v-html="article.body" />
      </div>
    </div>
    <div class="right">
      <ContactForm />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContactForm from "@/components/form/contact-form";
export default {
  computed: {
    article() {
      return this.contactPage.articles[0];
    }
  },
  async asyncData(ctx) {
    const contactPage = await ctx.store.dispatch("getEntries", {
      content_type: "page",
      id: "contact-page"
    });
    return { contactPage };
  },
  components: { ContactForm }
};
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  justify-content: space-between
  align-items: flex-start
  background-image: url('../assets/images/paperplane.svg')
  background-repeat: no-repeat
  background-size: contain
  background-position: center
  margin-top: 60px
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
    padding: 140px 0 64px 0
    background-position: center

    .left, .right
      width: 90%
      margin-bottom: 50px
@media screen and (max-width: 600px)
  h2
    margin-top: 10px

  .wrapper
    padding-top: 100px
</style>
