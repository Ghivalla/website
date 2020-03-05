<template>
  <div class="container">
    <Navbar />
    <nuxt />
  </div>
</template>
<script>
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
export default {
  components: { Navbar, Footer }
};
</script>
