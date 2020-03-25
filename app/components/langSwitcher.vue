<template>
  <div class="dropdown" :class="{ opened: active }" @click="active = !active">
    <div
      class="dropdown-trigger"
      role="button"
      :aria-label="nav.langswitchLabel"
      tabindex="0"
      :aria-pressed="active"
      :aria-expanded="active"
      :aria-haspopup="active"
      @keyup.enter="active = !active"
      @keyup.escape="active = false"
    >
      <span class="dropdown-trigger-content">
        <img class="lazyload country-image" :src="currentLocale.src" alt />
        <div>{{ currentLocale.alt.toUpperCase() }}</div>
      </span>
    </div>
    <div class="dropdown-menu u-shadow" @mouseleave="active = false">
      <ul>
        <li
          v-for="lang in availableLocales"
          :key="lang.alt"
          @click="switchLang(lang.alt)"
          @keyup.enter="switchLang(lang.alt)"
          @keyup.escape="active = false"
          class="lang-item"
          tabindex="0"
        >
          <img class="lazyload country-image" :src="lang.src" alt />
          {{ lang.desc }}
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
      active: false,
      showLangDropDown: false
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
      this.active = false;
      window.location.href = this.switchLocalePath(lang);
    }
  }
};
</script>
<style lang="sass" scoped>
.dropdown
  position: relative

  .country-image
    width: 20px
    margin-right: 10px

  .dropdown-menu
    background: $white
    border-radius: 4px
    margin-top: 18px
    opacity: 0
    position: absolute
    top: 30%
    right: 0
    visibility: hidden
    width: 150px
    border: 1px solid $sep

    .lang-item
      padding: 20px 5px
      display: flex
      align-items: center
      color: $black
      &:hover
        cursor: pointer
        border-radius: 4px

    .country-image
      margin-left: 16px
      margin-right: 8px

  .dropdown-trigger
    &:focus
      outline-offset: 2px
    &-content
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
      width: 80px

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
