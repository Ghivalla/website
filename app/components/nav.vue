<template>
  <div>
    <!-- DESKTOP NAVIGATION -->
    <div class="navigation desktop" v-if="displayDesktopNav">
      <LangSwitcher />
      <nav>
        <ul role="menu">
          <li
            role="menuitem"
            v-for="link in navbar"
            :key="link.title"
            @click="changePage(link)"
            :class="{ selected: link.title.toLowerCase() === currentPage }"
          >
            <span class="link">
              <nuxt-link :to="link.href">
                {{ link.title.toUpperCase() }}
              </nuxt-link>
            </span>
          </li>
        </ul>
      </nav>
    </div>
    <!-- MOBILE NAVIGATION -->
    <nav v-else>
      <div class="navigation mobile">
        <div class="topbar">
          <LangSwitcher />
          <div
            class="menu-button"
            @click="toggleMobileMenu"
            role="button"
            tabindex="1"
            :aria-pressed="dropDownStatus"
          >
            MENU
            <div class="icon" :class="{ opened: dropDownStatus }">
              <div class="line line1" />
              <div class="line line2" />
            </div>
          </div>
        </div>
        <ul v-if="dropDownStatus" class="menu-list">
          <li
            class="link h3"
            :class="{ selected: link.title.toLowerCase() === currentPage }"
            v-for="link in navbar"
            :key="link.title"
            @click="changePage(link)"
          >
            <nuxt-link :to="link.href">{{
              link.title.toUpperCase()
            }}</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from "vuex";
import LangSwitcher from "@/components/langSwitcher";
export default {
  data() {
    return {
      dropDownStatus: false,
      screenWidth: null
    };
  },
  computed: {
    ...mapState({
      navbar: state => state.navbar.navigation,
      currentPage: state => state.currentPage
    }),
    displayDesktopNav() {
      return this.screenWidth > 800;
    }
  },
  methods: {
    changePage(link) {
      this.toggleMobileMenu();
      this.$store.commit("setCurrentPage", link.title.toLowerCase());
      this.$router.push({
        path: link.href
      });
    },
    hideMobileMenu() {
      this.dropDownStatus = false;
    },
    toggleMobileMenu() {
      this.dropDownStatus = !this.dropDownStatus;
      if (this.dropDownStatus) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
    onScreenResize(e) {
      this.screenWidth = e.target.visualViewport.width;
    },
    disableScroll() {
      document.body.classList.add("stop-scrolling");
    },
    enableScroll() {
      document.body.classList.remove("stop-scrolling");
    }
  },
  components: { LangSwitcher },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.onScreenResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onScreenResize);
  }
};
</script>
<style lang="sass" scoped>
.navigation
  position: fixed
  top: 0px
  left: 0px
  padding: 40px
  width: 100%

.desktop
  display: flex
  flex-direction: row-reverse
  justify-content: space-between
  height: 80px

  li
    margin-bottom: 10px
    overflow: hidden
    padding: 6px
    &:hover
      cursor: pointer
  .link
    width: 200px
    position: relative
    transition: all 0.3s linear

    a
      color: $grey

    &::before
      content: ''
      width: 35px
      height: 2px
      position: absolute
      bottom: 5px
      left: -40px
      opacity: 1
      display: block
      background-color: black
      transform: translate(-40%, 100%)
      transition: all 0.3s ease-in

    &::selection
      background-color: none
  .selected .link, .link:hover
    padding-left: 45px
    a
      letter-spacing: 2px
      color: $black
    &::before
      opacity: 1
      left: 15px
.mobile
  background-color: $white
  padding: 0
  z-index: 1
  .topbar
    display: flex
    justify-content: space-between
    padding: 25px
    border-bottom: 1px solid $sep
    width: 100%
    .menu-button
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
      transition: transform 0.3s linear

    .line2
      margin-top: 5px

  .menu-list
    width: 100%
    display: flex
    flex-direction: column
    border-bottom: 1px solid $sep
    overflow-y: scroll
    max-height: calc( 100vh - 90px )
    .link
      padding: 18px 24px
      font-weight: 500
      width: 100%

      &:last-child
        margin-bottom: 40px

      &:first-child
        margin-top: 40px

    .selected.link, .link:hover
      a
        color: $black

@media screen and (max-width: 1800px)
  .navigation.desktop
    padding: 25px
    border-bottom: 1px solid $sep
    background-color: $white
    height: auto

    ul
      display: flex
      align-content: center
      justify-content: flex-start
      align-items: center
      height: 100%

      li
        margin-bottom: 0
        display: flex

      .link
        width: auto
        padding-bottom: 0px
        transition: none
        margin-right: 32px
        &::before
          display: none

      .selected a
        padding-left: 0
      .selected .link, .link:hover
        padding-left: 0px
        a
          letter-spacing: normal
          color: $black
</style>
