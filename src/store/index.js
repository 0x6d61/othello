import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//横の計算をする関数
const calcSideIndex = (width, player, arrangement) => {
  let rightIndex = undefined;
  for (let i = width + 1; i <= 7; i++) {
    if (arrangement[i] === -player) {
      if (arrangement[i + 1] === player) {
        rightIndex = i + 1;
      }
    } else {
      break;
    }
  }

  let leftIndex = undefined;
  for (let i = width - 1; 0 <= i; i--) {
    console.log(i, arrangement[i]);
    if (arrangement[i] === -player) {
      if (arrangement[i - 1] === player) {
        leftIndex = i;
      }
    } else {
      break;
    }
  }

  return { right: rightIndex, left: leftIndex };
};
//上下の駒を検索する処理
const calcTopAndBottom = (height, width, player, arrangement) => {
  let topIndex = undefined;
  for (let i = height - 1; 0 <= i; i--) {
    if (arrangement[i][width] === -player) {
      if (arrangement[i - 1][width] === player) {
        topIndex = i;
      }
    } else {
      break;
    }
  }

  let bottomIndex = undefined;
  for (let i = height + 1; i <= 7; i++) {
    if (arrangement[i][width] === -player) {
      if (arrangement[i + 1][width] === player) {
        //見つかった座標にの次の駒を含める
        bottomIndex = i + 1;
      }
    } else {
      break;
    }
  }
  return { top: topIndex, bottom: bottomIndex };
};

const calcArrangment = (height, width, player, arrangement) => {
  //既存の配列を変更したくないため新たな配列を作成
  let newArrangement = arrangement.slice(0, arrangement.length);
  let sideIndex = calcSideIndex(width, player, arrangement[height]);

  if (sideIndex.right !== undefined) {
    newArrangement[height].fill(player, width, sideIndex.right);
  }

  if (sideIndex.left !== undefined) {
    //width+1は置いた駒の位置を含める
    newArrangement[height].fill(player, sideIndex.left, width + 1);
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
  return newArrangement;
};

const changeArrangement = (height, width, player, arrangement) => {
  return calcArrangment(height, width, player, arrangement);
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
