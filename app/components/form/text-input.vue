<template>
  <div>
    <div class="inner-field" :class="{ error: error }">
      <label :for="title">{{ title }}</label>
      <textarea
        v-if="textarea"
        :id="title"
        :name="title"
        :value="value"
        ref="inputField"
        :required="required"
        @input="updateInput"
      />
      <input
        v-else
        :id="title"
        :name="title"
        :value="value"
        :type="type"
        ref="inputField"
        :required="required"
        @input="updateInput"
      />
      <p v-if="error" class="error" v-html="error" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: false, default: () => null },
    title: { type: String, required: true },
    required: { type: Boolean, required: false, default: () => false },
    type: { type: String, required: false, default: () => "text" },
    error: { type: String, required: false, default: () => null },
    textarea: { type: Boolean, required: false, default: () => false }
  },
  methods: {
    updateInput() {
      this.$emit("input", this.$refs.inputField.value);
    }
  }
};
</script>

<style lang="sass" scoped>
.inner-field
  display: flex
  flex-direction: column
  margin-bottom: 24px
label
  font-weight: 500
  color: white
  margin-bottom: 4px
input, textarea
  appearance: none
  height: 49px
  border-radius: 4px
  border: 1px solid rgba(black, 0.10)
  transition: border 0.25s ease-out
  padding: 0 16px
  font-size: 16px
  font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  &:focus
    outline: none
    border: 5px solid #5D9FE8
  &:disabled
    background: rgba($grey, 0.3)
textarea
  padding: 16px 16px
  height: 200px
p.error
  margin-top: 4px
  font-size: 14px
  line-height: 22px
  color: $red
  width: 100%
.inner-field
  &.error
    label
      color: red
    input, textarea, select
      border: 1px solid $red
      color: $red
</style>
