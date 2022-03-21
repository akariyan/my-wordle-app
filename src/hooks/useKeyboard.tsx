import useBoardStore from "src/zustand/useBoardStore";
import { toast } from "react-toastify";
import {
  TILE_STATE_CORRECT,
  TILE_STATE_SIMILAR,
  TILE_STATE_WRONG,
  TOAST_TIME,
} from "src/Constants/constants";

export function useKeyboard(
  setModal?: (flag: boolean) => void,
  setResult?: (flag: boolean) => void
) {
  const {
    boardData,
    currentRow,
    currentTile,
    answer,
    addTile,
    removeTile,
    increaseRow,
    checkTile,
    isContain,
    stopTimer,
  } = useBoardStore();
  let resultFlag = false;
  //  키보드 입력 이벤트
  const onKeyUp = () => {
    window.onkeyup = (e: KeyboardEvent) => {
      inputKey(e.key);
    };
  };

  const inputKey = (key: string) => {
    if (resultFlag) return;
    if (key.match(/[a-zA-Z]/) && key.length === 1) {
      //  현재 라인의 가장 마지막 TILE에 입력값 세팅, 마지막 TILE일 경우 무시
      if (currentTile < 5) addTile(key.toUpperCase());
    } else if (key === "Enter") {
      //  단어가 전부 입력됐는지 검사
      if (currentTile < 5) {
        toast.error("Not enough letters", {
          autoClose: TOAST_TIME,
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const word = boardData[currentRow].map((item) => item.data).join("");
        //  유효 단어인지 검사
        if (!isContain(word)) {
          toast.error("Not in word list", {
            autoClose: TOAST_TIME,
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (word === answer) {
          checkTile([
            TILE_STATE_CORRECT,
            TILE_STATE_CORRECT,
            TILE_STATE_CORRECT,
            TILE_STATE_CORRECT,
            TILE_STATE_CORRECT,
          ]);
          if (setModal) {
            setModal(true);
          }
          if (setResult) {
            setResult(true);
          }
          resultFlag = false;
          stopTimer();
        } else {
          // 정답 체크
          const tileList = boardData[currentRow].map((item, index) => {
            if (item.data === answer[index]) {
              // 완전 일치
              return TILE_STATE_CORRECT;
            } else if (answer.includes(item.data)) {
              // 포함
              if (word.indexOf(item.data) !== word.lastIndexOf(item.data)) {
                // 입력받은 단어에서 같은 글자 중복
                if (
                  answer.indexOf(item.data) !== answer.lastIndexOf(item.data)
                ) {
                  // 정답에서 중복되는 글자가 있을 경우
                  return TILE_STATE_SIMILAR;
                } else if (
                  index >= word.lastIndexOf(item.data) ||
                  answer.lastIndexOf(item.data) === word.lastIndexOf(item.data)
                ) {
                  //  앞은 유사 판정인데 뒤는 일치 판정일 경우
                  return TILE_STATE_WRONG;
                } else {
                  return TILE_STATE_SIMILAR;
                }
              } else {
                return TILE_STATE_SIMILAR;
              }
            } else {
              return TILE_STATE_WRONG;
            }
          });
          checkTile(tileList);
          if (currentRow === 5) {
            if (setModal) {
              setModal(true);
            }
            if (setResult) {
              setResult(false);
            }
            resultFlag = false;
          } else {
            increaseRow();
          }
        }
      }
    } else if (key === "Backspace") {
      //  입력 삭제
      if (currentTile > 0) {
        removeTile();
      }
    }
  };
  return { onKeyUp, inputKey };
}
