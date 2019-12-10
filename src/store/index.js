import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const othello = {
  state: {
    arrangement: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, -1, 0, 0, 0],
      [0, 0, 0, -1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  mutations: {},
  actions: {}
};

export default new Vuex.Store({
  modules: { othello }
});
