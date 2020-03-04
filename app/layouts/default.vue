<template>
  <div class="container">
    <Navbar/>
    <SocialMediaList/>
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
import SocialMediaList from '@/components/social-media-list'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
export default {
  components: { SocialMediaList, Navbar, Footer }
}
</script>
