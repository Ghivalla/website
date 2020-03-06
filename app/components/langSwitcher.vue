<template>
  <div class="dropdown" :class="{ 'opened' : active }" @click="active=!active">
    <div class="dropdown-trigger">
      <img class="lazyload country-image" :src="currentLocale.src" />
      <div>{{ currentLocale.alt.toUpperCase() }}</div>
    </div>
    <div class="dropdown-menu" @mouseleave="active = false">
      <ul>
        <li
          v-for="lang in availableLocales"
          :key="lang.alt"
          @click="switchLang(lang.alt)"
          class="lang-item"
        >
          <img class="lazyload country-image" :src="lang.src" />
          {{lang.desc}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: false
    };
  },
  computed: {
    ...mapState({
      nav: state => state.navbar
    }),
    currentLocale() {
      return this.allLocales.find(
        local => local.alt === this.$store.state.i18n.locale
      );
    },
    allLocales() {
      return this.nav.langs;
    },
    availableLocales() {
      return this.allLocales.filter(
        local => local.alt != this.currentLocale.alt
      );
    }
  },
  methods: {
    switchLang(lang) {
      this.openedDropdown = false;
      window.location.href = this.switchLocalePath(lang);
    }
  }
};
</script>
<style lang="sass" scoped>
.dropdown
  position: relative

  .country-image
    width: 16px
    margin-right: 5px

  .dropdown-menu
    background: $white
    border-radius: 4px
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.16), 0 24px 24px 0 rgba(0,0,0,0.05), 0 2px 2px 0 rgba(0,0,0,0.05), 0 4px 4px 0 rgba(0,0,0,0.05), 0 8px 8px 0 rgba(0,0,0,0.05), 0 16px 16px 0 rgba(0,0,0,0.05)
    margin-top: 18px
    opacity: 0
    position: absolute
    top: 50%
    right: 0
    visibility: hidden
    width: 120px

    .lang-item
      height: 46px
      display: flex
      align-items: center
      &:hover
        cursor: pointer

    .country-image
      margin-left: 16px
      margin-right: 8px

  .dropdown-trigger
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    font-size: 14px
    transition: color 0.2s ease-out
    border: 1px solid #CECECE
    box-sizing: border-box
    border-radius: 5px
    padding: 7px
    height: 40px
    width: 60px

  &.opened
    .dropdown-menu
      visibility: visible
      opacity: 1
      color: $black

@media screen and (max-width: 1800px)
  .dropdown .dropdown-menu
    top: 100%

@media screen and (max-width: 800px)
  .dropdown .dropdown-menu
    left: 0
</style>
