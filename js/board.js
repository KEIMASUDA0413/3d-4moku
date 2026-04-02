import { state } from "./state.js";

// ===== 置けるか判定 =====
function canPlace(x, y, z){
  if(z === 0) return true;
  return state.boardData[z - 1][y][x] !== "";
}

export function createBoardHTML(placeDisk){
  const board = document.getElementById("board");
  board.innerHTML = "";

  for(let i = 0; i < state.boardSize; i++){
    for(let j = 0; j < state.boardSize; j++){

      const cell = document.createElement("div");
      cell.classList.add("cell");

      const diskChar = state.boardData[state.currentFloor][i][j];

      // ===== 駒表示 =====
      if(diskChar !== ""){
        const disk = document.createElement("span");
        disk.classList.add("disk");
        disk.classList.add(diskChar === "○" ? "white" : "black");

        // 🔥 最後の一手だけ落下アニメーション
        if(
          state.lastMove &&
          state.lastMove.floor === state.currentFloor &&
          state.lastMove.row === i &&
          state.lastMove.col === j
        ){
          disk.classList.add("drop");
        }

        cell.appendChild(disk);
      }

      // ===== 置ける場所ハイライト =====
      if(
        !state.gameOver &&
        state.boardData[state.currentFloor][i][j] === "" &&
        canPlace(j, i, state.currentFloor)
      ){
        cell.classList.add("placeable");
      }

      // ===== 勝利ハイライト =====
      state.lastWinCoords.forEach(line=>{
        line.forEach(([f,r,c])=>{
          if(f === state.currentFloor && r === i && c === j){
            cell.classList.add("winHighlight");
          }
        });
      });

      // ===== クリック処理 =====
      cell.addEventListener("click", () => {

        // ゲーム終了時
        if(state.gameOver) return;

        // 置けない場所
        if(!canPlace(j, i, state.currentFloor)) return;

        // すでに埋まってる
        if(state.boardData[state.currentFloor][i][j] !== "") return;

        placeDisk(i, j);
      });

      board.appendChild(cell);
    }
  }
}