import { state } from "./state.js";
import { updatePreview3D } from "./preview.js";
import { createBoardHTML } from "./board.js";
import { placeDisk } from "./game.js";
import {
  updateFloorButtons,
  updateTexts,
  updateUndoButton,
  updateResetButton
} from "./ui.js";
import { unlockAudio } from "./sound.js";

window.onload = ()=>{

  // 🔥 音解放（これ超重要）
  document.addEventListener("click", unlockAudio, { once:true });

  init();

  // フロアボタン
  document.querySelectorAll(".floorBtn").forEach(btn=>{
    btn.onclick = ()=>{
      changeFloor(parseInt(btn.dataset.floor));
    };
  });

  // Undo
  document.getElementById("undoBtn").onclick = undoMove;

  // Reset
  document.getElementById("resetBtn").onclick = init;
};


// ===== 初期化 =====
function init(){

  state.boardData = [];

  for(let f=0; f<state.floors; f++){
    const floor = [];
    for(let i=0; i<state.boardSize; i++){
      const row = [];
      for(let j=0; j<state.boardSize; j++) row.push("");
      floor.push(row);
    }
    state.boardData.push(floor);
  }

  state.currentFloor = 0;
  state.turn = "○";
  state.gameOver = false;
  state.lastWinCoords = [];
  state.moveHistory = [];

  updateAll();

  document.getElementById("resetBtn").classList.remove("show");
}


// ===== 全体更新 =====
function updateAll(){
  createBoardHTML((r,c)=>placeDisk(r,c,updateAll));
  updatePreview3D(state.lastWinCoords);

  updateFloorButtons();
  updateTexts();
  updateUndoButton();
  updateResetButton();
}


// ===== フロア変更 =====
function changeFloor(f){
  state.currentFloor = f;
  updateAll();
}

// 🔥 プレビューから呼ぶ
window.changeFloor = changeFloor;


// ===== Undo =====
function undoMove(){

  if(state.moveHistory.length === 0) return;

  const last = state.moveHistory.pop();

  state.boardData[last.floor][last.row][last.col] = "";
  state.currentFloor = last.floor;
  state.turn = last.turn;

  // 勝利状態も戻す
  state.gameOver = last.winState;
  state.lastWinCoords = last.winCoords;

  updateAll();
}