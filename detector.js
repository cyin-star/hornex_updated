// ==UserScript==
// @name           Hornex.PRO Ranges Script
// @namespace      http://tampermonkey.net/
// @version        1.1.1
// @description    Display ranges of eye, mag, and ears!
// @author         AstRatJP
// @author         FlameFlmae
// @match          https://hornex.pro/*
// @license        MIT
// @grant          none
// ==/UserScript==
 
// PLEASE CHECK OUT THE ORIGINAL SCRIPT
// https://greasyfork.org/en/scripts/475897-hornex-third-eye-range-script
// PLEASE CHECK OUT THE ORIGINAL SCRIPT
 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const normRange = 150
const antennaeVals = [ 11.1, 17.6, 25, 33.3, 42.9, 100, 185.7, 300, 600 ]
const eyeVals = [ 30, 50, 70, 90, 120, 180, 360, 540, 720 ];
const magVals = [ 50, 150, 250, 350, 450, 550, 650, 750, 1000 ];
const earVals = [ 50, 120, 190, 260, 330, 400, 470, 540, 610 ];
let range = 0;
 
let chatFocus = false; // credits to ben is big (aragami070 on discord) for "letting" me use this. (i totally didn't just take it from his script lol)
let nameFocus = false // ben, if you have a problem with this, just let me know! I'll remove it and come up with some other solution
                             // ben's sick script: https://greasyfork.org/en/scripts/471182-hornex-pro-randomize-rarity-colours-rainbow-mode-hide-hud-and-performance-boost
const input = document.querySelector('.chat-input');
const inputName = document.querySelector('.grid .nickname');
 
input.addEventListener('focus', () => {
    chatFocus=true;
});
inputName.addEventListener('focus', () => {
    nameFocus=true;
});
input.addEventListener('blur', () => {
    chatFocus=false
})
inputName.addEventListener('blur', () => {
    nameFocus=false;
});
 
function eye(eye) {
    return (((normRange+eye[0])/((eye[1]+100)/100) * canvas.height) / 1000);
}
function mag(mag) {
    return (((mag[0])/((mag[1]+100)/100) * canvas.height) / 950);
}
function ear(ear) {
    return (((ear[0])/((ear[1]+100)/100) * canvas.height) / 950);
}
 
