import fetchEntries from "@/api/get";
import fetchContent from "@/api";

export const state = () => ({});

export const mutations = {
  setContent: (state, content) => (state.content = content),

  setGlobals: (state, globals) => {
    Object.keys(globals).forEach(el => {
      state[el] = globals[el];
    });
  }
};

export const getters = {};

export const actions = {
  async nuxtServerInit({ state, commit }) {
    const globals = await fetchEntries(state.i18n.locale, {
      content_type: ["profile", "navbar", "form"]
    });
    commit("setGlobals", globals);
  },

  async getEntries({ state }, options) {
    const content = await fetchEntries(state.i18n.locale, options);
    return Array.isArray(options.content_type)
      ? content
      : content[options.content_type];
  }
};
