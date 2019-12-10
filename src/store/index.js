import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//横の計算をする関数
const calcSideIndex = (width, player, arrangement) => {
  console.log(width, arrangement);
  let rightIndex = undefined;
  for (let i = width + 1; i < 8; i++) {
    if (arrangement[i] === player && arrangement[i - 1] === -player) {
      rightIndex = i;
      break;
    }
  }

  let leftIndex = undefined;
  for (let i = width - 1; 0 <= i; i--) {
    if (arrangement[i] === player && arrangement[i + 1] === -player) {
      leftIndex = i;
      break;
    }
  }

  return { right: rightIndex, left: leftIndex };
};

const calcTopAndBottom = (height, width, player, arrangement) => {
  let topIndex = undefined;
  for (let i = height - 1; 0 <= i; i--) {
    if (
      arrangement[i][width] === player &&
      arrangement[i + 1][width] === -player
    ) {
      topIndex = i;
      break;
    }
  }

  let bottomIndex = undefined;
  for (let i = height + 1; i < 8; i++) {
    console.log(i, width, arrangement[i][width]);
    if (
      arrangement[i][width] === player &&
      arrangement[i - 1][width] === -player
    ) {
      bottomIndex = i;
      break;
    }
  }
  return { top: topIndex, bottom: bottomIndex };
};

const calcArrangment = (height, width, player, arrangement) => {
  let newArrangement = arrangement.slice(0, arrangement.length);
  let sideIndex = calcSideIndex(width, player, arrangement[height]);
  console.log(sideIndex);
  if (sideIndex.right !== undefined) {
    newArrangement[height].fill(player, width, sideIndex.right);
  }

  if (sideIndex.left !== undefined) {
    console.log(sideIndex.left);
    newArrangement[height].fill(player, sideIndex.left, width);
  }

  let topAndBottomIndex = calcTopAndBottom(height, width, player, arrangement);
  console.log(topAndBottomIndex);
  if (topAndBottomIndex.top !== undefined) {
    for (let i = height; topAndBottomIndex.top <= i; i--) {
      newArrangement[i][width] = player;
    }
  }

  if (topAndBottomIndex.bottom !== undefined) {
    for (let i = height; i < topAndBottomIndex.bottom; i++)
      newArrangement[i][width] = player;
  }
  console.log(newArrangement);
  return newArrangement;
};

const changeArrangement = (height, width, player, arrangement) => {
  //駒が置いてあった場合は配置の変更なし
  if (arrangement[height][width] !== 0) {
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
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, -1, 1, -1, 0, 0, 0],
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
