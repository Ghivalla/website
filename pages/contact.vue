<template>
  <div class="wrapper">
    <ContactForm />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContactForm from "@/components/form/contact-form";
export default {
  computed: {
    ...mapState({
      img: state => state.profile.profilePicture.src,
      name: state => state.profile.name,
      surename: state => state.profile.surename,
      jobPosition: state => state.profile.jobPosition
    })
  },
  components: { ContactForm }
};
</script>

<style lang="sass" scoped></style>
