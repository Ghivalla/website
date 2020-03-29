<template>
  <div class="container">
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
export default {
  head() {
    const attr = {};
    attr.htmlAttrs = { lang: this.$store.state.i18n.locale };
    return attr;
  },
  components: { Navbar, Footer }
};
</script>
