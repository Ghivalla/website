<template>
  <div class="wrapper">
    <div class="grid">
      <div class="item u-shadow" v-for="item in cards" :key="item.title">
        <img v-if="item.image" :src="item.image.src" alt />
        <h2 class="h3">{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    cards: {
      type: Array,
      required: true
    }
  }
};
</script>


<style lang="sass" scoped>
.wrapper
  text-align: center
  margin-bottom: 128px

.grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 24px

.item
  background: $white
  border-radius: 4px
  padding: 40px
  text-align: left

img
  margin-bottom: 16px
  width: 50px

.h3
  font-weight: 500
  margin-bottom: 8px

p
  color: $grey

@media screen and (max-width: 1000px)

  .wrapper
    padding-bottom: 70px
    margin-top: 0

    .grid
      grid-template-columns: 1fr

@media screen and (max-width: 600px)
  .wrapper
    padding: 0
</style>