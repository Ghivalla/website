<template>
  <form @submit.prevent="sendForm" class="form">
    <div class="fields">
      <TextField :title="nameLabel" v-model="name" required />
      <TextField :title="emailLabel" v-model="email" required />
      <TextField :title="messageLabel" v-model="message" required textarea />
      <input type="submit" :value="buttonLabel" class="button" />
    </div>
  </form>
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
          name: this.name,
          email: this.email,
          message: this.message
        })
      }).then(response => {
        if (response.status === 200) {
          console.log("mail sent");
          this.email = "";
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
  &:hover
    background-color: rgba(white,0.1)

  &:focus
    outline: none
    border: 5px solid #5D9FE8

  @media screen and (max-width: 600px)
    max-width: none
    margin: 0
@media screen and (max-width: 520px)
  .fields
    display: block
    width: 100%
</style>
