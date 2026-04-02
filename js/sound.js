// 先に読み込んで使い回す
const placeAudio = new Audio("place.mp3");
const winAudio = new Audio("win.mp3");

// 石音
export function playPlaceSound(){
  placeAudio.currentTime = 0;
  placeAudio.play().catch(()=>{});
}

// 勝利音
export function playWinSound(){
  winAudio.currentTime = 0;
  winAudio.play().catch(()=>{});
}

// 🔥 音解放（ちゃんと鳴らす）
export function unlockAudio(){
  placeAudio.play().then(()=>{
    placeAudio.pause();
    placeAudio.currentTime = 0;
  }).catch(()=>{});
}