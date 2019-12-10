import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const calcArrangement = (height, width, player, arrangement) => {
  console.log(height, width);
  console.log(arrangement);
  arrangement[height][width] = player;
  return arrangement;
};

const othello = {
  state: {
    arrangement: [
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
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
      console.log(state);
      const newArrangement = calcArrangement(
        data.height,
        data.width,
        1,
        state.arrangement[state.arrangement.length - 1]
      );
      commit("updateArrangement", newArrangement);
    }
  }
};

export default new Vuex.Store({
  modules: { othello }
});
