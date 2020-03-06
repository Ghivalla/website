<template>
  <nav>
    <div class="navigation desktop">
      <ul>
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
      <LangSwitcher />
    </div>
    <div class="navigation mobile">
      <div class="topbar">
        <LangSwitcher />
        <div
          class="menu-button"
          @click="toggleMobileMenu"
          role="button"
          tabindex="0"
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
      currentPage: "",
      showMobileMenu: false,
      openedDropdown: null
    };
  },
  computed: {
    ...mapState({
      navbar: state => state.navbar.navigation
    })
  },
  methods: {
    changePage(page) {
      this.toggleMobileMenu();
      this.currentPage = page.toLowerCase();
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
  mounted() {
    let pathArray = this.$route.path
      .substring(1)
      .replace(/\/$/, "")
      .split("/");
    let route = pathArray[0] === "fr" ? pathArray[1] : pathArray[0];
    this.currentPage = route ? route : this.navbar[0].title.toLowerCase();
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
  justify-content: space-between

  .link
    padding-left: 16px

  .link a
    color: rgba($white,0.4)

  .selected a, .link a:hover
    transition: all 0.5s
    color: $white
.navigation.mobile
  background-color: #000064
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
      color: $white
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
      background: $white
      transition: transform 0.20s ease-out

    .line2
      margin-top: 5px

  .menu-list
    width: 100%
    display: flex
    flex-direction: column
    border-bottom: 1px solid $sep
    background-color: rgb(0,0,100)
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
    background-color: rgb(0,0,100)
    border-bottom: 1px solid $sep
    ul
      display: flex

@media screen and (max-width: 800px)
  .navigation.desktop
    display: none
  .navigation.mobile
    display: block
</style>
