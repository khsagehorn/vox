//Create the renderer
var renderer = PIXI.autoDetectRenderer(1000, 675);

renderer.view.style.position = "absolute";

renderer.view.style.left = '10%';

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();
var u = new SpriteUtilities(PIXI);
var c = new Collision(PIXI);

// Load image assets and run the setup function
PIXI.loader
  .add("images/logo.png")
  .add("images/background.png")
  .add("images/foreground.png")
  .add("images/cube1.png")
  .add("images/pyramid.png")
  .load(setup);

  var state, cube, token, message, background, foreground, titleScreen;

function setup() {

  // Build sprite animations
  var textures = u.filmstrip("images/cube1.png", 100, 100);
  cube = u.sprite(textures);

  var textures3 = u.filmstrip("images/logo.png", 650, 100);
  logo = u.sprite(textures3);

  // create the background and foreground
  background = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/background.png"].texture);
  foreground = new PIXI.extras.TilingSprite(PIXI.loader.resources["images/foreground.png"].texture);
   

  // Resize cubes
  cube.width = renderer.height/5;
  cube.height = renderer.height/5;
  logo.width = renderer.width/2;
  logo.height = logo.width/6.5;

  //set anchor points
  cube.anchor.x = 0.5;
  cube.anchor.y = 0.5;

  // Make tokens
  makeToken();

  // animate sprites
  cube.playAnimation();
  logo.fps = 8;
  logo.playAnimation();

  // add and position bacgrounds
  stage.addChild(background);
  stage.addChild(foreground);

  background.width = renderer.width;
  foreground.width = renderer.width;
  background.height = renderer.height;
  foreground.height = renderer.height;

  keyCapture();

  makeTitleScreen();

  gameLoop();
}

function makeToken(){
  var tokenArr = [0,100,200,300,400,500];

  // create a token on interval
  setInterval(function(){
    
    var textures2 = u.filmstrip("images/pyramid.png", 100, 100);
    token = u.sprite(textures2);
    stage.addChild(token);
    token.playAnimation();
    tokenArr.push(token)
    
    token.width = 75;
    token.height = 75;
    token.x = renderer.width;
    token.y = tokenArr[((Math.floor(Math.random() * 7)))];
    token.vx = -8;
  }, 2400);
}

function makeTitleScreen(){
  // Create title screen
  titleScreen = new PIXI.Container();
  stage.addChild(titleScreen);
  titleScreen.visible = true;
  cube.visible = false;
  foreground.visible = false;
  
  // title screen text
  message = new PIXI.Text(
    "press space to start",
    {font: "24px Futura", fill: "white"});
  message.x = renderer.width/2 - message.width/2;
  message.y = renderer.height/2 + logo.height;
  titleScreen.addChild(message)
  logo.x = renderer.width/2 - logo.width/2;
  logo.y = renderer.height/2 - logo.height/2;
  titleScreen.addChild(logo);

  space.press = function (){
    foreground.visible = true;
    cube.visible = true;
    logo.visible = false;
    message.visible = false;
    stage.addChild(cube);
    cube.x = renderer.width/15;
    cube.y = renderer.height / 2;
    cube.vx = 0;
    cube.vy = 0;
  }
}