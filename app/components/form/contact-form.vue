<template>
  <div class="wrapper">
    <div class="left">
      <h1 class="h1">Contact Form</h1>
      <div class="subtitle">
        <p>
          Interested in working together ? Fill out the form below with some
          information about your project and I will get back to you as soon as I
          can.
        </p>
        <p>
          <a href="mailto:ghivalla@gmail.com"
            >You can also send me an email : ghivalla@gmail.com</a
          >
        </p>
        <p>response time < 12hours</p>
      </div>
    </div>
    <div class="right">
      <form @submit.prevent="sendForm" class="form">
        <div class="fields">
          <TextField :title="nameLabel" v-model="name" required />
          <TextField :title="emailLabel" v-model="email" required />
          <TextField
            :title="messageLabel"
            v-model="message"
            required
            textarea
          />

          <input type="submit" :value="buttonLabel" class="button" />
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
  computed: {
    ...mapState({
      nameLabel: state => state.form.nameLabel,
      emailLabel: state => state.form.emailLabel,
      messageLabel: state => state.form.messageLabel,
      buttonLabel: state => state.form.buttonLabel
    })
  },
  components: { TextField },
  methods: {
    sendForm() {
      fetch("https://www.ghivalla.com/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      }).then(response => {
        if ((response.status = 200)) {
          console.log("mail sent");
          this.mail = "";
          this.name = "";
          this.message = "";
        } else {
          console.log("oops");
        }
      });
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
      margin: 15px 0
      p
        font-weight: 500
        &:not(:last-child)
            margin-bottom: 16px
.fields
  display: -ms-grid
  display: grid
  grid-template-columns: auto
  width: 100%

input[type="submit"]
  cursor: pointer
  height: 60px
  width: 100%
  max-width: 200px
  margin-left: auto
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

    input[type="submit"]
        max-width: none
        margin: 0
@media screen and (max-width: 520px)
  .fields
    display: block
    width: 100%
</style>
