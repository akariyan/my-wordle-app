import {
  TILE_STATE_CORRECT,
  TILE_STATE_SIMILAR,
  TILE_STATE_WRONG,
} from "../Constants/constants";
// 게임 보드용 타일 타입
export type TileInfo = {
  data: string;
  isCorrect: boolean;
  isSimilar: boolean;
  isWrong: boolean;
};

export type TileType =
  | typeof TILE_STATE_CORRECT
  | typeof TILE_STATE_SIMILAR
  | typeof TILE_STATE_WRONG;
