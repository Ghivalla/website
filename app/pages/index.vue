<template>
  <div class="wrapper full-page">
    <CanvasFoggy />
    <div class="cta">
      <h1 class="big-title" ref="title">{{ name }}</h1>
      <h2 class="h2" ref="subTitle">{{ jobPosition }}</h2>
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
import CanvasFoggy from "@/components/canvas/canvas-foggy";
import { TweenMax, Expo, Quad } from "gsap";

export default {
  head() {
    return buildHead(this.indexPage.seo, this.$store);
  },
  async asyncData(ctx) {
    const indexPage = await ctx.store.dispatch("getEntries", {
      content_type: "page",
      id: "index-page"
    });
    return { indexPage };
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
  },
  components: { CanvasFoggy },
  methods: {
    animateTitles() {
      const overlay = this.$refs.overlay;
      const title = this.$refs.title;
      charming(title);
      const titleLetters = Array.from(title.querySelectorAll("span"));

      const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      TweenMax.to(overlay, 2, {
        ease: Quad.easeOut,
        opacity: 0
      });

      TweenMax.set(titleLetters, { opacity: 0 });
      TweenMax.staggerTo(
        titleLetters,
        1.5,
        {
          ease: Expo.easeOut,
          startAt: { rotationX: -100, z: -1000 },
          opacity: 1,
          rotationX: 0,
          z: 0
        },
        0.1
      );

      const subtitle = this.$refs.subTitle;
      TweenMax.set(subtitle, { opacity: 0 });
      TweenMax.to(subtitle, 1.5, {
        ease: Expo.easeOut,
        startAt: { y: 30 },
        opacity: 1,
        y: 0
      });

      const glitch = (el, cycles) => {
        if (cycles === 0 || cycles > 3) return;
        TweenMax.set(el, {
          x: getRandomNumber(-20, 20),
          y: getRandomNumber(-20, 20),
          color: ["#EDF0F2", "#424649", "#D2D8DB"][cycles - 1]
        });
        setTimeout(() => {
          TweenMax.set(el, { x: 0, y: 0, color: "#000" });
          glitch(el, cycles - 1);
        }, getRandomNumber(20, 100));
      };

      const loop = startAt => {
        this.timeout = setTimeout(() => {
          const titleLettersShuffled = titleLetters.sort(
            (a, b) => 0.5 - Math.random()
          );
          const lettersSet = titleLettersShuffled.slice(
            0,
            getRandomNumber(1, titleLetters.length + 1)
          );
          for (let i = 0, len = lettersSet.length; i < len - 1; ++i) {
            glitch(lettersSet[i], 3);
          }
          loop();
        }, startAt || getRandomNumber(500, 10000));
      };
      loop(1500);
    }
  },
  mounted() {
    this.animateTitles();
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
      font-size: calc(90px + 20 * ((100vw - 320px) / 680));
      line-height: 56px
      font-weight: 600
      margin-bottom: 45px

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
      font-size: 4rem
      margin-bottom: 16px
</style>
