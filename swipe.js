//================================ swipe controller ====================

//mouseEvents for touch and mouse
let mouseEvents = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Detect touch device

const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
isTouchDevice();

//Initial mouse X and Y positions are 0

let mouseX,
  initialX = 0;
let mouseY,
  initialY = 0;
let isSwiped;

let touchArea = document.getElementById("touch-area");
//Get left and top of touchArea
let rectLeft = touchArea.getBoundingClientRect().left;
let rectTop = touchArea.getBoundingClientRect().top;

//Get Exact X and Y position of mouse/touch
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

//Start Swipe
touchArea.addEventListener(mouseEvents[deviceType].down, (event) => {
  isSwiped = true;
  //Get X and Y Position
  getXY(event);
  initialX = mouseX;
  initialY = mouseY;
});

//Mousemove / touchmove
touchArea.addEventListener(mouseEvents[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isSwiped) {
    getXY(event);
    let diffX = mouseX - initialX;
    let diffY = mouseY - initialY;
    if (Math.abs(diffY) > Math.abs(diffX)) {
      rotateSnake(diffY > 0 ? "down" : "up");
    } else {
      rotateSnake(diffX > 0 ? "right" : "left");
    }
  }
});

//Stop Drawing
touchArea.addEventListener(mouseEvents[deviceType].up, () => {
  isSwiped = false;
});

touchArea.addEventListener("mouseleave", () => {
  isSwiped = false;
});

window.onload = () => {
  isSwiped = false;
};