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


  let isSwiped;
  let touchArea = document.getElementById("touch-area");
  //Start Swipe
  touchArea.addEventListener(mouseEvents[deviceType].down, (event) => {
    event.preventDefault();
    isSwiped = true;
    paint(event)

  });
  
  //Mousemove / touchmove
  touchArea.addEventListener(mouseEvents[deviceType].move, (event) => {
    if (!isTouchDevice()) {
      event.preventDefault();
    }
    if (isSwiped) {
        paint(event,isTouchDevice())
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