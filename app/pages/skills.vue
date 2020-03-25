<template>
  <section class="wrapper full-page">
    <h1 class="h1">{{ skillsPage.title }}</h1>
    <triCardsSimple :title="skillsPage.title" :cards="triCardData" />
    <h2 class="h2">{{skillsPage.description}}</h2>
    <AlternateTimp
      v-for="(section, index) in skillsData"
      :key="`${section.title.trim().replace(/\s/g, '')}-${index}`"
      :title="section.title"
      :paragraph="section.fullDescription"
      :image="section.image"
      :reverse="!(index % 2 === 0)"
    />
    <cta :title="ctaData.title" :paragraph="ctaData.description" :link="ctaData.link" />
  </section>
</template>
<script>
import { mapState } from "vuex";
import markdownMixin from "@/mixins/markdown";
import buildHead from "@/utils/seo";
import AlternateTimp from "@/components/cards/alternate-timp";
import triCardsSimple from "@/components/cards/tri-cards-simple";
import cta from "@/components/cta";

export default {
  head() {
    return buildHead(this.skillsPage.seo, this.$store);
  },

  mixins: [markdownMixin],

  async asyncData(ctx) {
    const skillsPage = await ctx.store.dispatch("getEntries", {
      content_type: "page",
      id: "skills-page"
    });
    return { skillsPage };
  },

  computed: {
    skillsData: function() {
      return this.skillsPage.sections.filter(
        section => section.componentName === "alternate-timp"
      );
    },
    triCardData: function() {
      return this.skillsPage.sections.filter(
        section => section.componentName === "tri-card-simple"
      )[0].polymorphe;
    },
    ctaData: function() {
      return this.skillsPage.sections.filter(
        section => section.componentName === "cta"
      )[0];
    }
  },

  components: { AlternateTimp, triCardsSimple, cta }
};
</script>

<style lang="sass" scoped>
.wrapper
  .h2, .h1
    text-align: center
@media screen and (max-width: 800px)
  .wrapper
    .h1
      margin-bottom: 48px
    .h2
      margin-bottom: 48px
</style>
