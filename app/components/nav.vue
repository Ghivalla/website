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
          <nuxt-link :to="link.href">
            {{ link.title.toUpperCase() }}
          </nuxt-link>
        </li>
      </ul>
      <SocialMediaList />
    </div>
    <div class="navigation mobile">
      <div class="topbar">
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
          <nuxt-link :to="link.href">
            {{ link.title.toUpperCase() }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
import SocialMediaList from "@/components/social-media-list";
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
      this.currentPage = page.toLowerCase();
      this.toggleMobileMenu();
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
  components: { SocialMediaList }
};
</script>
<style lang="sass" scoped>
.hidden
  display: none
.navigation
	position: fixed
	top: 40px
	left: 40px

	.link
		padding-left: 16px

	.link a
		color: rgba($white,0.4)

	.selected a, .link a:hover
		transition: all 0.5s
		color: $white
.navigation.mobile
  background-color: rgb(0,0,100)
  display: none
  padding: 0
  .topbar
    display: flex
    justify-content: flex-end
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
    border: 1px solid $sep
    .link
      padding: 18px 24px
      font-weight: 500
      width: 100%

      &:nth-last-child(2)
        border-bottom: 1px solid $sep

    .link:not(:first-child)
      border-top: 1px solid $sep

@media screen and (max-width: 1800px)
  .navigation
    top: 0
    left: 0
    right: 0
    display: flex
    justify-content: space-between
    padding: 25px
    ul
      display: flex

@media screen and (max-width: 800px)
  .navigation.desktop
    display: none
  .navigation.mobile
    display: block
</style>
