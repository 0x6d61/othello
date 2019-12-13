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
    if (arrangement[height - i][width + i] === -player) {
      if (arrangement[height - i - 1][width + i + 1] === player) {
        rightSlantTop = i;
      }
    } else {
      break;
    }
  }
  let rightSlantBotton = undefined;
  for (let i = 1; height + i <= 7; i++) {
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
  return Object.assign(
    calcSideIndex(width, player, arrangement[height]),
    calcTopAndBottom(height, width, player, arrangement),
    calcRightSlant(height, width, player, arrangement),
    calcLeftSlant(height, width, player, arrangement)
  );
};

export const changeArrangment = (
  height,
  width,
  player,
  arrangement,
  movePiece
) => {
  if (movePiece.right !== undefined) {
    arrangement[height].fill(player, width, movePiece.right);
  }

  if (movePiece.left !== undefined) {
    //width+1は置いた駒の位置を含める
    arrangement[height].fill(player, movePiece.left, width + 1);
  }

  if (movePiece.top !== undefined) {
    for (let i = 0; i <= movePiece.top; i++) {
      arrangement[height - i][width] = player;
    }
  }

  if (movePiece.bottom !== undefined) {
    for (let i = 0; i < movePiece.bottom; i++) {
      console.log(height);
      arrangement[height + i][width] = player;
    }
  }
  //右斜め上の駒を埋める
  if (movePiece.rightslanttop !== undefined) {
    for (let i = 0; i <= movePiece.rightslanttop; i++) {
      arrangement[height - i][width + i] = player;
    }
  }

  //右斜め下の駒を埋める
  if (movePiece.rightslantbotton !== undefined) {
    for (let i = 0; i <= movePiece.rightslantbotton; i++) {
      arrangement[height + i][width - i] = player;
    }
  }

  //左斜め上絵の駒を埋める
  if (movePiece.leftslanttop !== undefined) {
    for (let i = 0; i <= movePiece.leftslanttop; i++) {
      arrangement[height - i][width - i] = player;
    }
  }
  //左斜め下の駒を埋める
  if (movePiece.leftslantbotton !== undefined) {
    for (let i = 0; i <= movePiece.leftslantbotton; i++) {
      arrangement[height + i][width + i] = player;
    }
  }

  return arrangement;
};
