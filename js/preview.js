import { state } from "./state.js";

export function updatePreview3D(winCoords){

  const preview = document.getElementById("preview3D");
  preview.innerHTML = "";

  for(let f = 0; f < state.floors; f++){

    const label = document.createElement("div");
    label.textContent = (f + 1) + "階";
    label.classList.add("previewLabel");
    preview.appendChild(label);

    const floorDiv = document.createElement("div");
    floorDiv.classList.add("previewFloor");

    if(f === state.currentFloor){
      floorDiv.classList.add("current");
    }

    floorDiv.onclick = () => {
      window.changeFloor(f);
    };

    for(let i = 0; i < state.boardSize; i++){
      for(let j = 0; j < state.boardSize; j++){

        const cell = document.createElement("div");
        cell.classList.add("previewCell");

        const value = state.boardData[f][i][j];
        if(value){
          cell.textContent = value;
        }

        // 🔥 勝利ライン表示（重要）
        if(state.lastWinCoords.length > 0){
          state.lastWinCoords.forEach(line=>{
            line.forEach(([wf,wr,wc])=>{
              if(wf === f && wr === i && wc === j){
                cell.classList.add("win");
              }
            });
          });
        }

        floorDiv.appendChild(cell);
      }
    }

    preview.appendChild(floorDiv);
  }
}