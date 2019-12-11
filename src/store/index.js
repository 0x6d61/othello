import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const arrayDiff = (arr, arr2) => {
  const arrayFalt = arr.flat();
  const array2Falt = arr2.flat();
  for (let i = 0; i < arrayFalt.length; i++) {
    if (arrayFalt[i] !== array2Falt[i]) {
      return true;
    }
  }
  return false;
};
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
  let sideIndex = calcSideIndex(width, player, arrangement[height]);

  if (sideIndex.right !== undefined) {
    arrangement[height].fill(player, width, sideIndex.right);
  }

  if (sideIndex.left !== undefined) {
    //width+1は置いた駒の位置を含める
    arrangement[height].fill(player, sideIndex.left, width + 1);
  }

  let topAndBottomIndex = calcTopAndBottom(height, width, player, arrangement);
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
      }
    }
  }
};

export default new Vuex.Store({
  modules: { othello }
});
