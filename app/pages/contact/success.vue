<template>
  <div class="wrapper full-page">
    <div class="container">
      <h1 class="h1">{{ thankYouPage.title }}</h1>
      <p>{{ thankYouPage.description }}</p>
      <div class="container-nav">
        <nuxt-link class="button" :to="homeButton.link.href">
          {{
          homeButton.title
          }}
        </nuxt-link>
        <nuxt-link class="link" :to="formLink.link.href">
          {{
          formLink.title
          }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  validate({ app, store, redirect }) {
    if (!store.state.mailSent) {
      redirect(app.localePath({ name: "contact" }));
    }
    return true;
  },
  async asyncData(ctx) {
    const thankYouPage = await ctx.store.dispatch("getEntries", {
      content_type: "page",
      id: "thank-you-page"
    });
    return { thankYouPage };
  },
  computed: {
    homeButton() {
      return this.thankYouPage.sections.find(
        section => section.tag === "button"
      );
    },
    formLink() {
      return this.thankYouPage.sections.find(section => section.tag === "link");
    }
  },
  beforeDestroy() {
    this.$store.commit("setMailSent", false);
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
    h1
      margin-bottom: 16px
      margin-top: 0
    p
      margin-bottom: 16px
    .container-nav
      display: flex
      flex-direction: column
      align-items: center
      .button
        width: 200px
        margin-bottom: 16px
      .link
        text-decoration: underline
</style>
