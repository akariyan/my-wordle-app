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
          // 타일 색 변화용 정답 리스트
          let tileList: string[] = [
            TILE_STATE_WRONG,
            TILE_STATE_WRONG,
            TILE_STATE_WRONG,
            TILE_STATE_WRONG,
            TILE_STATE_WRONG,
          ];
          // 정답 단어
          const answerWord = new Map<number, string>();
          answer.split("").forEach((item, index) => {
            answerWord.set(index, item);
          });
          const inputedWord = new Map<number, string>();
          boardData[currentRow].forEach((item, index) => {
            inputedWord.set(index, item.data);
          });
          //  1단계 : 입력받은 단어의 i번째 문자와 정답의 i번째 문자가 일치할 경우 해당 문자는 일치로 체크 후 삭제
          for (let i = 0; i < 5; i++) {
            if (inputedWord.get(i) === answerWord.get(i)) {
              tileList[i] = TILE_STATE_CORRECT;
              answerWord.delete(i);
              inputedWord.delete(i);
            }
          }
          //  2단계 : 입력받은 단어와 정답을 순회하면서
          for (let i = 0; i < 5; i++) {
            //  체크된 문자는 넘기기
            if (!inputedWord.has(i)) {
              continue;
            } else {
              for (let j = 0; j < 5; j++) {
                //  체크된 문자는 넘기기
                if (!answerWord.has(j)) {
                  continue;
                } else {
                  //  입력받은 단어의 i번째 문자가 정답의 j번째 문자와 일치할 경우 유사로 체크 후 삭제
                  if (inputedWord.get(i) === answerWord.get(j)) {
                    tileList[i] = TILE_STATE_SIMILAR;
                    inputedWord.delete(i);
                    answerWord.delete(j);
                    break;
                  } else {
                    continue;
                  }
                }
              }
            }
          }
          //  3단계 : 체크 결과 제출
          checkTile(tileList);

          //  모달 출력
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
