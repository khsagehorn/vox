function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}


function keyCapture(){
  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
      space = keyboard(32);

  //Left
  left.press = function() {
    //Change the cube's velocity when the key is pressed
    cube.vx = -5;
    cube.vy = 0;
  };

  left.release = function() {
  
  if (!right.isDown) {
      cube.vx = 0;
    }
  };
  //Up
  up.press = function() {
    cube.vy = -5;
    cube.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && cube.vx === 0) {
      cube.vy = 0;
    }
  };
  //Right
  right.press = function() {
    cube.vx = 5;
    cube.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && cube.vy === 0) {
      cube.vx = 0;
    }
  };
  //Down
  down.press = function() {
    cube.vy = 5;
    cube.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && cube.vx === 0) {
      cube.vy = 0;
    }
  };
  keyboard(61).press = function(){playGame();
  }
}