import { state } from "./state.js";

// ===== フロアボタン =====
export function updateFloorButtons(){
  document.querySelectorAll(".floorBtn").forEach((btn,index)=>{
    if(index === state.currentFloor){
      btn.classList.add("selected");
    }else{
      btn.classList.remove("selected");
    }
  });
}

// ===== テキスト =====
export function updateTexts(){
  document.getElementById("floorText").textContent =
    (state.currentFloor + 1) + "階";

  document.getElementById("turnText").textContent =
    "現在のターン: " + state.turn;
}

// ===== Undoボタン =====
export function updateUndoButton(){
  const undoBtn = document.getElementById("undoBtn");

  if(state.gameOver){
    undoBtn.style.display = "none";
    return;
  }

  undoBtn.style.display =
    (state.moveHistory.length === 0) ? "none" : "inline-block";
}

// ===== リセットボタン =====
export function updateResetButton(){
  const resetBtn = document.getElementById("resetBtn");

  if(state.gameOver){
    resetBtn.classList.add("show");

    // 🔥 修正済み：勝者はそのままstate.turn
    const winner = state.turn === "○" ? "白" : "黒";
    resetBtn.textContent = winner + "の勝利！もう一回";

  }else{
    resetBtn.classList.remove("show");
  }
}