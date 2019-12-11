//オセロの配置が更新されたか判断する関数
export const arrayDiff = (arr, arr2) => {
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
export const calcSideIndex = (width, player, arrangement) => {
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
export const calcTopAndBottom = (height, width, player, arrangement) => {
  let topIndex = undefined;
  for (let i = 1; 0 <= height - i; i++) {
    console.log(height - i, width);
    if (arrangement[height - i][width] === -player) {
      if (arrangement[height - i - 1][width] === player) {
        topIndex = i;
      }
    } else {
      break;
    }
  }

  let bottomIndex = undefined;
  for (let i = 1; height + i <= 7; i++) {
    if (arrangement[height + i][width] === -player) {
      if (arrangement[height + i + 1][width] === player) {
        //見つかった座標に次の駒を含める
        bottomIndex = i + 1;
      }
    } else {
      break;
    }
  }
  return { top: topIndex, bottom: bottomIndex };
};
export const calcRightSlant = (height, width, player, arrangement) => {
  let rightSlantTop = undefined;
  //横が端についたループ終了
  for (let i = 1; 0 <= height - i; i++) {
    console.log("righttop", height - i, width + i);
    if (arrangement[height - i][width + i] === -player) {
      if (arrangement[height - i - 1][width + i + 1] === player) {
        rightSlantTop = i;
        console.log("wei");
      }
    } else {
      break;
    }
  }
  let rightSlantBotton = undefined;
  for (let i = 1; height + i <= 7; i++) {
    console.log("rightbotton", height + i, width - i);
    if (arrangement[height + i][width - i] === -player) {
      if (arrangement[height + i + 1][width - i - 1] === player) {
        rightSlantBotton = i;
      }
    } else {
      break;
    }
  }
  return { rightslanttop: rightSlantTop, rightslantbotton: rightSlantBotton };
};
export const calcLeftSlant = (height, width, player, arrangement) => {
  let leftSlantTop = undefined;
  for (let i = 1; 0 <= height - i; i++) {
    if (arrangement[height - i][width - i] === -player) {
      if (arrangement[height - i - 1][width - i - 1] === player) {
        leftSlantTop = i;
      }
    } else {
      break;
    }
  }
  let leftSlantBotton = undefined;
  for (let i = 1; height + i <= 7; i++) {
    if (arrangement[height + i][width + i] === -player) {
      if (arrangement[height + i + 1][width + i + 1] === player) {
        leftSlantBotton = i;
      }
    }
  }
  return { leftslanttop: leftSlantTop, leftslantbotton: leftSlantBotton };
};
export const calcArrangment = (height, width, player, arrangement) => {
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
    for (let i = 0; i <= topAndBottomIndex.top; i++) {
      arrangement[height - i][width] = player;
    }
  }

  if (topAndBottomIndex.bottom !== undefined) {
    for (let i = 0; i < topAndBottomIndex.bottom; i++)
      arrangement[height + i][width] = player;
  }
  //右斜め上の駒を埋める
  let rightSlant = calcRightSlant(height, width, player, arrangement);
  console.log(rightSlant);
  if (rightSlant.rightslanttop !== undefined) {
    for (let i = 0; i <= rightSlant.rightslanttop; i++) {
      arrangement[height - i][width + i] = player;
    }
  }

  //右斜め下の駒を埋める
  if (rightSlant.rightslantbotton !== undefined) {
    for (let i = 0; i <= rightSlant.rightslantbotton; i++) {
      arrangement[height + i][width - i] = player;
    }
  }

  //左斜め上絵の駒を埋める
  const leftSlant = calcLeftSlant(height, width, player, arrangement);
  console.log(leftSlant);
  if (leftSlant.leftslanttop !== undefined) {
    for (let i = 0; i <= leftSlant.leftslanttop; i++) {
      arrangement[height - i][width - i] = player;
    }
  }
  //左斜め下の駒を埋める
  if (leftSlant.leftslantbotton !== undefined) {
    for (let i = 0; i <= leftSlant.leftslantbotton; i++) {
      arrangement[height + i][width + i] = player;
    }
  }

  return arrangement;
};
