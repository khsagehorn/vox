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

  var state, sprite, token, background, foreground, titleScreen;


function setup() {
  var height = 600;

  
  // Create title screen
  titleScreen = new PIXI.Container();
  stage.addChild(titleScreen);
  titleScreen.visible = true;
  title = new PIXI.Text("Voxal", {font: "100px", fill: "white"});
  title.x = 150;
  title.y = 250;
  titleScreen.addChild(title);

  // Add the main srpite and tokens
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["images/square_icon.png"].texture
  );
  token = new PIXI.Sprite(
    PIXI.loader.resources["images/square_icon.png"].texture
  );

  // makeToken();

  // create the background and foreground
  background = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/background.png"].texture);
  foreground = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/foreground.png"].texture);
   

  // Position sprites
  sprite.x = 45;
  sprite.y = height / 2;
  console.log(stage.height);
  token.x = 1200;
  token.y = Math.floor(Math.random() *(renderer.height));
    // sprite.y = stage.height / 2;

  // Resize sprites
  sprite.width = renderer.height/4;
  sprite.height = renderer.height/4;
  token.width = renderer.height/8;
  token.height = renderer.height/8;

  // Resize background/foreground
  background.width = renderer.width;
  foreground.width = renderer.width;
  background.height = renderer.height;
  foreground.height = renderer.height;


  // Sprite Velocity properties
  sprite.vx = 0;
  sprite.vy = 0;
  token.vx = 0;
  token.vy = 0;



  // add sprite and render canvas
  stage.addChild(background);
  stage.addChild(foreground);
  stage.addChild(sprite);
  // setInterval(function(){
  //   newToken = token;
  //   stage.addChild(newToken);
  // }, 1000);
  // makeToken();
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


  // background movement
  background.vx = -3 
  background.tilePosition.x += background.vx;
  foreground.vx = -5
  foreground.tilePosition.x += foreground.vx;


  makeToken();


  // Update token velocity
  token.vx = -4;



  // Apply velocity values to position
  sprite.x += sprite.vx;
  sprite.y += sprite.vy;
  token.x += token.vx;

    //contain sprite in game window
  // contain(sprite, {x:50, y:50, width: 1000, height: 600})

  renderer.render(stage);
  
}

function contain(sprite, container) {

  var collision;

  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  if (sprite.x + sprite.width > container.x) {
    sprite.x = container.x - sprite.width;
    collision = "right";
  }


  if (sprite.y + sprite.height > container.y) {
  sprite.y = container.height - sprite.height;
  collision = "down";
  }

  return collision;
}

makeToken();

function makeToken(){
  var tokenArr = [];
  setInterval(function(){
    stage.addChild(token);
  }, 1000);
}