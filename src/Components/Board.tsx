import React, { useEffect, useState } from "react";
import { TileInfo } from "src/types/Tiles";
import styled from "styled-components";
import useBoardStore from "src/zustand/useBoardStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useKeyboard } from "src/hooks/useKeyboard";
import Modal from "react-modal";
import { FiShare2 } from "react-icons/fi";
import {
  TILE_STATE_CORRECT,
  TILE_STATE_SIMILAR,
  TILE_STATE_WRONG,
} from "src/Constants/constants";

const StyledContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  vertical-align: center;
  flex-direction: column;
  padding-top: 5rem;
`;

const StyledTile = styled.div`
  display: grid;
  align-items: center;
  vertical-align: middle;
  width: 4rem;
  height: 4rem;
  border: none;
  outline: 1px solid #dee2e6;
  margin: 5px;
  font-size: 3rem;
  font-weight: bold;
  color: #495057;
  &.correct-tile {
    background-color: #6aaa64;
    outline: none;
    color: white;
  }
  &.similar-tile {
    background-color: #c9b458;
    outline: none;
    color: white;
  }
  &.wrong-tile {
    background-color: #787c7e;
    outline: none;
    color: white;
  }
`;

const StyledResultModal = styled(Modal)`
  width: 30rem;
  height: 10rem;
  position: absolute;
  left: calc(50% - 15rem);
  top: calc(50% - 10rem);
  text-align: center;
  border: none;
  outline: 1px solid gray;
  border-radius: 5px;
  background-color: white;
  padding: 1.5rem 0 0 0;
`;

const StyledResultLabel = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledShareButton = styled.button`
  background-color: #6aaa64;
  width: 12rem;
  height: 5rem;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
`;

// ???????????? ?????? ????????? ?????? ?????? ????????? ??????
function checkColor(tile: TileInfo) {
  switch (tile.state) {
    case TILE_STATE_CORRECT:
      return "correct-tile";
    case TILE_STATE_SIMILAR:
      return "similar-tile";
    case TILE_STATE_WRONG:
      return "wrong-tile";
    default:
      return "nothing-tile";
  }
}

function Board() {
  const { boardData, currentRow, answer, loadBoard } = useBoardStore();
  const [isShowResultModal, setIsShowResultModal] = useState(false);
  const [result, setResult] = useState(false);
  const { onKeyUp } = useKeyboard(setIsShowResultModal, setResult);

  //  ??? ?????? ????????? ??????
  useEffect(() => {
    onKeyUp();
  });

  //  ???????????? ???????????? ??? ?????? ????????? ????????????
  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  //  ?????? ???????????? ??????????????? ??????
  const createResultText = () => {
    let resultText = "";
    resultText += `Wordle ${new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "")} ${currentRow + 1}/6\n`;
    boardData.forEach((row) => {
      resultText += "\n";
      row.forEach((tile) => {
        switch (tile.state) {
          case TILE_STATE_CORRECT:
            resultText += "????";
            break;
          case TILE_STATE_SIMILAR:
            resultText += "????";
            break;
          case TILE_STATE_WRONG:
            resultText += "???";
            break;
          default:
            resultText += "???";
            break;
        }
      });
    });
    return resultText;
  };

  return (
    <StyledContainer>
      <ToastContainer />
      {boardData.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((tile, tileIndex) => (
            <StyledTile
              key={`${rowIndex}-${tileIndex}`}
              className={checkColor(tile)}
            >
              <div>{tile.data}</div>
            </StyledTile>
          ))}
        </div>
      ))}
      <StyledResultModal
        isOpen={isShowResultModal}
        onRequestClose={() => setIsShowResultModal(false)}
      >
        <StyledCloseButton onClick={() => setIsShowResultModal(false)}>
          X
        </StyledCloseButton>
        <StyledResultLabel>
          {result ? "SUCCESS!" : `ANSWER : ${answer}`}
        </StyledResultLabel>
        <StyledShareButton
          onClick={() => navigator.clipboard.writeText(createResultText())}
        >
          SHARE
          <FiShare2 />
        </StyledShareButton>
      </StyledResultModal>
    </StyledContainer>
  );
}

export default Board;
