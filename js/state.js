export let state = {

  // 基本設定
  boardSize: 4,
  floors: 4,

  // 現在状態
  currentFloor: 0,
  turn: "○",

  // 盤面
  boardData: [],

  // ゲーム状態
  gameOver: false,

  // 勝利ライン
  lastWinCoords: [],

  // Undo履歴
  moveHistory: [],

  // 🔥 最後に置いた位置（アニメ用）
  lastMove: null
};