import {
  calcTopAndBottom,
  calcRightSlant,
  calcLeftSlant,
  calcSideIndex
} from "../othello";

export const searchMaxGetPriece = (player, arragement) => {
  let othelloMove = {
    right: undefined,
    left: undefined,
    top: undefined,
    bottom: undefined,
    rightslanttop: undefined,
    rightslantbotton: undefined,
    leftslanttop: undefined,
    leftslantbotton: undefined
  };
  //おける場所を全探索
  for (let h = 0; h <= 7; h++) {
    for (let w = 0; w <= 7; w++) {
      const calcGetPiece = Object.assign(
        calcSideIndex(w, player, arragement[h]),
        calcTopAndBottom(h, w, player, arragement),
        calcRightSlant(h, w, player, arragement),
        calcLeftSlant(h, w, player, arragement)
      );
      //現在置いた場所からの差を合計してる
      const tmp = Object.values(calcGetPiece)
        .filter(i => i !== undefined)
        .reduce((acc, current) => {
          return acc + current;
        }, 0);
      const maxMove = Object.values(othelloMove)
        .filter(i => i !== undefined)
        .reduce((acc, current) => {
          return acc + current;
        }, 0);
      if (tmp > maxMove) {
        calcGetPiece.hight = h;
        calcGetPiece.width = w;
        othelloMove = calcGetPiece;
      }
    }
  }
  return othelloMove;
};