function drawEyeRange() {
    const petals = Array.from(document.querySelectorAll(".petals:not(.small) .petal.empty .petal"))
 
    const currentBuild = [];
    for (let i = 0; i < petals.length; i++) {
        if (petals[i].classList.item(2) === "no-icon" || petals[i].classList.item(3) === "no-icon") {
            petalPosition = petals[i].querySelector(".petal-icon").style.backgroundPosition;
        } else {
            petalPosition = petals[i].style.backgroundPosition;
        }
        if (petals[i].classList.item(1) === "spin") {
            tier = petals[i].classList.item(2);
        } else {
            tier = petals[i].classList.item(1);
        }
        currentBuild.push(petalPosition, tier);
    }
 
 
 
 
 
    const eyeIndex = currentBuild.indexOf("-600% 0%");
    const anteIndex = currentBuild.indexOf("-700% 0%");
    const eyeAndAnte = (eyeIndex !== -1 ? currentBuild[eyeIndex + 1] : "none") + (anteIndex !== -1 ? currentBuild[anteIndex + 1] : "none");
    const eyeAndAnteSplit = eyeAndAnte.split('')
    switch(eyeAndAnte) {
        case ("nonenone"):
              range = eye( [ 0, 0 ] );
            break;
        case ("nonetier-0"):
            range = eye( [ 0, antennaeVals[0] ] );
            break;
        case ("nonetier-1"):
            range = eye( [ 0, antennaeVals[1] ] );
            break;
        case ("nonetier-2"):
            range = eye( [ 0, antennaeVals[2] ] );
            break;
        case ("nonetier-3"):
            range = eye( [ 0, antennaeVals[3] ] );
            break;
        case ("nonetier-4"):
            range = eye( [ 0, antennaeVals[4] ] );
            break;
        case ("nonetier-5"):
            range = eye( [ 0, antennaeVals[5] ] );
            break;
        case ("nonetier-6"):
            range = eye( [ 0, antennaeVals[6] ] );
            break;
        case ("nonetier-7"):
            range = eye( [ 0, antennaeVals[7] ] );
            break;
        case ("nonetier-8"):
            range = eye( [ 0, antennaeVals[8] ] );
            break;
        case ("tier-0none"):
            range = eye( [ eyeVals[0], 0 ] );
            break;
        case ("tier-1none"):
            range = eye( [ eyeVals[1], 0 ] );
            break;
        case ("tier-2none"):
            range = eye( [ eyeVals[1], 0 ] );
            break;
        case ("tier-3none"):
            range = eye( [ eyeVals[3], 0 ] );
            break;
        case ("tier-4none"):
            range = eye( [ eyeVals[4], 0 ] );
            break;
        case ("tier-5none"):
            range = eye( [ eyeVals[5], 0 ] );
            break;
        case ("tier-6none"):
            range = eye( [ eyeVals[6], 0 ] );
            break;
        case ("tier-7none"):
            range = eye( [ eyeVals[7], 0 ] );
            break;
        case ("tier-8none"):
            range = eye( [ eyeVals[8], 0 ] );
            break;
        default:
            range = eye( [ eyeVals[eyeAndAnteSplit[5]], antennaeVals[eyeAndAnteSplit[11]] ] );
    }
 
    ctx.beginPath();
    if (localStorage.eyeEnabled == 1) {
            ctx.strokeStyle = "#ff6347";
        } else {
            ctx.strokeStyle = "#ff634700";
        }
　　ctx.lineWidth = 3;
    ctx.arc(canvas.width / 2, canvas.height / 2, range, 0, 2 * Math.PI);
    ctx.stroke();
 
    requestAnimationFrame(drawEyeRange);
}
 
    function drawMagRange() {
    const petals = Array.from(document.querySelectorAll(".petals:not(.small) .petal.empty .petal"))
 
    const currentBuild = [];
    for (let i = 0; i < petals.length; i++) {
        if (petals[i].classList.item(2) === "no-icon" || petals[i].classList.item(3) === "no-icon") {
            petalPosition = petals[i].querySelector(".petal-icon").style.backgroundPosition;
        } else {
            petalPosition = petals[i].style.backgroundPosition;
        }
        if (petals[i].classList.item(1) === "spin") {
            tier = petals[i].classList.item(2);
        } else {
            tier = petals[i].classList.item(1);
        }
        currentBuild.push(petalPosition, tier);
    }
 
 
 
 
 
    const magIndex = currentBuild.indexOf("-1200% 0%");
    const anteIndex = currentBuild.indexOf("-700% 0%");
    const magAndAnte = (magIndex !== -1 ? currentBuild[magIndex + 1] : "none") + (anteIndex !== -1 ? currentBuild[anteIndex + 1] : "none");
    const magAndAnteSplit = magAndAnte.split('')
  switch(magAndAnte) {
        case ("nonetier-0"):
            range = mag( [ 0, antennaeVals[0] ] );
            break;
        case ("nonetier-1"):
            range = mag( [ 0, antennaeVals[1] ] );
            break;
        case ("nonetier-2"):
            range = mag( [ 0, antennaeVals[2] ] );
            break;
        case ("nonetier-3"):
            range = mag( [ 0, antennaeVals[3] ] );
            break;
        case ("nonetier-4"):
            range = mag( [ 0, antennaeVals[4] ] );
            break;
        case ("nonetier-5"):
            range = mag( [ 0, antennaeVals[5] ] );
            break;
        case ("nonetier-6"):
            range = mag( [ 0, antennaeVals[6] ] );
            break;
        case ("nonetier-7"):
            range = mag( [ 0, antennaeVals[7] ] );
            break;
        case ("nonetier-8"):
            range = mag( [ 0, antennaeVals[8] ] );
            break;
        case ("tier-0none"):
            range = mag( [ magVals[0], 0 ] );
            break;
        case ("tier-1none"):
            range = mag( [ magVals[1], 0 ] );
            break;
        case ("tier-2none"):
            range = mag( [ magVals[1], 0 ] );
            break;
        case ("tier-3none"):
            range = mag( [ magVals[3], 0 ] );
            break;
        case ("tier-4none"):
            range = mag( [ magVals[4], 0 ] );
            break;
        case ("tier-5none"):
            range = mag( [ magVals[5], 0 ] );
            break;
        case ("tier-6none"):
            range = mag( [ magVals[6], 0 ] );
            break;
        case ("tier-7none"):
            range = mag( [ magVals[7], 0 ] );
            break;
        case ("tier-8none"):
            range = mag( [ magVals[8], 0 ] );
            break;
        default:
            range = mag( [ magVals[magAndAnteSplit[5]], antennaeVals[magAndAnteSplit[11]] ] );
    }
    ctx.beginPath();
            if (localStorage.magEnabled == 1) {
    ctx.strokeStyle = "#6ee884";
        } else {
    ctx.strokeStyle = "#6ee88400";
        }
　　ctx.lineWidth = 3;
    ctx.arc(canvas.width / 2, canvas.height / 2, range, 0, 2 * Math.PI);
    ctx.stroke();
 
    requestAnimationFrame(drawMagRange);
}
 
 
    function drawEarRange() {
    const petals = Array.from(document.querySelectorAll(".petals:not(.small) .petal.empty .petal"))
 
    const currentBuild = [];
    for (let i = 0; i < petals.length; i++) {
        if (petals[i].classList.item(2) === "no-icon" || petals[i].classList.item(3) === "no-icon") {
            petalPosition = petals[i].querySelector(".petal-icon").style.backgroundPosition;
        } else {
            petalPosition = petals[i].style.backgroundPosition;
        }
        if (petals[i].classList.item(1) === "spin") {
            tier = petals[i].classList.item(2);
        } else {
            tier = petals[i].classList.item(1);
        }
        currentBuild.push(petalPosition, tier);
    }
 
    const earIndex = currentBuild.indexOf("0% -100%");
    const anteIndex = currentBuild.indexOf("-700% 0%");
    const earAndAnte = (earIndex !== -1 ? currentBuild[earIndex + 1] : "none") + (anteIndex !== -1 ? currentBuild[anteIndex + 1] : "none");
    const earAndAnteSplit = earAndAnte.split('')
  switch(earAndAnte) {
        case ("nonetier-0"):
            range = ear( [ 0, antennaeVals[0] ] );
            break;
        case ("nonetier-1"):
            range = ear( [ 0, antennaeVals[1] ] );
            break;
        case ("nonetier-2"):
            range = ear( [ 0, antennaeVals[2] ] );
            break;
        case ("nonetier-3"):
            range = ear( [ 0, antennaeVals[3] ] );
            break;
        case ("nonetier-4"):
            range = ear( [ 0, antennaeVals[4] ] );
            break;
        case ("nonetier-5"):
            range = ear( [ 0, antennaeVals[5] ] );
            break;
        case ("nonetier-6"):
            range = ear( [ 0, antennaeVals[6] ] );
            break;
        case ("nonetier-7"):
            range = ear( [ 0, antennaeVals[7] ] );
            break;
        case ("nonetier-8"):
            range = ear( [ 0, antennaeVals[8] ] );
            break;
        case ("tier-0none"):
            range = ear( [ earVals[0], 0 ] );
            break;
        case ("tier-1none"):
            range = ear( [ earVals[1], 0 ] );
            break;
        case ("tier-2none"):
            range = ear( [ earVals[1], 0 ] );
            break;
        case ("tier-3none"):
            range = ear( [ earVals[3], 0 ] );
            break;
        case ("tier-4none"):
            range = ear( [ earVals[4], 0 ] );
            break;
        case ("tier-5none"):
            range = ear( [ earVals[5], 0 ] );
            break;
        case ("tier-6none"):
            range = ear( [ earVals[6], 0 ] );
            break;
        case ("tier-7none"):
            range = ear( [ earVals[7], 0 ] );
            break;
        case ("tier-8none"):
            range = ear( [ earVals[8], 0 ] );
            break;
        default:
            range = ear( [ earVals[earAndAnteSplit[5]], antennaeVals[earAndAnteSplit[11]] ] );
    }
    ctx.beginPath();
        if (localStorage.earEnabled == 1) {
    ctx.strokeStyle = "#ADE0FF";
        } else {
    ctx.strokeStyle = "#ADE0FF00";
        }
　　ctx.lineWidth = 3;
    ctx.arc(canvas.width / 2, canvas.height / 2, range, 0, 2 * Math.PI);
    ctx.stroke();
 
    requestAnimationFrame(drawEarRange);
}
 
