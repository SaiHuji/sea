"use strict";

const spot = document.querySelector(".spot");
let currentOpacity = 0; // 初期透明度を0に設定
let spotX = 0; // カーソルのX座標
let spotY = 0; // カーソルのY座標
let scope1 = 20; // スポットの中心部、その半径
let scope2 = 50; // スポットのモヤモヤの部分
let scope3 = 150; // スポットの範囲を初期値に設定　全体の範囲が150

// スポットライトの透明度を更新する関数
function updateSpotOpacity(targetOpacity) {
  currentOpacity = targetOpacity; // 直接透明度を設定

  // スポットライトの位置はカーソルの座標に合わせて変更
  spot.style.backgroundImage = `radial-gradient(circle at ${spotX}px ${spotY}px, transparent ${scope1}px, transparent ${scope2}px, rgba(0, 0, 0, ${currentOpacity}) ${scope3}px)`;
}

// カーソル移動中の処理
function handleMouseMove(event) {
  spotX = event.clientX;
  spotY = event.clientY;

  // スポットライトの位置を更新
  updateSpotOpacity(currentOpacity); // 現在の透明度で更新
}

// スクロールイベントをまとめる処理
function handleScroll(event) {
  const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const targetOpacity = Math.min(-0.03 + scrollPercentage, 1.5); // -0.03で、海へ入るまでのスクロール量分暗くなるのを遅延させる

  updateSpotOpacity(targetOpacity);
}

// カーソル移動イベントとスクロールイベントのリスナーを設定
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("scroll", handleScroll);



// --------------------------------------------- //


// スポットの範囲を調整する関数
spotScope.addEventListener("input", (e) => {
  // スポットの範囲を更新
  scope1 = (e.target.value)/7.5; // 取得値が150なので20になるようにする
  scope2 = (e.target.value)/3; // 取得値が150なので50になるようにする
  scope3 = e.target.value; //
  updateSpotOpacity(currentOpacity); // 現在の透明度で更新

});

// スポットの調整UI　海へ入ると黒い文字を白に変換
window.addEventListener("scroll", () => {
  const scale = document.querySelector(".scale");
  const label = document.querySelector("label");

  if (window.scrollY > 660) {
    scale.style.color = "white";
    label.style.color = "white";
  } else {
    scale.style.color = "black";
    label.style.color = "black";
  }
})


// --------------------------------------------- //


// パララックス効果　海へ入ると山と灯台が埋もれる表現

// 画像7枚を取得
const parallaxLayers = document.querySelectorAll('.parallax-layer'); 

const parallaxSpeeds = [ 1.2, 1.1, 0.9, 0.7, 0.5, 0.4, 0 ]; // 配列の左から右に行くほど前のレイヤーになる。前のレイヤーに行くほど速度が遅くなる

window.addEventListener("scroll",() =>  {
  parallaxLayers.forEach((layer, index) => {
    layer.style.transform = `translateY(${window.scrollY * parallaxSpeeds[index]}px)`;
  });
});



// --------------------------------------------- //

// 現在の深度が何mかを表示する機能
window.addEventListener("scroll", () => {
  
  let offset = window.scrollY;
  const scrollMeter = Math.max(0, Math.floor(offset / 15) - 27); // 27ピクセルを引くことで、27ピクセル後(海に入った後)からスクロール量の取得開始
  const meterFrame = document.getElementById("meterFrame");
  meterFrame.innerHTML = "深度:" + scrollMeter + "m";

  if (offset > 450) { // 海に入った場合に表示させる
    meterFrame.style.transition = "opacity 0.2s";
    meterFrame.style.opacity = 1;
    document.body.style.cursor = "url(other-png/cursor.png) 33 35,auto"; // 海に入った場合だと、カーソルが画像になる
  } else {
    meterFrame.style.transition = "opacity 0.2s";
    meterFrame.style.opacity = 0;
    document.body.style.cursor = "auto"; // スクロール量が海の中へ達しない場合、カーソルは任意
  }
})