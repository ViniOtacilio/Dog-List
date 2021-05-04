import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
        favoriteDogs: []
      },
    mutations: {
      updateFavoriteDogs (state, dog) {
          state.favoriteDogs = dog;
        }
      }
});

export default store