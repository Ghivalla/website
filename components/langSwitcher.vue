<template>
  <div
    class="dropdown-lang"
    :class="{ 'opened-lang' : active }"
    @click="active=!active"
    v-show="availableLocales.length > 1"
  >
    <div class="dropdown-trigger">
      <div class="dropdown-selected">{{ currentLocale.toUpperCase() }}</div>
    </div>
    <div class="dropdown-menu" @mouseleave="active = false">
      <ul>
        <li
          v-for="lang in availableLocales"
          :key="lang.alt"
          @click="switchLang"
        >
    	<nuxt-link
    		class="lang-item"
			v-if="currentLocale !== lang.alt"
			:to="switchLocalePath(lang.alt)"
	    >
			{{lang.desc}}
		</nuxt-link>
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
      nav: state => state.navbar,
    }),
    currentLocale() {
      return this.$store.state.i18n.locale;
    },
    availableLocales() {
      return this.nav.langs
    }
  },
  methods: {
    switchLang(lang) {
      this.openedDropdown = false
    }
  },
  mounted() {
  	console.log(this.availableLocales)
  }
};
</script>
<style lang="sass" scoped>
.dropdown-lang
	margin-left: 8px
	.dropdown-menu
		background: $white
		border-radius: 4px
		box-shadow: 0px 12.7843px 12.7843px rgba(24, 51, 47, 0.03), 0px 6.39216px 6.39216px rgba(24, 51, 47, 0.03), 0px 3.19608px 3.19608px rgba(24, 51, 47, 0.03), 0px 1.59804px 1.59804px rgba(24, 51, 47, 0.03), 0px 19.1765px 19.1765px rgba(24, 51, 47, 0.03), 0px 0px 0.79902px rgba(24, 51, 47, 0.24)
		margin-top: 20px
		margin-left: -74px
		opacity: 0
		position: absolute
		top: 60%
		visibility: hidden
		width: 134px
		.lang-item
			height: 46px
			display: flex
			align-items: center
			padding-left: 15px
			font-weight: 500
			color: $black
			&:first-child
				border-radius: 4px 4px 0 0
			&:last-child
				border-radius: 0 0 4px 4px
			&:hover
				background-color: #f1faf9
				cursor: pointer
	.dropdown-trigger
		display: flex
		align-items: center
		cursor: pointer
		font-weight: 500
		transition: color 0.2s ease-out
		justify-content: center
		font-size: 14px
		border: 1px solid $white
		box-sizing: border-box
		border-radius: 3px
		padding: 11px 10px 14px 15px
		-webkit-user-select: none
		-moz-user-select: none
		-ms-user-select: none
		user-select: none
		.dropdown-selected
			color: $white
		&::after
			content: ''
			background-repeat: no-repeat
			background-size: contain
			display: block
			margin: 1px 0 0 8px
			fill: black
			width: 8px
			height: 4px
	&.opened-lang
		.dropdown-trigger
			color: $white
		&::after
		.dropdown-menu
			visibility: visible
			opacity: 1
</style>
