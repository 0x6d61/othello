import Vue from "vue";
import Vuex from "vuex";
import { calcArrangment, changeArrangment, arrayDiff } from "../lib/othello";
import { searchMaxGetPriece } from "../lib/ai";
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
    ],
    player: 1
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
      const resultArrangment = calcArrangment(
        data.height,
        data.width,
        data.player,
        arrangement
      );
      const newArrangment = changeArrangment(
        data.height,
        data.width,
        data.player,
        arrangement,
        resultArrangment
      );

      if (
        arrayDiff(
          newArrangment,
          state.arrangement[state.arrangement.length - 1]
        )
      ) {
        commit("updateArrangement", newArrangment);
      } else {
        return alert("そこには置けません。");
      }
    },
    putAiPiece({ commit, state }, player) {
      const arrangement = state.arrangement[
        state.arrangement.length - 1
      ].map(i => Array.from(i));
      const aiResultArrgement = searchMaxGetPriece(player, arrangement);
      if (
        Object.values(aiResultArrgement).filter(i => i !== undefined).length ===
        0
      ) {
        return;
      }
      const ainewArrangment = changeArrangment(
        aiResultArrgement.hight,
        aiResultArrgement.width,
        player,
        arrangement,
        aiResultArrgement
      );
      commit("updateArrangement", ainewArrangment);
    }
  }
};

export default new Vuex.Store({
  modules: { othello }
});
