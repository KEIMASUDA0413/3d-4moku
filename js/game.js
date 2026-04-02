import { state } from "./state.js";
import { playPlaceSound, playWinSound } from "./sound.js";

export function placeDisk(row, col, updateAll){

  if(state.gameOver) return;
  if(state.boardData[state.currentFloor][row][col] !== "") return;

  // 支えチェック
  if(state.currentFloor > 0 &&
     state.boardData[state.currentFloor - 1][row][col] === "") return;

  // Undo用保存
  state.moveHistory.push({
    floor: state.currentFloor,
    row,
    col,
    turn: state.turn,
    winState: state.gameOver,
    winCoords: JSON.parse(JSON.stringify(state.lastWinCoords))
  });

  // 配置
  state.boardData[state.currentFloor][row][col] = state.turn;

  // 🔥 最後の一手を記録
  state.lastMove = {
    floor: state.currentFloor,
    row,
    col
  };

  playPlaceSound();

  const wins = checkAllWins3D();

  if(wins.length > 0){
    state.gameOver = true;
    state.lastWinCoords = wins;

    playWinSound();

    // 勝利後1階へ
    state.currentFloor = 0;

    updateAll();
    return;
  }

  // ターン交代
  state.turn = state.turn === "○" ? "●" : "○";

  updateAll();
}


// ===== 勝利判定 =====
function checkAllWins3D(){
  const wins = [];

  const directions = [
    [0,1,0],[1,0,0],[0,0,1],
    [0,1,1],[0,1,-1],
    [1,1,0],[1,-1,0],
    [1,0,1],[1,0,-1],
    [1,1,1],[1,1,-1],
    [1,-1,1],[1,-1,-1]
  ];

  for(let f=0; f<state.floors; f++){
    for(let r=0; r<state.boardSize; r++){
      for(let c=0; c<state.boardSize; c++){

        const player = state.boardData[f][r][c];
        if(!player) continue;

        directions.forEach(([df,dr,dc])=>{
          let line = [[f,r,c]];

          for(let step=1; step<4; step++){
            const nf = f + df*step;
            const nr = r + dr*step;
            const nc = c + dc*step;

            if(nf<0||nf>=state.floors||
               nr<0||nr>=state.boardSize||
               nc<0||nc>=state.boardSize) break;

            if(state.boardData[nf][nr][nc] === player){
              line.push([nf,nr,nc]);
            } else break;
          }

          if(line.length >= 4){
            wins.push(line);
          }
        });

      }
    }
  }

  return wins;
}