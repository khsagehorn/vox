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

  
  

  // Add the main sprite and tokens
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["images/square_icon.png"].texture
  );
  token = new PIXI.Sprite(
    PIXI.loader.resources["images/square_icon.png"].texture
  );


  // create the background and foreground
  background = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/background.png"].texture);
  foreground = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/foreground.png"].texture);
   

  // Position sprites
  
  console.log(stage.height);
  token.x = 1200;
  token.y = renderer.height/(Math.floor(Math.random() *(6)));
    // sprite.y = stage.height / 2;

  // Resize sprites
  sprite.width = renderer.height/6;
  sprite.height = renderer.height/6;
  token.width = renderer.height/8;
  token.height = renderer.height/8;

  // Make tokens
  makeToken();


  // Sprite Velocity properties
  
  token.vx = 0;
  token.vy = 0;



  // add and position bacgrounds
  stage.addChild(background);
  stage.addChild(foreground);

  background.width = renderer.width;
  foreground.width = renderer.width;
  background.height = renderer.height;
  foreground.height = renderer.height;
  
  // add and position sprite
  stage.addChild(sprite);
  sprite.x = 45;
  sprite.y = renderer.height / 2;
  sprite.vx = 0;
  sprite.vy = 0;


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




function makeToken(){
  var tokenArr = [];
  setInterval(function(){
    token = new PIXI.Sprite(
    PIXI.loader.resources["images/square_icon.png"].texture
    );
    token.width = renderer.height/8;
    token.height = renderer.height/8;
    token.x = 1200;
    token.y = (renderer.height - token.height)/(Math.floor(Math.random() * 6));
    token.vx = -8;
    stage.addChild(token);
    tokenArr.push(token)
    console.log("mada a token")
  }, 2000);
}



function makeTitleScreen(){
  // Create title screen
  titleScreen = new PIXI.Container();
  stage.addChild(titleScreen);
  titleScreen.visible = true;
  title = new PIXI.Text("Voxal", {font: "100px", fill: "white"});
  title.x = 150;
  title.y = 250;
  titleScreen.addChild(title);
}

// 
