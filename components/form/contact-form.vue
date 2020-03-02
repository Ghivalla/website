<template>
  <div class="wrapper">
    <div class="left">
      <h1 class="h1">Contact Form</h1>
      <div class="subtitle">
        <p class="h4">
          Interested in working together ? Fill out the form below with some
          information about your project and I will get back to you as soon as I
          can (response time < 12hours)
        </p>
      </div>
    </div>
    <div class="right">
      <form @submit.prevent="sendForm" class="form">
        <div class="fields">
          <TextField title="name" v-model="name" required />
          <TextField title="email" v-model="email" required />
          <TextField title="message" v-model="message" required textarea />

          <input type="submit" value="submit" class="button" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TextField from "@/components/form/text-input";
export default {
  props: ["data"],
  data() {
    return {
      name: null,
      email: null,
      message: null
    };
  },
  components: { TextField },
  methods: {
    sendForm() {
      console.log("sending");
    }
  }
};
</script>

<style scoped lang="sass">
.wrapper
  display: flex
  justify-content: space-between
  align-items: flex-start
  background-image: url('../../assets/images/paperplane.svg')
  background-repeat: no-repeat
  background-size: contain
  .right
    width: calc(100%/2.3)
    h3
      font-weight: 500
      font-size: 26px
      margin-bottom: 50px
  .left
    width: calc(100%/2)
    .subtitle
      display: flex
      align-items: center
      margin: 15px 0
      .icon
        margin-right: 10px
      h2
        font-weight: 500
.fields
  display: -ms-grid
  display: grid
  grid-template-columns: auto
  width: 100%

input[type="submit"]
  cursor: pointer
  width: calc(100%/4)
  height: 60px
  margin-left: calc(100%/1.33)
  user-select: none
  outline: none
  white-space: pre
  transition: border 0.25s ease-out
  font-size: 16px
  font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  background-color: transparent
  border: 1px solid $white
  border-radius: 4px
  padding: 18px 25px 19px
  &:hover
    background-color: rgba(white,0.1)

@media screen and (max-width: 1700px)
  section
    background-size: 55%
@media screen and (max-width: 1130px)
  .wrapper
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    .left, .right
      width: 90%
      margin-bottom: 50px
@media screen and (max-width: 800px)
  .wrapper
    padding-top: 140px
    padding-bottom: 64px
@media screen and (max-width: 600px)
  h2
    margin-top: 10px
  .wrapper
    padding-top: 100px
@media screen and (max-width: 520px)
  .fields
    display: block
    width: 100%
</style>
