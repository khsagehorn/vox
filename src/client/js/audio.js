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


PIXI.loader
  .add("images/square_icon.png")
  .load(setup);

  var sprite;
  var token;

  function setup() {
    sprite = new PIXI.Sprite(
      PIXI.loader.resources["images/square_icon.png"].texture
    );
    token = new PIXI.Sprite(
      PIXI.loader.resources["images/square_icon.png"].texture
    );


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

  // Sprite Velocity properties
  sprite.vx = 0;
  sprite.vy = 0;
  token.vx = 0;
  token.vy = 0;

  // Rotate sprite
    // sprite.rotation = 0.8;
    // sprite.pivot.set(100, 100);


  // add sprite and render canvas
    stage.addChild(sprite);
    setInterval(function(){
      newToken = token;
      stage.addChild(newToken);
    }, 1000);

    gameLoop();
  }

  function gameLoop(){
    requestAnimationFrame(gameLoop);


    // Update sprite velocity
    sprite.vx = 2;
    sprite.vy = 2;
    token.vx = -4;



    // Apply velocity values to position
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    token.x += token.vx;
    
    renderer.render(stage);
  }
