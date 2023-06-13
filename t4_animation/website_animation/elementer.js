//let og konstanter
window.addEventListener("load", sidenVises);
let point;
let liv;
let ranNum;
const meteor1 = document.querySelector("#meteor_container1");
const tool1 = document.querySelector("#tool_container1");
const meteor2 = document.querySelector("#meteor_container2");
const tool2 = document.querySelector("#tool_container2");

//siden vises
function sidenVises() {
  console.log("sidenVises");
  document.querySelector("#level_complete").classList.add("displaynone");
  document.querySelector("#game_over").classList.add("displaynone");
  document.querySelector("#game_background").classList.add("displaynone");
  document.querySelector("#start").addEventListener("click", startSpillet);
}

//start spillet
function startSpillet() {
  console.log("startSpillet");

  liv = 3;
  point = 0;
  document.querySelector("#point span").textContent = point;
  //fjern startskærm + knap og tilføj spilskærm
  document.querySelector("#start").classList.add("displaynone");
  document.querySelector("#game_background").classList.remove("displaynone");
  document.querySelector("#start_knap").classList.add("displaynone");
  document.querySelector("#level_complete").classList.add("displaynone");
  document.querySelector("#game_over").classList.add("displaynone");
  //Starter baggrundsmusik
  document.querySelector("#sound_baggrund").volume = 0.5;
  document.querySelector("#sound_baggrund").currentTime = 0;
  document.querySelector("#sound_baggrund").play();
  //starter timer-animationen (time)
  document.querySelector("#time_sprite").classList.add("time");
  //når animationen er færdig kaldes stopSpillet()
  document.querySelector("#time_sprite").addEventListener("animationend", stopSpillet);

  //Tilføj fald og random positioner på elementer, + reset
  //Position og animation - Meteor
  ranNum = Math.floor(Math.random() * 5) + 1;
  meteor1.classList.add("fald", "pos" + ranNum);
  meteor1.addEventListener("mousedown", clickMeteorHandler);
  meteor1.addEventListener("animationend", meteorReset);

  ranNum = Math.floor(Math.random() * 5) + 1;
  meteor2.classList.add("fald", "pos" + ranNum);
  meteor2.addEventListener("mousedown", clickMeteorHandler);
  meteor2.addEventListener("animationend", meteorReset);

  //Position og animation - Værktøj
  ranNum = Math.floor(Math.random() * 5) + 1;
  tool1.classList.add("fald", "pos" + ranNum);
  tool1.addEventListener("mousedown", clickToolHandler);
  tool1.addEventListener("animationend", toolReset);

  ranNum = Math.floor(Math.random() * 5) + 1;
  tool2.classList.add("fald", "pos" + ranNum);
  tool2.addEventListener("mousedown", clickToolHandler);
  tool2.addEventListener("animationend", toolReset);
}

//Tools
function clickToolHandler() {
  point++;
  console.log(point, this);
  document.querySelector("#sound_tool").volume = 0.5;
  document.querySelector("#sound_tool").currentTime = 0;
  document.querySelector("#sound_tool").play();
  document.querySelector("#point span").textContent = point;
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind");
  this.addEventListener("animationend", toolReset);
}

function toolReset() {
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  ranNum = Math.floor(Math.random() * 5) + 1;
  this.classList.add("fald", "pos" + ranNum);
}

//Meteor
function clickMeteorHandler() {
  console.log(clickMeteorHandler);
  document.querySelector("#sound_meteor").volume = 0.5;
  document.querySelector("#sound_meteor").currentTime = 0;
  document.querySelector("#sound_meteor").play();
  liv--;
  console.log(liv, this);
  document.querySelector("#liv span").textContent = liv;
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind");
  this.addEventListener("animationend", meteorReset);
  ranNum = Math.floor(Math.random() * 5) + 1;
  this.classList.add("fald", "pos" + ranNum);
  this.removeEventListener("mousedown", meteorReset);

  if (liv <= 0) {
    gameOver();
  }
}

function meteorReset() {
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  let ranNum = Math.floor(Math.random() * 5) + 1;
  this.classList.add("fald", "pos" + ranNum);
  this.addEventListener("mousedown", meteorReset);
}

//Stop spillet
function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#time_sprite").classList.remove("time");
  //...til levelComplete eller gameOver

  //fjern alt på alle elementers container og sprite
  tool1.classList = "";
  tool1.firstElementChild.classList = "";
  tool2.classList = "";
  tool2.firstElementChild.classList = "";

  meteor1.classList = "";
  meteor1.firstElementChild.classList = "";
  meteor2.classList = "";
  meteor2.firstElementChild.classList = "";

  //fjern alle event listener på alle containere
  tool1.removeEventListener("mousedown", clickToolHandler);
  tool1.removeEventListener("animationiteration", toolReset);
  tool1.removeEventListener("animationend", toolReset);
  tool2.removeEventListener("mousedown", clickToolHandler);
  tool2.removeEventListener("animationiteration", toolReset);
  tool2.removeEventListener("animationend", toolReset);

  meteor1.removeEventListener("mousedown", clickMeteorHandler);
  meteor1.removeEventListener("animationiteration", meteorReset);
  meteor1.removeEventListener("animationend", meteorReset);
  meteor2.removeEventListener("mousedown", clickMeteorHandler);
  meteor2.removeEventListener("animationiteration", meteorReset);
  meteor2.removeEventListener("animationend", meteorReset);

  if (point <= 8) {
    gameOver();
  } else {
    levelComplete();
  }
}
//Vundet spil
function levelComplete() {
  document.querySelector("#level_complete").classList.remove("displaynone");
  document.querySelector("#time_sprite").classList.remove("time");
  document.querySelector("#sound_winner").volume = 0.5;
  document.querySelector("#sound_winner").currentTime = 0;
  document.querySelector("#sound_winner").play();
  //Klik på genstart
  document.querySelector("#tryagain_knap1").addEventListener("click", startSpillet);
  console.log("click");
}

//Tabt spil
function gameOver() {
  document.querySelector("#game_over").classList.remove("displaynone");
  document.querySelector("#time_sprite").classList.remove("time");
  document.querySelector("#sound_toobad").volume = 0.5;
  document.querySelector("#sound_toobad").currentTime = 0;
  document.querySelector("#sound_toobad").play();
  //klik på genstart
  document.querySelector("#tryagain_knap2").addEventListener("click", startSpillet);
  console.log("youlose");
  //...til levelComplete eller gameOver
}
