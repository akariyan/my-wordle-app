import { TileInfo } from "../types/Tiles";

//  문제 제한 시간(초) : 10분
export const SOLVE_LIMIT_TIME = 600;
//  Toast 메시지 노출 시간
export const TOAST_TIME = 1000;
// TILE 정답 상태
export const TILE_STATE_CORRECT = "correct";
export const TILE_STATE_SIMILAR = "similar";
export const TILE_STATE_WRONG = "wrong";
export const TILE_STATE_NOTHING = "nothing";
//  게임용 보드 초기값
export const INIT_TILE_INFO: TileInfo[][] = [
  [
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
  ],
  [
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
  ],
  [
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
  ],
  [
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
  ],
  [
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
  ],
  [
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
    { data: "", state: TILE_STATE_NOTHING },
  ],
];
