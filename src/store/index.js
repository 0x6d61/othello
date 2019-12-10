import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const calcArrangment = (height, width, player, arrangement) => {
  //横の駒を右から検索
  const calcRightIndex = arrangement[height]
    .slice(width, 8)
    .map((_, index, self) => {
      if (self[index] === player) {
        return width + index;
      }
    })
    .filter(i => i !== undefined);
  console.log("right", calcRightIndex);
  if (calcRightIndex.length !== 0) {
    arrangement[height].fill(player, width, calcRightIndex[0]);
  }

  const calcLeftIndex = arrangement[height]
    .slice(0, width)
    .map((_, index, self) => {
      if (self[index] === player) {
        return width - (index - 1);
      }
    })
    .filter(i => i !== undefined);

  console.log("left", calcLeftIndex);
  if (calcLeftIndex.length !== 0) {
    arrangement[height].fill(player, calcLeftIndex[0], width);
  }
  return arrangement;
};

const changeArrangement = (height, width, player, arrangement) => {
  //駒が置いてあった場合は配置の変更なし
  if (arrangement[width][height] !== 0) {
    return arrangement;
  }
  calcArrangment(height, width, player, arrangement);
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
      const newArrangement = changeArrangement(
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
