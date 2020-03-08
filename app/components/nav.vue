<template>
  <nav>
    <div class="navigation desktop">
      <LangSwitcher />
      <ul>
        <li
          v-for="link in navbar"
          :key="link.title"
          @click="changePage(link.title)"
          :class="{ selected: link.title.toLowerCase() === currentPage }"
        >
          <span class="link">
            <nuxt-link :to="link.href">{{
              link.title.toUpperCase()
            }}</nuxt-link>
          </span>
        </li>
      </ul>
    </div>
    <div class="navigation mobile">
      <div class="topbar">
        <LangSwitcher />
        <div
          class="menu-button"
          @click="toggleMobileMenu"
          role="button"
          tabindex="1"
          :aria-pressed="showMobileMenu"
        >
          MENU
          <div class="icon" :class="{ opened: showMobileMenu }">
            <div class="line line1" />
            <div class="line line2" />
          </div>
        </div>
      </div>
      <ul v-if="showMobileMenu" class="menu-list">
        <li
          class="link h3"
          :class="{ selected: link.title.toLowerCase() === currentPage }"
          v-for="link in navbar"
          :key="link.title"
          @click="changePage(link.title)"
        >
          <nuxt-link :to="link.href">{{ link.title.toUpperCase() }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
import LangSwitcher from "@/components/langSwitcher";
export default {
  data() {
    return {
      showMobileMenu: false,
      openedDropdown: null
    };
  },
  computed: {
    ...mapState({
      navbar: state => state.navbar.navigation,
      currentPage: state => state.currentPage
    })
  },
  methods: {
    changePage(page) {
      this.toggleMobileMenu();
      this.$store.commit("setCurrentPage", page.toLowerCase());
    },
    hideDropdowns() {
      this.openedDropdown = null;
    },
    hideMobileMenu() {
      this.hideDropdowns();
      this.showMobileMenu = false;
    },
    toggleMobileMenu() {
      this.hideDropdowns();
      this.showMobileMenu = !this.showMobileMenu;
    },
    toggleSubmenu(name) {
      this.openedDropdown = this.openedDropdown !== name ? name : null;
    }
  },
  components: { LangSwitcher }
};
</script>
<style lang="sass" scoped>
.hidden
  display: none
.navigation
  position: fixed
  top: 0px
  left: 0px
  padding: 40px
  width: 100%
  display: flex
  flex-direction: row-reverse
  justify-content: space-between

  li
    margin-bottom: 10px
    overflow: hidden
    padding: 6px
  .link
    font-size: 20px
    width: 200px
    position: relative
    transition: all 0.3s linear
    a
      color: $grey
    &::before
      content: ''
      width: 40px;
      height: 2px
      position: absolute
      bottom: 5px
      left: -40px
      opacity: 1
      display: block
      background-color: black
      transform: translate(-20%, 100%);
      transition: all 0.3s linear
  .selected .link, .link:hover
    padding-left: 45px
    a
      letter-spacing: 2px
      color: $black
    &::before
     opacity: 1
     left: 0


.navigation.mobile
  background-color: $white
  display: none
  padding: 0
  .topbar
    display: flex
    justify-content: space-between
    padding: 25px
    border-bottom: 1px solid $sep
    .menu-button
      font-size: 14px
      letter-spacing: 1px
      font-weight: 600
      display: flex
      align-items: center
      background: none
      padding: 0
      outline: none

    .icon
      margin: 0 0 -2px 8px

      &.opened

        .line1
          transform: translate3d(0, 3.5px, 0) rotate(45deg)

        .line2
          transform: translate3d(0, -3.5px, 0) rotate(-45deg)

    .line
      width: 14px
      height: 2px
      background: $black
      transition: transform 0.20s ease-out

    .line2
      margin-top: 5px

  .menu-list
    width: 100%
    display: flex
    flex-direction: column
    border-bottom: 1px solid $sep
    .link
      padding: 18px 24px
      font-weight: 500
      width: 100%

      &:last-child
        margin-bottom: 40px

      &:first-child
        margin-top: 40px

@media screen and (max-width: 1800px)
  .navigation
    padding: 25px
    border-bottom: 1px solid $sep
    background-color: $white
    ul
      display: flex
      .link
        padding-bottom: 0px
        width: auto
        margin-right: 32px
        display: flex
        align-items: center
        a::before
          display: none
      .selected a
        padding-left: 0
      .link a:hover, .selected a
        padding-left: 0px
        letter-spacing: normal

@media screen and (max-width: 800px)
  .navigation.desktop
    display: none
  .navigation.mobile
    display: block
    .link
      font-size: 26px
</style>
