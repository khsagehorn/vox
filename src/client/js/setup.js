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
var u = new SpriteUtilities(PIXI);
// var g = new GameUtilities(PIXI);

//Tell the `renderer` to `render` the `stage`

// Load image assets and run the SETUP function
PIXI.loader
  .add("images/cube1.png")
  .add("images/pyramid.png")
  .add("images/square_icon.png")
  .add("images/background.png")
  .add("images/foreground.png")
  .load(setup);

  var state, cube, token, background, foreground, titleScreen;


function setup() {
  var height = 600;

  
  

  // Add the main cube and tokens
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["images/square_icon.png"].texture
  );
  // token = new PIXI.Sprite(
  //   PIXI.loader.resources["images/square_icon.png"].texture
  // );

  var textures = u.filmstrip("images/cube1.png", 100, 100);
  cube = u.sprite(textures);

  var textures2 = u.filmstrip("images/pyramid.png", 100, 100);
  token = u.sprite(textures2);


  // create the background and foreground
  background = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/background.png"].texture);
  foreground = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/foreground.png"].texture);
   

  // Position cubes
  
  console.log(stage.height);
  token.x = 1200;
  token.y = renderer.height/(Math.floor(Math.random() *(6)));
    // cube.y = stage.height / 2;

  // Resize cubes
  cube.width = renderer.height/4;
  cube.height = renderer.height/4;
  token.width = renderer.height/8;
  token.height = renderer.height/8;

  // Make tokens
  makeToken();
  // g.wait(1500, makeToken2);

  cube.playAnimation();
  token.playAnimation();


  // cube Velocity properties
  
  token.vx = 0;
  token.vy = 0;



  // add and position bacgrounds
  stage.addChild(background);
  stage.addChild(foreground);

  background.width = renderer.width;
  foreground.width = renderer.width;
  background.height = renderer.height;
  foreground.height = renderer.height;
  
  // add and position cube
  stage.addChild(cube);
  cube.x = 45;
  cube.y = renderer.height / 2;
  cube.vx = 0;
  cube.vy = 0;



  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
  // logFreq();
  //Left arrow key `press` method
  left.press = function() {
    //Change the cube's velocity when the key is pressed
    cube.vx = -5;
    cube.vy = 0;
  };
  //Left arrow key `release` method
  left.release = function() {
  
  if (!right.isDown && cube.vy === 0) {
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



    gameLoop();
}




function makeToken(){
  var tokenArr = [];
  setInterval(function(){
    // token = new PIXI.Sprite(
    // PIXI.loader.resources["images/square_icon.png"].texture
    // );
    var textures2 = u.filmstrip("images/pyramid.png", 100, 100);
    token = u.sprite(textures2);
    stage.addChild(token);
    token.playAnimation();
    tokenArr.push(token)
    
    token.width = renderer.height/8;
    token.height = renderer.height/8;
    token.x = 1200;
    token.y = (renderer.height - token.height)/(Math.floor(Math.random() * 6));
    token.vx = -8;
    console.log("made a token")
  }, 3000);
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
