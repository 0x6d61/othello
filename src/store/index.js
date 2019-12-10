import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//横の計算をする関数
const calcSideIndex = (width, player, arrangement) => {
  const calcRightIndex = arrangement
    .slice(width, 8)
    .map((_, index, self) => {
      if (self[index] === player) {
        return width + index;
      }
    })
    .filter(i => i !== undefined);
  const calcLeftIndex = arrangement
    .slice(0, width)
    .map((_, index, self) => {
      if (self[index] === player) {
        return width - (index - 1);
      }
    })
    .filter(i => i !== undefined);
  return { right: calcRightIndex[0], left: calcLeftIndex[0] };
};

const calcTopAndBottom = (height, width, player, arrangement) => {
  let topIndex = undefined;
  for (let i = height; 0 <= i; i--) {
    if (arrangement[i][width] === player) {
      topIndex = i;
      break;
    }
  }

  let bottomIndex = undefined;
  for (let i = height; i < 8; i++) {
    if (arrangement[i][width] === player) {
      bottomIndex = i;
      break;
    }
  }
  return { top: topIndex, bottom: bottomIndex };
};

const calcArrangment = (height, width, player, arrangement) => {
  const sideIndex = calcSideIndex(width, player, arrangement[height]);
  if (sideIndex.right !== undefined) {
    arrangement[height].fill(player, width, sideIndex.right);
  }

  if (sideIndex.left !== undefined) {
    arrangement[height].fill(player, sideIndex.left, width);
  }

  const topAndBottomIndex = calcTopAndBottom(
    height,
    width,
    player,
    arrangement
  );
  console.log(topAndBottomIndex);
  if (topAndBottomIndex.top !== undefined) {
    for (let i = height; topAndBottomIndex.top <= i; i--) {
      arrangement[i][width] = player;
    }
  }

  if (topAndBottomIndex.bottom !== undefined) {
    for (let i = height; i < topAndBottomIndex.bottom; i++)
      arrangement[i][width] = player;
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
