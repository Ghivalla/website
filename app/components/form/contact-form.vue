<template>
  <form @submit.prevent="formHandler" class="form">
    <div class="fields">
      <TextField
        :title="content.nameLabel"
        v-model="name"
        :error="errors.name"
        required
      />
      <TextField
        :title="content.emailLabel"
        v-model="email"
        :error="errors.email"
        required
      />
      <TextField
        :title="content.messageLabel"
        :error="errors.message"
        v-model="message"
        required
        textarea
      />
      <input type="submit" :value="content.buttonLabel" class="button" />
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import TextField from "@/components/form/text-input";
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default {
  props: ["content"],
  data() {
    return {
      name: null,
      email: null,
      message: null,
      errors: {
        email: null,
        name: null,
        message: null
      }
    };
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors)
        .map(key => this.errors[key])
        .some(f => f !== null);
    },
    trimmedEmail() {
      if (!this.email) return null;
      return this.email.trim();
    }
  },
  components: { TextField },
  methods: {
    formHandler() {
      this.checkAll();
      if (this.hasErrors) return;
      this.$store.commit("setMailSent", true);
      this.sendForm();
    },
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
          this.$router.push({
            path: this.content.redirectPage,
            params: { email: this.email }
          });
        } else {
          console.log("oops something went wrong with the api");
        }
      });
    },
    checkAll() {
      this.checkEmail();
      this.checkName();
      this.checkMessage();
    },
    checkEmail() {
      this.$set(
        this.errors,
        "email",
        this.trimmedEmail &&
          this.trimmedEmail.length &&
          EMAIL_REGEX.test(this.trimmedEmail)
          ? null
          : this.content.errorMessageFormat
      );
    },
    checkName() {
      this.$set(
        this.errors,
        "name",
        this.name.trim() ? null : this.content.errorMessageEmpty
      );
    },
    checkMessage() {
      this.$set(
        this.errors,
        "message",
        this.message.trim() ? null : this.content.errorMessageEmpty
      );
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
  height: 60px
  width: 100%
  max-width: 250px
  margin-left: auto
  text-align: center
  color: $white

  @media screen and (max-width: 600px)
    max-width: none
    margin: 0
@media screen and (max-width: 520px)
  .fields
    display: block
    width: 100%
</style>
