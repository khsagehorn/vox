//Test that Pixi is working
console.log(PIXI);

//Create the renderer
var renderer = PIXI.autoDetectRenderer(1000, 600);
renderer.autoResize = true;

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`

// Load image assets and run the SETUP function
PIXI.loader
  .add("images/square_icon.png")
  .add("images/background.png")
  .add("images/foreground.png")
  .load(setup);

  var sprite;
  var token;

  function setup() {

    // Add the main srpite and tokens
    sprite = new PIXI.Sprite(
      PIXI.loader.resources["images/square_icon.png"].texture
    );
    token = new PIXI.Sprite(
      PIXI.loader.resources["images/square_icon.png"].texture
    );

    // create the background and foreground
    background = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/background.png"].texture);
    foreground = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/foreground.png"].texture);
   

  // Position sprite
    sprite.x = stage.width / 2;
    token.x = 1200;
    token.y = 0;
    // sprite.y = stage.height / 2;

  // Resize sprites
    sprite.width = 200;
    sprite.height = 200;
    token.width = 75;
    token.height = 75;

  // Resize background
  background.width = 1000;
  foreground.width = 1000;
  background.height = 600;
  foreground.height = 600;


  // Sprite Velocity properties
  sprite.vx = 0;
  sprite.vy = 0;
  token.vx = 0;
  token.vy = 0;

  // Rotate sprite
    // sprite.rotation = 0.8;
    // sprite.pivot.set(100, 100);


  // add sprite and render canvas
   stage.addChild(background);
   stage.addChild(foreground);
    stage.addChild(sprite);
    setInterval(function(){
      newToken = token;
      stage.addChild(newToken);
    }, 1000);
      //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
  //Left arrow key `press` method
  left.press = function() {
    //Change the sprite's velocity when the key is pressed
    sprite.vx = -5;
    sprite.vy = 0;
  };
  //Left arrow key `release` method
  left.release = function() {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the sprite isn't moving vertically:
    //Stop the sprite
    if (!right.isDown && sprite.vy === 0) {
      sprite.vx = 0;
    }
  };
  //Up
  up.press = function() {
    sprite.vy = -5;
    sprite.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && sprite.vx === 0) {
      sprite.vy = 0;
    }
  };
  //Right
  right.press = function() {
    sprite.vx = 5;
    sprite.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && sprite.vy === 0) {
      sprite.vx = 0;
    }
  };
  //Down
  down.press = function() {
    sprite.vy = 5;
    sprite.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && sprite.vx === 0) {
      sprite.vy = 0;
    }
  };

    gameLoop();
  }

  function gameLoop(){
    requestAnimationFrame(gameLoop);


    //
    background.vx = -3 
    background.tilePosition.x += background.vx;
    foreground.vx = -5 
    foreground.tilePosition.x += foreground.vx; 


    // Update token velocity
    token.vx = -4;



    // Apply velocity values to position
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    token.x += token.vx;
    
    renderer.render(stage);
  }

  //The `keyboard` helper function
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
