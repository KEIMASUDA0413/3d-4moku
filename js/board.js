import { state } from "./state.js";

export function createBoardHTML(placeDisk){
  const board = document.getElementById("board");
  board.innerHTML = "";

  for(let i = 0; i < state.boardSize; i++){
    for(let j = 0; j < state.boardSize; j++){

      const cell = document.createElement("div");
      cell.classList.add("cell");

      const diskChar = state.boardData[state.currentFloor][i][j];

      if(diskChar !== ""){
        const disk = document.createElement("span");
        disk.classList.add("disk");
        disk.classList.add(diskChar === "○" ? "white" : "black");

        // 🔥 最後の一手だけアニメーション
        if(
          state.lastMove &&
          state.lastMove.floor === state.currentFloor &&
          state.lastMove.row === i &&
          state.lastMove.col === j
        ){
          disk.classList.add("pop");
        }

        cell.appendChild(disk);
      }

      // 勝利ハイライト
      state.lastWinCoords.forEach(line=>{
        line.forEach(([f,r,c])=>{
          if(f === state.currentFloor && r === i && c === j){
            cell.classList.add("winHighlight");
          }
        });
      });

      cell.onclick = ()=>placeDisk(i,j);

      board.appendChild(cell);
    }
  }
}