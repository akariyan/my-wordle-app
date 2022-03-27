import create from "zustand";
import {
  INIT_TILE_INFO,
  SOLVE_LIMIT_TIME,
  TILE_STATE_CORRECT,
  TILE_STATE_SIMILAR,
  TILE_STATE_WRONG,
} from "../Constants/constants";
import { TileInfo } from "../types/Tiles";
import AnswerList from "../words.json";

//  게임 정보 저장 Store
interface BoardData {
  currentTime: number;
  timer: NodeJS.Timer;
  boardData: TileInfo[][];
  currentRow: number;
  currentTile: number;
  answer: string;
  correctList: string;
  similarList: string;
  wrongList: string;
  setTimer: (callback: () => void) => void;
  decreaseCount: () => void;
  addTile: (tile: string) => void;
  removeTile: () => void;
  increaseRow: () => void;
  checkTile: (tileType: string[]) => void;
  initBoard: () => void;
  loadBoard: () => void;
  isContain: (word: string) => boolean;
  stopTimer: () => void;
}

const useBoardStore = create<BoardData>((set) => ({
  currentTime: SOLVE_LIMIT_TIME,
  timer: setInterval(() => {}, 1000),
  boardData: INIT_TILE_INFO,
  currentRow: 0,
  currentTile: 0,
  answer: "",
  correctList: "1",
  similarList: "1",
  wrongList: "1",
  // 타이머 콜백 받아서 설정
  setTimer: (callback) => {
    set((state: BoardData) => {
      return {
        timer: setInterval(callback, 1000),
      };
    });
  },
  //  타이머에 넣을 시간 감소 함수
  decreaseCount: () => {
    set((state: BoardData) => {
      sessionStorage.setItem("currentTime", `${state.currentTime - 1}`);
      return {
        currentTime: state.currentTime - 1,
      };
    });
  },
  //  키 입력할 경우 타일 추가
  addTile: (tile: string) => {
    set((state: BoardData) => {
      let newBoardData = [...state.boardData];
      newBoardData[state.currentRow][state.currentTile].data = tile;
      sessionStorage.setItem("currentTile", `${state.currentTile + 1}`);
      sessionStorage.setItem("board", JSON.stringify(newBoardData));
      return {
        boardData: newBoardData,
        currentTile: state.currentTile + 1,
      };
    });
  },
  //  백스페이스 누를 경우 타일 삭제
  removeTile: () => {
    set((state: BoardData) => {
      let newBoardData = [...state.boardData];
      newBoardData[state.currentRow][state.currentTile - 1].data = "";
      sessionStorage.setItem("currentTile", `${state.currentTile - 1}`);
      sessionStorage.setItem("board", JSON.stringify(newBoardData));
      return {
        boardData: newBoardData,
        currentTile: state.currentTile - 1,
      };
    });
  },
  //  정답 체크 후 줄 변화
  increaseRow: () => {
    set((state: BoardData) => {
      sessionStorage.setItem("currentTile", "0");
      sessionStorage.setItem("currentRow", `${state.currentRow + 1}`);
      return { currentRow: state.currentRow + 1, currentTile: 0 };
    });
  },
  //  정답 체크 결과에 따른 타일 색 입히기
  checkTile: (tileType: string[]) => {
    set((state: BoardData) => {
      let newBoardData = [...state.boardData];
      let newCorrectList = state.correctList.slice();
      let newSimilarList = state.similarList.slice();
      let newWrongList = state.wrongList.slice();
      tileType.forEach((item, index) => {
        switch (item) {
          case TILE_STATE_CORRECT:
            newBoardData[state.currentRow][index].state = TILE_STATE_CORRECT;
            if (newCorrectList.indexOf(item) === -1)
              newCorrectList += newBoardData[state.currentRow][index].data;
            break;
          case TILE_STATE_SIMILAR:
            newBoardData[state.currentRow][index].state = TILE_STATE_SIMILAR;
            if (newSimilarList.indexOf(item) === -1)
              newSimilarList += newBoardData[state.currentRow][index].data;
            break;
          case TILE_STATE_WRONG:
            newBoardData[state.currentRow][index].state = TILE_STATE_WRONG;
            if (newWrongList.indexOf(item) === -1)
              newWrongList += newBoardData[state.currentRow][index].data;
            break;
        }
      });
      sessionStorage.setItem("board", JSON.stringify(newBoardData));
      sessionStorage.setItem("correctList", newCorrectList);
      sessionStorage.setItem("similarList", newSimilarList);
      sessionStorage.setItem("wrongList", newWrongList);
      return {
        boardData: newBoardData,
        correctList: newCorrectList,
        similarList: newSimilarList,
        wrongList: newWrongList,
      };
    });
  },
  //  Store 초기화
  initBoard: () => {
    set((state: BoardData) => {
      sessionStorage.clear();
      sessionStorage.setItem("currentTime", `${SOLVE_LIMIT_TIME}`);
      sessionStorage.setItem("currentRow", "0");
      sessionStorage.setItem("currentTile", "0");
      sessionStorage.setItem("board", JSON.stringify(INIT_TILE_INFO));
      const randomIndex = Math.floor(Math.random() * AnswerList.length);
      sessionStorage.setItem("answer", AnswerList[randomIndex].toUpperCase());
      sessionStorage.setItem("correctList", "");
      sessionStorage.setItem("similarList", "");
      sessionStorage.setItem("wrongList", "");
      return {
        currentTime: SOLVE_LIMIT_TIME,
        timer: setInterval(state.decreaseCount, 1000),
        boardData: INIT_TILE_INFO,
        currentRow: 0,
        currentTile: 0,
        answer: AnswerList[randomIndex].toUpperCase(),
      };
    });
  },
  //  세션 스토리지에서 정보 불러오기
  loadBoard: () => {
    set((state: BoardData) => {
      if (sessionStorage.getItem("board") === null) state.initBoard();
      return {
        currentTime: parseInt(
          sessionStorage.getItem("currentTime") ?? `${SOLVE_LIMIT_TIME}`
        ),
        boardData: JSON.parse(sessionStorage.getItem("board")!),
        currentRow: parseInt(sessionStorage.getItem("currentRow")!),
        currentTile: parseInt(sessionStorage.getItem("currentTile")!),
        answer: sessionStorage.getItem("answer")!,
        correctList: sessionStorage.getItem("correctList")!,
        similarList: sessionStorage.getItem("similarList")!,
        wrongList: sessionStorage.getItem("wrongList")!,
      };
    });
  },
  //  올바른 단어 리스트에 있는지 체크
  isContain: (word: string) => AnswerList.includes(word.toLowerCase()),
  //  정답 맞출 경우 타이머 정지
  stopTimer: () => {
    set((state: BoardData) => {
      sessionStorage.setItem("currentTime", "0");
      clearInterval(state.timer);
      return {
        currentTime: 0,
      };
    });
  },
}));

export default useBoardStore;