addEventListener("keyup", (event) => {
if (chatFocus===false && nameFocus===false) {
if (event.keyCode===84) { // key t
 if (localStorage.eyeEnabled == 1) {
          localStorage.setItem("eyeEnabled", 0)
      }
      else if (localStorage.eyeEnabled == 0) {
          localStorage.setItem("eyeEnabled", 1)
      }
      else {
          console.log("Set localStorage.eyeEnabled to default (1)")
          localStorage.setItem("eyeEnabled", 1)
      }
}
 
if (event.keyCode == 89) { //key y
     if (localStorage.magEnabled == 1) {
              localStorage.setItem("magEnabled", 0)
      }
      else if (localStorage.magEnabled == 0) {
          localStorage.setItem("magEnabled", 1)
      }
      else {
          console.log("Set localStorage.magEnabled to default (1)")
          localStorage.setItem("magEnabled", 1)
      }
}
 
if (event.keyCode == 85) { //key u
     if (localStorage.earEnabled == 1) {
              localStorage.setItem("earEnabled", 0)
      }
      else if (localStorage.earEnabled == 0) {
          localStorage.setItem("earEnabled", 1)
      }
      else {
          console.log("Set localStorage.earEnabled to default (1)")
          localStorage.setItem("earEnabled", 1)
      }
 }
}
    return;
});
drawEyeRange();
drawMagRange();
drawEarRange();