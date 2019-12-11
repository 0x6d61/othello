import Vue from "vue";
import Vuex from "vuex";
import { calcArrangment, arrayDiff } from "../lib/othello";
Vue.use(Vuex);

const othello = {
  state: {
    arrangement: [
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, -0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    ]
  },
  mutations: {
    updateArrangement(state, data) {
      state.arrangement.push(data);
    }
  },
  actions: {
    putPiece({ commit, state }, data) {
      const arrangement = state.arrangement[
        state.arrangement.length - 1
      ].map(i => Array.from(i));
      const newArrangement = calcArrangment(
        data.height,
        data.width,
        data.player,
        arrangement
      );
      if (
        arrayDiff(
          newArrangement,
          state.arrangement[state.arrangement.length - 1]
        )
      ) {
        commit("updateArrangement", newArrangement);
      } else {
        return alert("そこには置けません。");
      }
    }
  }
};

export default new Vuex.Store({
  modules: { othello }
});
