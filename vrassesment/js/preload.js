
/*//preload assets
var loadingScreen = document.getElementById("load_screen");
var screenEl = document.querySelector('#photoPlane');
var ctx = loadingScreen.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 1920, 1080);
ctx.fillText("Loading...", 10, 50);
//don't judge me it was really laggy without this

var thumbnailMap = {
    0: "#container",
    1: "#forest",
    2: "#lagoon",
    3: "#river",
    4: "#path",
    5: "#woods",
    6: "#seat"
  };

setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[1]);
}, 1000)
setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[2]);  
}, 2000)

setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[3]);    
}, 3000)

setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[4]);    
}, 4000)

setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[5]);    
}, 5000)

setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[6]);    
}, 6000)

setTimeout(() => {
    screenEl.setAttribute('material', 'src',  thumbnailMap[0]);
}, 7000)

setTimeout(() => {
    loadingScreen.remove();
    console.log("gone")
}, 8000)*/